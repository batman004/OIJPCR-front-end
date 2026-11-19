import { Link } from 'react-router-dom'

const yearOf = (date = '') => (String(date).match(/\d{4}/) || [''])[0]

/** Every volume as a numeral, newest first: a compact way into the back issues. */
export default function ArchiveStrip({ volumes }) {
  if (!volumes || volumes.length === 0) return null
  const sorted = [...volumes].sort((a, b) => b.volume - a.volume)

  return (
    <section className="wrap section" aria-labelledby="archive-heading">
      <div className="section-head">
        <h2 id="archive-heading" className="section-title">The archive</h2>
        <Link to="/archive" className="text-link whitespace-nowrap">
          Every volume <span className="arrow" aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <ol className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 border-l" style={{ borderColor: 'var(--hair)' }}>
        {sorted.map(({ volume, date }) => (
          <li key={volume} className="border-r border-b" style={{ borderColor: 'var(--hair)' }}>
            <Link
              to={`/archive/${volume}`}
              className="group flex flex-col justify-between h-full p-4 min-h-[7.5rem] transition-colors duration-200 hover:bg-[color:var(--ink)] hover:text-white"
            >
              <span className="meta group-hover:text-white">{yearOf(date)}</span>
              <span
                className="serif text-5xl leading-none font-medium"
                style={{ fontVariationSettings: "'opsz' 72", fontFeatureSettings: "'lnum'" }}
              >
                <span className="sr-only">Volume </span>{String(volume).padStart(2, '0')}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
