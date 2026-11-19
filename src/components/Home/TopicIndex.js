import { Link } from 'react-router-dom'

/** Every topic the journal has tagged, set as one running typographic index. */
export default function TopicIndex({ topics, error }) {
  if (error) return null
  // Some tags carry stray spaces in the API. Show them trimmed, but link with the
  // stored value so /journals/tags/:tag still matches.
  const list = topics
    ? topics
        .map((value) => ({ value, label: String(value).trim() }))
        .filter(({ label }, i, all) => label && all.findIndex((t) => t.label === label) === i)
    : null

  return (
    <section className="band-alt" aria-labelledby="topics-heading">
      <div className="wrap section">
        <div className="section-head">
          <h2 id="topics-heading" className="section-title">Browse by topic</h2>
        </div>
        {list ? (
          <ul className="topic-index max-w-5xl">
            {list.map(({ value, label }) => (
              <li key={label}>
                <Link to={`/tags/${value}`}>{label}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-wrap gap-4" aria-hidden="true">
            {[10, 7, 12, 8, 11, 6].map((w, i) => (
              <div key={i} className="skeleton h-9" style={{ width: `${w}rem` }} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
