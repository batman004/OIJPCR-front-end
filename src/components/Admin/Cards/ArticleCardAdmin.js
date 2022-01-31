import slugify from 'slugify'
import dollar from '../../../assets/stockPhotos/r1_c1.jpg'
import CardButton from './CardButton'
import { CardCover } from "../../Cards";
import { textClip } from "../../../utils";

const ArticleCardAdmin = (props) => {
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
      `rounded-md overflow-hidden shadow-lg my-4 md:m-4 md:h-auto 
       md:max-w-md lg:h-auto min-40 ${cname.container}`
    }
    >
      <CardCover coverPhoto={defaultPhoto} authorText={authorText} />
      <CardContent title={title} slug={slug} id={id} path={path} cname={cname.button} />
    </div>
  )
}

function CardContent({ title, slug, id, path, cname }) {
  const aboutSlug = textClip(slug, 250)
  const urlSlug = slugify(slug)

  return (
    <div className="mx-6 my-4 text-justify border-gray-light">
      <div className="h-10 text-lg font-bold text-left text-gray-600 truncate whitespace-nowrap">
        {title}
      </div>
      <p className="px-1 mb-8 font-normal text-gray-700 break-words text-md md:text-sm md:mb-0 md:h-32">
        {aboutSlug}
      </p>
      <div>
        <CardButton text="Read More" slug={urlSlug} id={id} path={path} cname={cname.button} />
      </div>
    </div>
  )
}

export default ArticleCardAdmin