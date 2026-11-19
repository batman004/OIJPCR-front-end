import { Link } from 'react-router-dom'
import fallbackCover from '../../assets/stockPhotos/r1_c1.jpg'
import { articleUrl, cleanTitle } from '../../utils'

/** One article in a volume or topic listing: picture left, text right, ruled below. */
const ArticleCard = ({ id, coverPhoto, author, volume, title, slug, pdf, showVolume = true }) => {
  const url = articleUrl({ title, id })

  return (
    <article className="entry grid gap-5 py-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-10 border-b" style={{ borderColor: 'var(--hair)' }}>
      <Link to={url} className="frame ratio-3-2 block" tabIndex={-1} aria-hidden="true">
        <img src={coverPhoto || fallbackCover} alt="" loading="lazy" />
      </Link>
      <div className="flex flex-col">
        <p className="meta">
          <span className="meta-strong">{author}</span>
          {showVolume && volume && <span className="meta-sep">Volume {volume}</span>}
        </p>
        <h3 className="entry-title text-2xl md:text-[1.75rem] leading-tight mt-2">
          <Link to={url}>{cleanTitle(title)}</Link>
        </h3>
        {slug && <p className="summary mt-3 clamp-3 max-w-[50ch]">{slug}</p>}
        <div className="flex flex-wrap items-center gap-6 mt-5">
          <Link to={url} className="text-link">
            Read article <span className="arrow" aria-hidden="true">&rarr;</span>
          </Link>
          {pdf && (
            <a href={pdf} target="_blank" rel="noreferrer" className="text-link" style={{ color: 'var(--muted)' }}>
              PDF
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ArticleCard
