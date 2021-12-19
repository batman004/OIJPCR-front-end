import { Link } from 'react-router-dom'
import india from '../../assets/india.svg'
import pen from '../../assets/pen.svg'
import alertCircle from '../../assets/alert-circle.svg'

export default function Header() {
  const headerText = (
    <h1 className="text-2xl font-bold md:text-5xl">
      Online Indian Journal <br /> of Peace and Conflict Resolution
    </h1>
  )

  const aboutJournal =
    'The Journal will endeavour to highlight and discuss conflict issues pertinent' +
    ' to the peace and stability of the sub-continent and will develop a forum for' +
    ' networking, learning and information sharing to evolve innovative methods for' +
    ' managing and resolving conflicts.'

  return (
    <div className="relative bg-right bg-no-repeat bg-contain header-home primary-color-bg" style={{ backgroundImage: `url(${india})` }}>
      <div className="relative z-50 flex-1 p-2 max-w-prose">
        {headerText}
      </div>
      <div className="relative z-50 flex-1 p-2 max-w-prose">
        <p className="mb-4 text-sm md:text-xl">
          {aboutJournal}
        </p>
        <Link
          className="relative z-50 px-4 py-2 bg-black rounded-lg max-w-max"
          to="/about"
        >
          <img src={alertCircle} className="inline mb-1 mr-2" alt="alert icon" />
          Learn More
        </Link>
      </div>
      <img className="absolute inset-x-0 bottom-0 hidden w-24 h-24 transform -translate-x-1/2 md:inline left-1/2"
        src={pen} alt="decoration"
      />
    </div>
  )
}