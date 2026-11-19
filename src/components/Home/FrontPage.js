import { Link } from 'react-router-dom'
import fallbackCover from '../../assets/stockPhotos/r1_c1.jpg'
import { articleUrl, cleanTitle, formatDate, tagList } from '../../utils'

const aboutJournal =
  'The Journal highlights and discusses conflict issues pertinent to the peace and stability ' +
  'of the subcontinent, and is a forum for networking, learning and information sharing to ' +
  'evolve innovative methods for managing and resolving conflicts.'

/** First screen: the journal's identity on the left, the newest article on the right. */
export default function FrontPage({ lead, error }) {
  return (
    <section className="wrap pt-10 pb-16 md:pt-14 md:pb-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5 flex flex-col">
          <h1 className="display rise">
            Online Indian Journal of Peace and Conflict Resolution
          </h1>
          <p className="summary text-lg mt-6 max-w-[46ch] rise rise-2">{aboutJournal}</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4 mt-8 rise rise-3">
            <Link to="/archive" className="btn">Browse the archive</Link>
            <Link to="/submitArticle" className="text-link">
              Submit an article <span className="arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <dl className="grid grid-cols-3 mt-10 lg:mt-auto pt-5 border-t gap-4 rise rise-3" style={{ borderColor: 'var(--ink)' }}>
            <Fact label="Published" value="Annually" />
            <Fact label="Online since" value="2016" />
            <Fact label="Latest" value={lead ? `Volume ${lead.volume}` : '—'} />
          </dl>
        </div>

        <div className="lg:col-span-7">
          {lead ? <LeadArticle article={lead} /> : <LeadPlaceholder error={error} />}
        </div>
      </div>
    </section>
  )
}

function Fact({ label, value }) {
  return (
    <div>
      <dt className="meta">{label}</dt>
      <dd className="serif text-xl md:text-2xl mt-1" style={{ fontVariationSettings: "'opsz' 36" }}>{value}</dd>
    </div>
  )
}

function LeadArticle({ article }) {
  const url = articleUrl(article)
  const tags = tagList(article.tags).slice(0, 3)

  return (
    <article className="entry rise rise-2">
      <Link to={url} className="frame ratio-3-2 block" tabIndex={-1} aria-hidden="true">
        <img src={article.cover || fallbackCover} alt="" />
      </Link>
      <p className="meta mt-5">
        <span className="meta-strong" style={{ color: 'var(--accent)' }}>Latest article</span>
        <span className="meta-sep">Volume {article.volume}</span>
        {article.createdAt && <span className="meta-sep">{formatDate(article.createdAt)}</span>}
      </p>
      <h2 className="entry-title text-3xl md:text-[2.5rem] leading-[1.1] mt-3">
        <Link to={url}>{cleanTitle(article.title)}</Link>
      </h2>
      {article.slug && <p className="standfirst mt-4 clamp-3">{article.slug}</p>}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
        <p className="meta">By <span className="meta-strong">{article.author}</span></p>
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag}><Link className="tag" to={`/tags/${tag}`}>{tag}</Link></li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

function LeadPlaceholder({ error }) {
  if (error) {
    return (
      <div className="frame ratio-3-2 flex items-center justify-center p-8 text-center">
        <p className="summary">
          The latest articles could not be loaded. <Link className="text-link" to="/archive">Open the archive</Link>
        </p>
      </div>
    )
  }
  return (
    <div aria-hidden="true">
      <div className="skeleton ratio-3-2" />
      <div className="skeleton h-3 w-56 mt-5" />
      <div className="skeleton h-10 mt-4 w-11/12" />
      <div className="skeleton h-10 mt-2 w-2/3" />
      <div className="skeleton h-5 mt-5 w-full" />
    </div>
  )
}
