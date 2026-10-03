import { useState } from 'react'
import slides, { tickerText } from './slides'

// A slim announcement bar above the hero: a fixed "10 years" badge and a
// continuously scrolling run of the milestone headlines. It stops on hover and
// keyboard focus, has a pause button, and stays still for visitors who ask their
// system for reduced motion (see .ticker-* in index.css).
export default function AnniversaryTicker() {
  const [paused, setPaused] = useState(false)

  return (
    <div
      className={`ticker flex items-stretch mx-2 mt-4 overflow-hidden text-white bg-black rounded-lg sm:mx-8 md:mx-12 noprint ${paused ? 'ticker-paused' : ''}`}
      role="region"
      aria-label="OIJPCR turns 10"
    >
      <div className="flex items-center flex-none px-3 py-2 text-xs font-bold tracking-wider uppercase primary-color-bg sm:px-4 sm:text-sm">
        <span className="ticker-dot" aria-hidden="true" />
        OIJPCR turns 10
      </div>

      <div className="relative flex-1 min-w-0 overflow-hidden ticker-viewport">
        <div className="flex w-max ticker-track">
          <TickerList />
          <TickerList hidden />
        </div>
        <span className="ticker-fade ticker-fade-left" aria-hidden="true" />
        <span className="ticker-fade ticker-fade-right" aria-hidden="true" />
      </div>

      <button
        type="button"
        onClick={() => setPaused(!paused)}
        aria-pressed={paused}
        aria-label={paused ? 'Resume scrolling headlines' : 'Pause scrolling headlines'}
        className="flex items-center flex-none px-3 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ticker-toggle"
      >
        {paused ? <PlayIcon /> : <PauseIcon />}
      </button>

      <a
        href="#decade"
        className="items-center flex-none hidden px-4 text-sm font-semibold text-white bg-gray-800 sm:flex hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      >
        See the journey <span className="ml-1" aria-hidden="true">&darr;</span>
      </a>
    </div>
  )
}

// The loop is two identical lists; the second is hidden from assistive tech so
// the headlines are only announced once.
function TickerList({ hidden }) {
  return (
    <ul
      className="flex items-center flex-none ticker-list"
      aria-hidden={hidden ? 'true' : undefined}
    >
      {slides.map((slide) => (
        <li key={slide.id} className="flex items-center flex-none py-2 text-sm whitespace-nowrap sm:text-base">
          <span className="font-semibold">{tickerText(slide)}</span>
          <span className="mx-5 text-gray-500" aria-hidden="true">&bull;</span>
        </li>
      ))}
    </ul>
  )
}

const PauseIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
)

const PlayIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13a1 1 0 001.5.86l10.5-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z" />
  </svg>
)
