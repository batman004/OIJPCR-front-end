import slugify from 'slugify'

const numberFormat = new Intl.NumberFormat('en-IN')
const compactFormat = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export const formatNumber = (value) => numberFormat.format(value || 0)

// 1,284 stays as is, 12,900 becomes 12.9K
export const formatCompact = (value) =>
  (value || 0) < 10000 ? formatNumber(value) : compactFormat.format(value)

export const formatPercent = (ratio) =>
  `${(ratio * 100).toFixed(ratio > 0 && ratio < 0.1 ? 1 : 0)}%`

// Days arrive as UTC "YYYY-MM-DD" strings; format them as UTC so the label
// never shifts a day in the viewer's timezone.
export const formatDay = (day, withYear = false) =>
  new Date(`${day}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    ...(withYear ? { year: 'numeric' } : {}),
    timeZone: 'UTC',
  })

export function relativeDate(iso, now = Date.now()) {
  const days = Math.floor((now - Date.parse(iso)) / 86400000)
  if (Number.isNaN(days)) return ''
  if (days < 1) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  if (days < 365) {
    const months = Math.floor(days / 30)
    return `${months} month${months > 1 ? 's' : ''} ago`
  }
  const years = Math.floor(days / 365)
  return `${years} year${years > 1 ? 's' : ''} ago`
}

// null when there is nothing to compare against (previous period was empty).
export function percentChange(current, previous) {
  if (!previous) return null
  return (current - previous) / previous
}

export const engagementRate = (item) =>
  item.views ? (item.clicks + item.shares) / item.views : 0

export const articleUrl = (article) =>
  `/archive/${slugify(article.title)}/${article.id}`

// Rounds up to a "nice" axis step: 1, 2, 5 times a power of ten.
export function niceStep(rough) {
  const magnitude = Math.pow(10, Math.floor(Math.log10(rough)))
  const fraction = rough / magnitude
  const nice = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10
  return nice * magnitude
}
