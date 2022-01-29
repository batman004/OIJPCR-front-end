import dollar from '../../assets/stockPhotos/r1_c1.jpg'
import CardButton from '../utils/CardButton'
import CardCover from './CardCover'
import slugify from 'slugify'

export default function ArticleCard (props) {
  const {
          coverPhoto,
          author,
          volume,
          title,
          slug,
        } = props

  const { cname, id, path } = props
  const authorText =
          `BY ${author.toUpperCase()} ${String.fromCharCode(183)} VOLUME ${volume}`
  const defaultPhoto = coverPhoto ? coverPhoto : dollar
  return (
    <div className={
      `rounded-md overflow-hidden shadow-lg my-4 md:m-4
       md:max-w-md lg:h-auto
       min-40`
    }
    >
      <CardCover coverPhoto={defaultPhoto} authorText={authorText}/>
      <CardContent
        title={title}
        slug={slug}
        id={id}
        path={path}
        cname={cname}
      />
    </div>
  )
}

function CardContent ({ title, slug, id, path, cname }) {
  const start = 0,
        end   = slug.length >= 250 ? 250 : slug.length
  /**
   * slug length limit is 250 for optimal viewing.
   * url slug limit will be enforced later
   * changing urls may cause problems (-_-).
   */
  const aboutSlug = slug.slice(start, end) + '...'
  // const urlSlug = slugify(slug.slice(start, urlLength))
  const urlSlug = slugify(title)

  return (
    <div className="mx-6 my-4 border-gray-light">
      <div className="mb-4 text-xl font-bold text-center text-gray-600 truncate whitespace-nowrap text-ellipsis">
        {title}
      </div>
      <p className="px-2 mb-8 text-lg font-normal text-gray-700 md:text-sm md:mb-0 md:pl-4">
        {aboutSlug}
      </p>
      <div>
        <CardButton
          text="Read More"
          slug={urlSlug}
          id={id}
          path={path}
          cname={cname.button}
        />
      </div>
    </div>
  )
}


