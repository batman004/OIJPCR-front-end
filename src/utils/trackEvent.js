import config from '../config/config'

// Events are written to the production database, so they are only sent from a
// production build. `npm start` talks to the prod API through the dev proxy and
// must never add test traffic to the real numbers. REACT_APP_TRACK_EVENTS=true
// overrides this for deliberate local testing against a local API.
const ENABLED =
  process.env.NODE_ENV === 'production' ||
  process.env.REACT_APP_TRACK_EVENTS === 'true'

const VIEWED_KEY = 'oijpcr:viewed'
const viewedFallback = new Set()

// Editors browsing the site while signed in should not inflate reader numbers.
function isSignedInAdmin() {
  try {
    return Boolean(localStorage.getItem('jwt'))
  } catch (e) {
    return false
  }
}

function send(articleId, params) {
  if (!ENABLED || !articleId || isSignedInAdmin()) return

  try {
    const query = new URLSearchParams(params).toString()
    // Fire-and-forget. No body and no custom headers keeps this a "simple"
    // CORS request (no preflight), and keepalive lets it finish while the page
    // navigates away, e.g. a click on a share link.
    fetch(`${config.host}/journals/${articleId}/events?${query}`, {
      method: 'POST',
      mode: 'no-cors',
      credentials: 'omit',
      keepalive: true,
    }).catch(() => {})
  } catch (e) {
    // Metrics must never break the page.
  }
}

function alreadyViewed(articleId) {
  try {
    const seen = JSON.parse(sessionStorage.getItem(VIEWED_KEY) || '[]')
    if (seen.includes(articleId)) return true
    sessionStorage.setItem(VIEWED_KEY, JSON.stringify([...seen, articleId]))
    return false
  } catch (e) {
    if (viewedFallback.has(articleId)) return true
    viewedFallback.add(articleId)
    return false
  }
}

// One view per article per browser session, so reloads and back-navigation
// do not inflate the count.
export function trackView(articleId) {
  if (!articleId || alreadyViewed(articleId)) return
  send(articleId, { type: 'view' })
}

// target: 'card' | 'pdf' | 'print' | 'tag'
export function trackClick(articleId, target) {
  send(articleId, { type: 'click', target })
}

// channel: 'twitter' | 'linkedin' | 'link'
export function trackShare(articleId, channel) {
  send(articleId, { type: 'share', target: channel })
}
