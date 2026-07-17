import type { RefObject } from 'react'
import { useCountUp, useInView } from '../hooks/useMotion'

type Props = {
  value: number
  suffix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  decimals = 0,
  className,
}: Props) {
  const { ref, inView } = useInView(0.3)
  const count = useCountUp(value, inView, 1600, decimals)

  return (
    <span ref={ref as RefObject<HTMLSpanElement>} className={className}>
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
      {suffix}
    </span>
  )
}
