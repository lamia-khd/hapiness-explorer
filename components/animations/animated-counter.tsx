"use client"

import { useEffect, useState } from "react"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  delay?: number
  formatter?: (value: number) => string
  className?: string
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 1.5,
  delay = 0,
  formatter = (value) => value.toFixed(1),
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const startAnimation = (timestamp: number) => {
      startTime = timestamp
      animateCount(timestamp)
    }

    const animateCount = (timestamp: number) => {
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      const currentCount = from + (to - from) * easedProgress
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCount)
      }
    }

    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(startAnimation)
    }, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [from, to, duration, delay, isInView])

  return (
    <span ref={ref} className={className}>
      {formatter(count)}
    </span>
  )
}
