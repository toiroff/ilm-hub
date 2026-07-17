import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.25) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

export function useCountUp(
  end: number,
  enabled: boolean,
  duration = 1600,
  decimals = 0,
) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return

    let start: number | null = null
    let frame: number

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Number((eased * end).toFixed(decimals)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [end, enabled, duration, decimals])

  return value
}
