import { Link } from 'react-router-dom'
import alertCircle from '../../assets/alert-circle.svg'

const CardButton = ({
  slug,
  id,
  path,
  cname
}) => {
  const pathUrl = path ? path : '/archive'
  return (
    <div className={cname}>
      <Link
        to={`/archive/${slug}/${id}`}
        className="px-4 py-2.5 my-4 mr-4 text-white bg-black rounded-lg sm:my-2 max-w-max"
      >
        <img src={alertCircle} className="inline mb-1 mr-2" alt="alert icon" />
        Read More
      </Link>
      {
        path
        &&
        <Link
          to={`${pathUrl}/${slug}/${id}`}
          className="px-4 py-2 my-4 text-white bg-black rounded-lg sm:my-4 max-w-max"
        >
          <img src={alertCircle} className="inline mb-1 mr-2" alt="alert icon" />
          Edit
        </Link>
      }
    </div>
  )
}

export default CardButton
