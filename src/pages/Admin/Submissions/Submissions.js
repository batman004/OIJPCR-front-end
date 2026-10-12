import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import slugify from 'slugify'
import { UserContext } from '../../../UserContext'
import { useToast } from '../../../components/utils/Toast'
import { apiErrorMessage, SubmissionHandler } from '../utils'
import { articleTypeLabel } from '../../../submissions/articleTypes'
import { relativeDate } from '../Metrics/metricsUtils'

// EditArticle resolves purely on the id (see ArticleHandler.getArticle); the
// slug in the URL is cosmetic.
const editArticlePath = (id, title) => `/admin/${slugify(title || 'article')}/${id}`

const TABS = [
  { id: 'review', label: 'For review' },
  { id: 'accepted', label: 'Accepted' },
  { id: 'rejected', label: 'Rejected' },
]

const STATUS_ACTIONS = [
  {
    id: 'review',
    label: 'Keep for review',
    active: 'bg-amber-500 text-white border-amber-500',
    idle: 'bg-white text-amber-800 border-amber-400 hover:bg-amber-50',
  },
  {
    id: 'accepted',
    label: 'Accept',
    active: 'bg-green-700 text-white border-green-700',
    idle: 'bg-white text-green-800 border-green-600 hover:bg-green-50',
  },
  {
    id: 'rejected',
    label: 'Reject',
    active: 'bg-red-700 text-white border-red-700',
    idle: 'bg-white text-red-800 border-red-500 hover:bg-red-50',
  },
]

const EMPTY_COPY = {
  review: 'Nothing is waiting for review.',
  accepted: 'Accepted submissions stay in this list. They are not published into an issue until you add them as an article.',
  rejected: 'No rejected submissions.',
}

const Submissions = () => {
  const { token } = useContext(UserContext)
  const { showToast } = useToast()
  const history = useHistory()
  const requestedId = new URLSearchParams(useLocation().search).get('id')
  const appliedQuery = useRef(false)

  const [submissions, setSubmissions] = useState([])
  const [counts, setCounts] = useState({ review: 0, accepted: 0, rejected: 0 })
  const [tab, setTab] = useState('review')
  const [selectedId, setSelectedId] = useState(requestedId)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = useCallback(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    SubmissionHandler.list(token)
      .then((result) => {
        if (cancelled) return
        setSubmissions(result.submissions || [])
        setCounts(result.counts || { review: 0, accepted: 0, rejected: 0 })
      })
      .catch((err) => { if (!cancelled) setError(apiErrorMessage(err, 'Could not load submissions')) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [token])

  useEffect(() => load(), [load])

  useEffect(() => {
    if (appliedQuery.current || !requestedId || !submissions.length) return
    appliedQuery.current = true
    const match = submissions.find((item) => item.id === requestedId)
    if (!match) return
    setTab(match.status)
    setSelectedId(match.id)
  }, [requestedId, submissions])

  const visible = submissions.filter((item) => item.status === tab)
  const selected = visible.find((item) => item.id === selectedId) || visible[0] || null

  const replaceSubmission = (next) => {
    setSubmissions((current) => current.map((item) => item.id === next.id ? next : item))
    setCounts((current) => {
      const previous = submissions.find((item) => item.id === next.id)
      if (!previous || previous.status === next.status) return current
      return {
        ...current,
        [previous.status]: Math.max(0, current[previous.status] - 1),
        [next.status]: current[next.status] + 1,
      }
    })
  }

  // Extracts the manuscript into a draft article and generates a first PDF
  // for it, then takes the admin straight to the normal article editor -
  // where "Preview" already shows exactly what a reader would see.
  const createDraftArticle = async () => {
    if (!selected || busy) return
    setBusy(true)
    try {
      const result = await SubmissionHandler.createDraftArticle(selected.id, token)
      replaceSubmission(result.submission)
      const notes = []
      if (result.sourceImageCount) {
        notes.push(`${result.sourceImageCount} image${result.sourceImageCount === 1 ? '' : 's'} need placing by hand - see the Images panel in the editor.`)
      }
      if (result.pdfGenerated === false) {
        notes.push('Its PDF could not be generated automatically - use "Generate PDF" on the article.')
      }
      showToast({ message: ['Draft article created.', ...notes].join(' ') })
      history.push(editArticlePath(result.article.id, selected.title))
    } catch (err) {
      showToast({ type: 'error', message: apiErrorMessage(err, 'Could not create the draft article') })
    } finally {
      setBusy(false)
    }
  }

  const changeStatus = async (status) => {
    if (!selected || selected.status === status || busy) return
    setBusy(true)
    try {
      const next = await SubmissionHandler.updateStatus(selected.id, status, token)
      replaceSubmission(next)
      setTab(status)
      setSelectedId(next.id)
      const messages = {
        review: 'Kept for review.',
        accepted: 'Accepted. It stays in the accepted section.',
        rejected: 'Rejected.',
      }
      showToast({ message: messages[status] || 'Updated.' })
    } catch (err) {
      showToast({ type: 'error', message: apiErrorMessage(err, 'Could not update the submission') })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="w-full px-2 mx-auto mb-10 max-w-6xl md:px-4">
      <div className="my-4">
        <h1 className="text-3xl font-bold text-gray-900">Submissions</h1>
        <p className="text-sm text-gray-500">
          Review manuscripts, leave comments, and accept, reject, or keep them for review.
        </p>
      </div>

      <div className="inline-flex flex-wrap overflow-hidden border border-gray-300 rounded-lg" role="tablist" aria-label="Submission status">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`px-4 py-2 text-sm font-semibold ${
              tab === item.id ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.label}{loading && submissions.length === 0 ? '' : ` (${counts[item.id] || 0})`}
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-4 text-sm font-semibold text-red-600" role="alert">
          {error}{' '}
          <button type="button" className="underline" onClick={load}>Retry</button>
        </p>
      )}

      {loading && !submissions.length && <p className="mt-6 text-sm text-gray-500">Loading submissions…</p>}

      {!loading && visible.length === 0 && (
        <p className="max-w-xl mt-6 text-sm text-gray-600">{EMPTY_COPY[tab]}</p>
      )}

      {visible.length > 0 && (
        <div className="grid items-start gap-4 mt-4 lg:grid-cols-5">
          <ul className="overflow-hidden bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-sm lg:col-span-2">
            {visible.map((item) => {
              const active = selected?.id === item.id
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full px-4 py-3 text-left ${active ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  >
                    <span className="block font-semibold text-gray-900 truncate">{item.title}</span>
                    <span className="block text-sm text-gray-500 truncate">
                      {item.authorName} · {relativeDate(item.createdAt)}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          {selected && (
            <SubmissionDetail
              submission={selected}
              token={token}
              busy={busy}
              onStatus={changeStatus}
              onComment={replaceSubmission}
              onCreateDraft={createDraftArticle}
              onBusy={setBusy}
            />
          )}
        </div>
      )}
    </div>
  )
}

function SubmissionDetail({ submission, token, busy, onStatus, onComment, onCreateDraft, onBusy }) {
  const { showToast } = useToast()
  const [comment, setComment] = useState('')
  const bookPhotoUrl = useBookPhoto(submission.id, token, Boolean(submission.bookPhoto))

  useEffect(() => { setComment('') }, [submission.id])

  const saveComment = async (event) => {
    event.preventDefault()
    const body = comment.trim()
    if (!body || busy) return
    onBusy(true)
    try {
      const next = await SubmissionHandler.addComment(submission.id, body, token)
      onComment(next)
      setComment('')
      showToast({ message: 'Comment added.' })
    } catch (err) {
      showToast({ type: 'error', message: apiErrorMessage(err, 'Could not save the comment') })
    } finally {
      onBusy(false)
    }
  }

  const download = async () => {
    try {
      const blob = await SubmissionHandler.fileBlob(submission.id, 'manuscript', token)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = submission.manuscript?.originalName || 'manuscript'
      link.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      showToast({ type: 'error', message: await blobErrorMessage(err, 'Could not download the manuscript') })
    }
  }

  return (
    <article className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm lg:col-span-3">
      <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
        {articleTypeLabel(submission.articleType)} · {formatWhen(submission.createdAt)}
      </p>
      <h2 className="mt-1 text-2xl font-bold text-gray-900">{submission.title}</h2>
      <p className="mt-2 text-sm text-gray-700">
        <span className="font-semibold">{submission.authorName}</span>
        {submission.affiliation ? ` · ${submission.affiliation}` : ''}
      </p>
      <a className="text-sm font-semibold text-oijpcr-blue" href={`mailto:${submission.email}`}>
        {submission.email}
      </a>

      <blockquote className="py-1 pl-3 mt-4 text-gray-800 border-l-4 border-oijpcr-blue">
        {submission.brief}
      </blockquote>
      {submission.note && (
        <p className="mt-3 text-sm text-gray-700">
          <span className="font-semibold">Note. </span>{submission.note}
        </p>
      )}

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          type="button"
          onClick={download}
          className="px-4 py-2 text-sm font-semibold text-white bg-black rounded-lg"
        >
          Download manuscript
        </button>
        {submission.manuscript?.originalName && (
          <span className="self-center text-xs text-gray-500">
            {submission.manuscript.originalName} · {formatBytes(submission.manuscript.size)}
          </span>
        )}
      </div>

      {bookPhotoUrl && (
        <img
          src={bookPhotoUrl}
          alt="Cover of the book under review"
          className="object-contain mt-4 border border-gray-200 rounded-lg max-h-64"
        />
      )}

      <div className="flex flex-wrap gap-2 mt-6" role="group" aria-label="Decision">
        {STATUS_ACTIONS.map((action) => {
          const current = submission.status === action.id
          return (
            <button
              key={action.id}
              type="button"
              disabled={busy || current}
              onClick={() => onStatus(action.id)}
              className={`px-4 py-2 text-sm font-semibold border-2 rounded-lg disabled:opacity-80 ${
                current ? action.active : action.idle
              }`}
            >
              {action.label}
            </button>
          )
        })}
      </div>
      {submission.status === 'accepted' && (
        <div className="p-3 mt-4 border border-green-200 rounded-lg bg-green-50">
          {submission.draftArticleId ? (
            <>
              <p className="text-sm text-green-900">This submission has a draft article.</p>
              <Link
                to={editArticlePath(submission.draftArticleId, submission.title)}
                className="inline-block px-4 py-2 mt-2 text-sm font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800"
              >
                Open draft article
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm text-green-900">
                Not published into an issue yet. Add it as a draft article to extract the manuscript, preview it,
                and generate a PDF - then finish it off (volume, cover, tags) from the article editor.
              </p>
              <button
                type="button"
                disabled={busy}
                onClick={onCreateDraft}
                className="px-4 py-2 mt-2 text-sm font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 disabled:opacity-60"
              >
                {busy ? 'Creating…' : 'Add as draft article'}
              </button>
            </>
          )}
        </div>
      )}

      <h3 className="mt-8 text-lg font-bold text-gray-900">Comments</h3>
      {submission.comments.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">No comments yet.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {submission.comments.map((item) => (
            <li key={item.id} className="p-3 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{item.body}</p>
              <p className="mt-2 text-xs text-gray-500">
                {item.author} · {formatWhen(item.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={saveComment} className="mt-4">
        <label htmlFor="submission-comment" className="text-sm font-semibold text-gray-900">
          Add a comment
        </label>
        <textarea
          id="submission-comment"
          rows={3}
          maxLength={2000}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className="w-full px-3 py-2 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-oijpcr-blue"
        />
        <button
          type="submit"
          disabled={busy || !comment.trim()}
          className="px-4 py-2 mt-2 text-sm font-semibold text-white rounded-lg primary-color-bg disabled:opacity-60"
        >
          Save comment
        </button>
      </form>
    </article>
  )
}

function useBookPhoto(id, token, hasPhoto) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (!id || !hasPhoto) {
      setUrl('')
      return undefined
    }
    let objectUrl = ''
    let cancelled = false
    SubmissionHandler.fileBlob(id, 'book-photo', token)
      .then((blob) => {
        if (cancelled) return
        objectUrl = URL.createObjectURL(blob)
        setUrl(objectUrl)
      })
      .catch(() => { if (!cancelled) setUrl('') })
    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [id, token, hasPhoto])

  return url
}

async function blobErrorMessage(err, fallback) {
  const data = err?.response?.data
  if (data instanceof Blob) {
    try {
      const json = JSON.parse(await data.text())
      return json.message || fallback
    } catch (parseError) {
      return fallback
    }
  }
  return apiErrorMessage(err, fallback)
}

function formatWhen(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function formatBytes(bytes) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default Submissions
