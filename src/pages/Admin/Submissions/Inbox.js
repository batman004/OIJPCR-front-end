import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../UserContext'
import { apiErrorMessage, SubmissionHandler } from '../utils'
import { articleTypeLabel } from '../../../submissions/articleTypes'
import { relativeDate } from '../Metrics/metricsUtils'

const SubmissionInbox = () => {
  const { token } = useContext(UserContext)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) return undefined
    let cancelled = false
    SubmissionHandler.list(token)
      .then((result) => { if (!cancelled) setData(result) })
      .catch((err) => { if (!cancelled) setError(apiErrorMessage(err, 'Could not load submissions')) })
    return () => { cancelled = true }
  }, [token])

  const waiting = (data?.submissions || []).filter((item) => item.status === 'review').slice(0, 3)
  const counts = data?.counts || { review: 0, accepted: 0, rejected: 0 }

  return (
    <section className="p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
        <h2 className="text-lg font-bold text-gray-900">Submissions</h2>
        <Link to="/admin/submissions" className="text-sm font-semibold text-oijpcr-blue">
          Open review queue
        </Link>
      </div>

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {!data && !error && <p className="text-sm text-gray-500">Loading submissions…</p>}

      {data && (
        <>
          <p className="text-sm text-gray-600">
            {counts.review} for review · {counts.accepted} accepted · {counts.rejected} rejected
          </p>
          {waiting.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">Nothing is waiting for review.</p>
          ) : (
            <ul className="mt-3 divide-y divide-gray-100">
              {waiting.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/admin/submissions?id=${item.id}`}
                    className="flex items-baseline justify-between gap-3 py-2"
                  >
                    <span className="min-w-0">
                      <span className="block font-semibold text-gray-900 truncate">{item.title}</span>
                      <span className="block text-sm text-gray-500 truncate">
                        {item.authorName} · {articleTypeLabel(item.articleType)}
                      </span>
                    </span>
                    <span className="flex-shrink-0 text-xs text-gray-400">{relativeDate(item.createdAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}

export default SubmissionInbox
