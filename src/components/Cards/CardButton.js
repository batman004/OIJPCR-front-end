import { Link } from 'react-router-dom'

const CardButton = ({
  slug,
  id,
  path,
  cname,
}) => {
  const pathUrl = path ? path : '/archive'
  return (
    <div className={`inline-flex items-center ${cname || ''}`}>
      <Link
        to={`/archive/${slug}/${id}`}
        className="btn-academic-ghost"
      >
        Read Article
      </Link>
      {path && (
        <Link
          to={`${pathUrl}/${slug}/${id}`}
          className="ml-3 inline-block px-5 py-2 text-sm font-medium rounded-sm border max-w-max transition-colors duration-150"
          style={{
            color: 'var(--color-text-muted)',
            borderColor: 'var(--color-border)',
            background: 'transparent',
          }}
        >
          Edit
        </Link>
      )}
    </div>
  )
}

export default CardButton
