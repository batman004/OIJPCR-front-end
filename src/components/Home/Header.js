import { Link } from 'react-router-dom'

export default function Header() {
  const headerText = (
    <h1 className="text-3xl md:text-5xl leading-tight">
      Online Indian Journal <br /> of Peace and Conflict Resolution
    </h1>
  )

  const aboutJournal =
    'The Journal will endeavour to highlight and discuss conflict issues pertinent' +
    ' to the peace and stability of the sub-continent and will develop a forum for' +
    ' networking, learning and information sharing to evolve innovative methods for' +
    ' managing and resolving conflicts.'

  return (
    <div className="header-home">
      <div className="relative z-50 flex-1 max-w-prose">
        {headerText}
      </div>
      <div className="relative z-50 flex-1 max-w-prose md:pl-8">
        <p className="mb-6 text-base md:text-lg leading-relaxed">
          {aboutJournal}
        </p>
        <Link className="btn-academic-on-dark" to="/about">
          Learn More
        </Link>
      </div>
    </div>
  )
}
