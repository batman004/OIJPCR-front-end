import { useCallback, useEffect, useRef, useState } from 'react'
import slides from './slides'
import Lightbox from './Lightbox'

const AUTOPLAY_MS = 3000

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Native scroll-snap strip: swipes on touch, scrolls with a trackpad, and the
// arrows / dots drive the same scroll position. Auto-advance is slow, pauses on
// hover, focus and when off-screen, stops for good once the visitor takes over,
// and never starts for reduced-motion users.
export default function AnniversaryCarousel() {
  const section = useRef(null)
  const track = useRef(null)
  const frame = useRef(null)

  const [active, setActive] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [playing, setPlaying] = useState(() => !prefersReducedMotion())
  const [hovering, setHovering] = useState(false)
  const [inView, setInView] = useState(false)
  const [open, setOpen] = useState(null)

  const step = () => {
    const items = track.current.children
    return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : track.current.clientWidth
  }

  const scrollToIndex = useCallback((index) => {
    const el = track.current
    if (!el) return
    const left = Math.max(0, Math.min(index, slides.length - 1)) * step()
    el.scrollTo({ left, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [])

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
    setAtStart(el.scrollLeft < 2)
    setAtEnd(end)
    setActive(end ? slides.length - 1 : Math.round(el.scrollLeft / step()))
  }, [])

  const onScroll = () => {
    if (frame.current) return
    frame.current = requestAnimationFrame(() => {
      frame.current = null
      measure()
    })
  }

  const advance = useCallback(() => {
    const el = track.current
    if (!el) return
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
    if (end) el.scrollTo({ left: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    else el.scrollBy({ left: step(), behavior: 'smooth' })
  }, [])

  // Take control: any manual navigation switches auto-advance off.
  const manual = (fn) => (...args) => {
    setPlaying(false)
    fn(...args)
  }

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [measure])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return setInView(true)
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    observer.observe(section.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!playing || hovering || !inView || open !== null) return
    const timer = setInterval(() => {
      if (!document.hidden) advance()
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [playing, hovering, inView, open, advance])

  // Pressing Play moves on straight away so the button visibly does something.
  const togglePlaying = () => {
    if (!playing) advance()
    setPlaying(!playing)
  }

  const close = useCallback(() => setOpen(null), [])
  const changeSlide = useCallback((index) => {
    setOpen(index)
    scrollToIndex(index)
  }, [scrollToIndex])

  return (
    <section
      id="decade"
      ref={section}
      className="mx-2 mt-2 mb-6 sm:mx-8 md:mx-12 noprint"
      aria-roledescription="carousel"
      aria-label="A Decade in Pursuit of Peace"
      style={{ scrollMarginTop: 16 }}
    >
      <div className="flex flex-wrap items-end justify-between mb-3">
        <div className="mr-4">
          <p className="text-sm font-bold tracking-wider uppercase primary-color">2016 &ndash; 2026</p>
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">A Decade in Pursuit of Peace</h2>
        </div>

        <div className="flex items-center mt-2 space-x-2">
          <p className="mr-2 text-sm font-semibold text-gray-600 tabular-nums">
            {active + 1} / {slides.length}
          </p>
          <ControlButton
            label={playing ? 'Pause slideshow' : 'Play slideshow'}
            pressed={!playing}
            onClick={togglePlaying}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </ControlButton>
          <ControlButton label="Previous slide" disabled={atStart} onClick={manual(() => scrollToIndex(active - 1))}>
            <ChevronIcon direction="left" />
          </ControlButton>
          <ControlButton label="Next slide" disabled={atEnd} onClick={manual(() => scrollToIndex(active + 1))}>
            <ChevronIcon direction="right" />
          </ControlButton>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={onScroll}
        onPointerDown={() => setPlaying(false)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        className="flex pb-2 overflow-x-auto no-scrollbar"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {slides.map((slide, index) => (
          <li
            key={slide.id}
            className="flex-none w-64 mr-4 md:w-72 lg:w-80"
            style={{ scrollSnapAlign: 'start' }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slide.id} of ${slides.length}`}
          >
            <button
              type="button"
              onClick={() => setOpen(index)}
              className="relative block w-full overflow-hidden bg-gray-100 rounded-lg shadow-md cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 slide-card"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                width="720"
                height="900"
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
                draggable="false"
                className="block w-full h-auto"
              />
              <span className="slide-zoom" aria-hidden="true">
                <ZoomIcon />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap justify-center mt-2" role="group" aria-label="Choose slide">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={manual(() => scrollToIndex(index))}
            aria-label={`Go to slide ${slide.id}`}
            aria-current={index === active ? 'true' : undefined}
            className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <span
              className={`block w-2.5 h-2.5 rounded-full ${index === active ? 'primary-color-bg' : 'bg-gray-300'}`}
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox slides={slides} index={open} onClose={close} onChange={changeSlide} />
      )}
    </section>
  )
}

function ControlButton({ label, onClick, disabled, pressed, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={pressed}
      className={`flex items-center justify-center w-9 h-9 text-gray-800 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${disabled ? 'opacity-40 cursor-default' : ''}`}
    >
      {children}
    </button>
  )
}

const ChevronIcon = ({ direction }) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
)

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

const ZoomIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
  </svg>
)
