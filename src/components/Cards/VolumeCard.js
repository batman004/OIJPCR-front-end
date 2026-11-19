import { Link } from 'react-router-dom'
import fallback from '../../assets/stockPhotos/r2_c1.jpg'

/** One volume in the archive index (and in the admin volume list, with an edit link). */
const VolumeCard = ({ volume, about = '', cover, date, isAdmin }) => {
  const url = `/archive/${volume}`

  return (
    <article
      className="entry group grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-4 py-8 border-b md:grid-cols-[7rem_minmax(0,1fr)_14rem] md:gap-x-10"
      style={{ borderColor: 'var(--hair)' }}
    >
      {/* The numeral is the volume's title; "Volume" is spoken but not shown. */}
      <h3
        className="serif text-6xl md:text-7xl leading-none font-medium"
        style={{ fontVariationSettings: "'opsz' 72", fontFeatureSettings: "'lnum'" }}
      >
        <Link to={url} className="transition-colors duration-200 group-hover:text-[color:var(--accent)]">
          <span className="sr-only">Volume </span>
          {String(volume).padStart(2, '0')}
        </Link>
      </h3>

      <div className="min-w-0">
        <p className="meta">{date}</p>
        {about && <p className="summary mt-2 clamp-3 max-w-[50ch]">{about}</p>}
        <div className="flex flex-wrap gap-6 mt-4">
          <Link to={url} className="text-link">
            Read the volume <span className="arrow" aria-hidden="true">&rarr;</span>
          </Link>
          {isAdmin && (
            <Link to={`/admin/list/volume/${volume}`} className="text-link" style={{ color: 'var(--muted)' }}>
              Edit volume
            </Link>
          )}
        </div>
      </div>

      <Link to={url} className="hidden md:block frame ratio-4-3" tabIndex={-1} aria-hidden="true">
        <img src={cover || fallback} alt="" loading="lazy" />
      </Link>
    </article>
  )
}

export default VolumeCard
