import dollar from '../../assets/stockPhotos/r1_c1.jpg'
import slugify from 'slugify'
import { Link } from 'react-router-dom'

export default function ArticleCardSmall (props) {
  const { slug, id } = props

  const urlSlug = slugify(slug.slice(0, 40))
  // const url = `/archive/${urlSlug}/${id}`
  const url = {
    slug: urlSlug,
    id: id
  }


  function handleClick () {
    props.handleClick(url)
  }

  const {
          coverPhoto,
          author,
          volume,
          title,
        } = props

  const authorText =
          `BY ${author.toUpperCase()} ${String.fromCharCode(183)} VOLUME ${volume}`
  const defaultPhoto = coverPhoto ? coverPhoto : dollar

  return (
    <div className={`card-surface md:max-w-xs h-auto
                     overflow-hidden my-4
                     md:m-4 lg:h-auto`}
    >
      <CardCover coverPhoto={defaultPhoto} authorText={authorText}/>
      <CardContent
        handleClick={handleClick}
        title={title}
        slug={slug}
        id={id}
      />
    </div>
  )
}

function CardCover ({ coverPhoto, authorText }) {
  return (
    <>
      <img className="h-48 w-full object-cover"
           src={coverPhoto}
           alt="ArticleList cover"
      />
      <p
        className="font-medium text-xs text-center mt-3 tracking-widest uppercase"
        style={{ color: 'var(--color-text-muted)' }}
      >{authorText}</p>
    </>
  )
}

function CardContent ({ title, slug, id, handleClick }) {
  const start     = 0,
        end       = slug.length >= 100 ? 100 : slug.length
  /**
   * slug length limit is 250 for optimal viewing.
   * url slug limit will be enforced later
   * changing urls always causes trouble (-_-).
   */
  const aboutSlug = slug.slice(start, end)
  const urlSlug = slugify(title)

  return (
    <div className="mx-6 my-4">
      <div className="mb-3 text-center">
        <Link to={`/archive/${urlSlug}/${id}`}
              className="text-lg font-serif font-bold leading-snug"
              style={{ color: 'var(--color-primary)' }}
              onClick={handleClick}
        >
          {title}
        </Link>
      </div>
      <p
        className="font-normal text-sm mb-4 text-center leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      > {aboutSlug} </p>
    </div>
  )
}



