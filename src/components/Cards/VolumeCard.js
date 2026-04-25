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
  <div className="card-surface flex flex-col max-w-sm m-4 overflow-hidden text-left min-40 md:max-w-md">
    <CardCover volumeCover={cover || fallback} volume={volume} date={date} />
    <CardContent volume={volume} about={about} isAdmin={isAdmin} />
  </div>
)


function CardCover({ volumeCover, volume, date }) {
  return (
    <>
      <img className="object-cover w-full h-98 md:h-64"
        src={volumeCover}
        alt={`volume ${volume}`}
      />
      <p
        className="mt-3 text-xs font-medium text-center tracking-widest uppercase"
        style={{ color: 'var(--color-text-muted)' }}
      >{date}</p>
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
    <div className="mx-6 my-5 text-left flex flex-col flex-1">
      <div
        className="mb-3 text-3xl font-bold text-center font-serif"
        style={{ color: 'var(--color-primary)' }}
      >
        Volume {volume}
      </div>
      <p
        className="mb-6 text-sm font-normal leading-relaxed md:text-base"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {volumeSlug}
      </p>
      <div className="flex-1" />
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
      className="btn-academic mr-3 my-3 max-w-max"
    >
      {text}
    </Link>
  )
}


export default VolumeCard