import { Link } from 'react-router-dom'

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
        className="inline-flex items-center px-4 py-2.5 my-4 mr-4 text-white bg-black rounded-lg sm:my-2 max-w-max"
      >
        Read More
      </Link>
      {
        path
        &&
        <Link
          to={`${pathUrl}/${slug}/${id}`}
          className="inline-flex items-center px-4 py-2.5 my-4 mr-4 text-white bg-black rounded-lg sm:my-2 max-w-max"
        >
          Edit
        </Link>
      }
    </div>
  )
}

export default CardButton
