import { Link } from 'react-router-dom'
import fallbackCover from '../../assets/stockPhotos/r1_c1.jpg'
import { articleUrl, cleanTitle } from '../../utils'

/** Articles after the lead: one featured with its picture, the rest as a ruled list. */
export default function LatestArticles({ articles }) {
  if (articles && articles.length === 0) return null
  const [feature, ...rest] = articles || []

  return (
    <section className="wrap pb-16 md:pb-24" aria-labelledby="latest-heading">
      <div className="section-head">
        <h2 id="latest-heading" className="section-title">More recent articles</h2>
        <Link to="/archive" className="text-link whitespace-nowrap">
          All volumes <span className="arrow" aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          {feature ? <Feature article={feature} /> : <div className="skeleton ratio-4-3" aria-hidden="true" />}
        </div>
        <ol className="lg:col-span-6 border-t lg:border-t-0" style={{ borderColor: 'var(--hair)' }}>
          {(articles ? rest : [1, 2, 3]).map((article, index) => (
            <li key={article._id || index} className="border-b first:pt-0 py-6 lg:first:pt-0" style={{ borderColor: 'var(--hair)' }}>
              {articles ? <Row article={article} /> : <RowPlaceholder />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Feature({ article }) {
  const url = articleUrl(article)
  return (
    <article className="entry">
      <Link to={url} className="frame ratio-4-3 block" tabIndex={-1} aria-hidden="true">
        <img src={article.cover || fallbackCover} alt="" loading="lazy" />
      </Link>
      <p className="meta mt-5">
        <span className="meta-strong">{article.author}</span>
        <span className="meta-sep">Volume {article.volume}</span>
      </p>
      <h3 className="entry-title text-2xl md:text-3xl leading-tight mt-2">
        <Link to={url}>{cleanTitle(article.title)}</Link>
      </h3>
      {article.slug && <p className="summary mt-3 clamp-3">{article.slug}</p>}
    </article>
  )
}

function Row({ article }) {
  const url = articleUrl(article)
  return (
    <article className="entry grid grid-cols-[minmax(0,1fr)_6.5rem] gap-5 sm:grid-cols-[minmax(0,1fr)_9rem]">
      <div className="min-w-0">
        <p className="meta">
          <span className="meta-strong">{article.author}</span>
          <span className="meta-sep">Volume {article.volume}</span>
        </p>
        <h3 className="entry-title text-xl md:text-[1.375rem] leading-snug mt-1.5">
          <Link to={url}>{cleanTitle(article.title)}</Link>
        </h3>
        {article.slug && (
          <div className="hidden sm:block">
            <p className="summary text-base mt-2 clamp-2">{article.slug}</p>
          </div>
        )}
      </div>
      <Link to={url} className="frame ratio-1-1 block self-start" tabIndex={-1} aria-hidden="true">
        <img src={article.cover || fallbackCover} alt="" loading="lazy" />
      </Link>
    </article>
  )
}

function RowPlaceholder() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_6.5rem] gap-5 sm:grid-cols-[minmax(0,1fr)_9rem]" aria-hidden="true">
      <div>
        <div className="skeleton h-3 w-40" />
        <div className="skeleton h-6 mt-3 w-full" />
        <div className="skeleton h-6 mt-2 w-2/3" />
      </div>
      <div className="skeleton ratio-1-1" />
    </div>
  )
}
