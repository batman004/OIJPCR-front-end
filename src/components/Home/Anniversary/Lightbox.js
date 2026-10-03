import { useEffect, useRef } from 'react'

const FOCUSABLE = 'button, [href], [tabindex]:not([tabindex="-1"])'

// Full-size view of one slide. The slides have their copy baked into the image,
// so being able to read them at size matters more than for an ordinary photo.
export default function Lightbox({ slides, index, onClose, onChange }) {
  const dialog = useRef(null)
  const closeButton = useRef(null)
  const slide = slides[index]
  const last = slides.length - 1

  const go = (next) => onChange(Math.min(last, Math.max(0, next)))

  useEffect(() => {
    const opener = document.activeElement
    const scrollLock = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current.focus()

    return () => {
      document.body.style.overflow = scrollLock
      if (opener && opener.focus) opener.focus()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') return onClose()
      if (event.key === 'ArrowLeft') return go(index - 1)
      if (event.key === 'ArrowRight') return go(index + 1)
      if (event.key !== 'Tab') return

      // Keep Tab inside the dialog while it is open.
      const items = [...dialog.current.querySelectorAll(FOCUSABLE)].filter((el) => !el.disabled)
      const first = items[0]
      const final = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        final.focus()
      } else if (!event.shiftKey && document.activeElement === final) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line
  }, [index, onClose])

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`Slide ${slide.id} of ${slides.length}`}
      className="fixed inset-0 flex flex-col items-center justify-center p-3 bg-black bg-opacity-90 noprint"
      style={{ zIndex: 1000 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between w-full max-w-3xl pb-3 text-white" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-semibold" aria-live="polite">
          {slide.id} / {slides.length}
        </p>
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          className="px-3 py-1 text-sm font-semibold bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Close <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="relative flex items-center justify-center w-full max-w-3xl min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
        <NavButton side="left" disabled={index === 0} label="Previous slide" onClick={() => go(index - 1)} />
        <img
          src={slide.fullSrc}
          alt={slide.alt}
          width="1440"
          height="1800"
          className="object-contain rounded-md shadow-2xl"
          style={{ maxHeight: 'calc(100vh - 6rem)', maxWidth: '100%', width: 'auto', height: 'auto' }}
        />
        <NavButton side="right" disabled={index === last} label="Next slide" onClick={() => go(index + 1)} />
      </div>
    </div>
  )
}

function NavButton({ side, disabled, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`absolute top-1/2 z-10 flex items-center justify-center w-10 h-10 -mt-5 text-xl text-white bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white ${disabled ? 'opacity-30 cursor-default' : ''} ${side === 'left' ? 'left-1' : 'right-1'}`}
    >
      <span aria-hidden="true">{side === 'left' ? '‹' : '›'}</span>
    </button>
  )
}
