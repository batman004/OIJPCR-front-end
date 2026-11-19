import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="wrap flex flex-col justify-center min-h-screen py-16">
      <p className="meta">Error 404</p>
      <h1 className="page-title mt-3 max-w-[18ch]">This page is not in the journal</h1>
      <p className="summary mt-5 max-w-[48ch]">
        The address may be mistyped, or the page may have moved.
      </p>
      <div className="flex flex-wrap items-center gap-6 mt-8">
        <Link to="/" className="btn">Go to the front page</Link>
        <Link to="/archive" className="text-link">
          Browse the archive <span className="arrow" aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  )
}
