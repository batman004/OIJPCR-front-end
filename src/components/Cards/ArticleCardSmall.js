import { Link } from 'react-router-dom'
import fallbackCover from '../../assets/stockPhotos/r1_c1.jpg'
import { articleUrl, cleanTitle } from '../../utils'

/** Compact entry for "More from this volume". */
export default function ArticleCardSmall({ id, coverPhoto, author, title }) {
  return (
    <article className="entry">
      <Link to={articleUrl({ title, id })} className="block">
        <div className="frame ratio-3-2">
          <img src={coverPhoto || fallbackCover} alt="" loading="lazy" />
        </div>
        <p className="meta mt-4">{author}</p>
        <h3 className="entry-title text-xl leading-snug mt-1.5">
          <span className="clamp-3">{cleanTitle(title)}</span>
        </h3>
      </Link>
    </article>
  )
}
