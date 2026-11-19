import { useEffect, useRef } from 'react'

/** Thin bar across the top of the viewport showing how far through `targetRef` the reader is. */
export default function ReadingProgress({ targetRef }) {
  const barRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const target = targetRef.current
      const bar = barRef.current
      if (!target || !bar) return
      const { top, height } = target.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -top / scrollable)) : 0
      bar.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [targetRef])

  return <div ref={barRef} className="reading-progress" aria-hidden="true" />
}
