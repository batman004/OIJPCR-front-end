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
        className="inline-flex items-center px-4 py-2 my-4 mr-3 text-sm font-medium text-oijpcr-blue border border-oijpcr-blue rounded sm:my-2 max-w-max hover:bg-oijpcr-blue hover:text-white transition-colors duration-150"
      >
        Read Article
      </Link>
      {
        path
        &&
        <Link
          to={`${pathUrl}/${slug}/${id}`}
          className="inline-flex items-center px-4 py-2 my-4 mr-3 text-sm font-medium text-gray-600 border border-gray-400 rounded sm:my-2 max-w-max hover:bg-gray-600 hover:text-white transition-colors duration-150"
        >
          Edit
        </Link>
      }
    </div>
  )
}

export default CardButton
