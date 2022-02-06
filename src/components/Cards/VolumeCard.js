import fallback from '../../assets/stockPhotos/r2_c1.jpg'
import { Link } from 'react-router-dom'

// volume, about, cover, date, isAdmin?
const VolumeCard = ({
  volume,
  about,
  cover,
  date,
  isAdmin,
}) => (
  <div className="h-auto max-w-sm m-4 overflow-hidden text-justify rounded-md shadow-lg min-40 md:max-w-md lg:h-auto">
    <CardCover volumeCover={cover || fallback} volume={volume} date={date} />
    <CardContent volume={volume} about={about} isAdmin={isAdmin} />
  </div>
)


function CardCover({ volumeCover, volume, date }) {
  return (
    <>
      <img className="object-cover w-full h-98 md:h-64 hover:bg-gray"
        src={volumeCover}
        alt={`volume ${volume}`}
      />
      <p className="mt-2 text-sm font-medium text-center text-gray-500">{date}</p>
    </>
  )
}

function CardContent({ about, volume, isAdmin }) {
  const start = 0,
    end = about.length >= 250 ? 250 : about.length
  /**
   * slug length limit is 250 for optimal viewing.
   * url slug limit will be enforced later
   * changing urls always causes trouble (-_-).
   */
  const volumeSlug = about.slice(start, end)

  return (
    <div className="mx-6 my-4 text-justify border-gray-light">
      <div className="mb-4 text-4xl font-bold text-center text-gray-900">
        Volume {volume}
      </div>
      <p className="mb-6 text-sm font-normal text-justify text-gray-700 md:text-md">
        {volumeSlug}
      </p>
      <div>
        <CardButton text={`Explore Vol. ${volume}`} volume={volume} />
        {
          isAdmin
          &&
          <CardButton text={`Edit Vol. ${volume}`} volume={volume} isAdmin={isAdmin} />
        }
      </div>
    </div>
  )
}

function CardButton({ text, volume, isAdmin }) {
  let link = `/archive/${volume}`
  if (isAdmin)
    link = `/admin/list/volume/${volume}`
  return (
    <Link
      to={link}
      className="px-4 py-2 my-4 mr-4 text-white bg-black rounded-lg sm:my-4 max-w-max"
    >
      {text}
    </Link>
  )
}


export default VolumeCard