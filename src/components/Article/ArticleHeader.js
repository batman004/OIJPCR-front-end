import { Link } from 'react-router-dom'
import { cleanTitle, formatDate } from '../../utils'

/** Title block of an article: volume and date, headline, standfirst, byline, cover. */
const ArticleHeader = ({ article }) => {
  const date = formatDate(article.createdAt)

  return (
    <header>
      <div className="max-w-[52rem] mx-auto">
        <p className="meta rise">
          <Link to={`/archive/${article.volume}`} className="meta-strong link-draw" style={{ color: 'var(--accent)' }}>
            Volume {article.volume}
          </Link>
          {date && <span className="meta-sep"><time dateTime={article.createdAt}>{date}</time></span>}
        </p>
        <h1 className="page-title mt-4 rise" style={{ fontSize: 'clamp(2.1rem, 1.5rem + 2.4vw, 3.5rem)' }}>
          {cleanTitle(article.title)}
        </h1>
        {article.slug && <p className="standfirst mt-5 rise rise-2">{article.slug}</p>}

        <div className="flex items-center gap-4 pt-5 mt-8 border-t rise rise-2" style={{ borderColor: 'var(--hair)' }}>
          {article.authorPhoto && (
            <img src={article.authorPhoto} alt="" className="object-cover w-12 h-12 rounded-full" />
          )}
          <p className="text-[0.9375rem]">
            <span style={{ color: 'var(--muted)' }}>By </span>
            <span className="font-semibold">{article.author}</span>
          </p>
        </div>
      </div>

      {article.cover && (
        <figure className="max-w-[60rem] mx-auto mt-10 md:mt-12 rise rise-3">
          <div className="frame ratio-16-9">
            <img src={article.cover} alt="" />
          </div>
        </figure>
      )}
    </header>
  )
}

export default ArticleHeader
