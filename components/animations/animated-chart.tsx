"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Chart as ChartComponent } from "@/components/ui/chart"
import { useTheme } from "next-themes"
import { useMemo } from "react"

interface AnimatedChartProps {
  type: "line" | "bar" | "radar" | "pie" | "doughnut" | "polarArea" | "bubble" | "scatter"
  data: any
  options?: any
  className?: string
  delay?: number
}

export function AnimatedChart({ type, data, options, className, delay = 0 }: AnimatedChartProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { theme } = useTheme()

  // Create animated data based on the original data
  const animatedData = { ...data }

  if (isInView) {
    // For different chart types, we need different animations
    if (type === "pie" || type === "doughnut" || type === "polarArea") {
      // These chart types don't need special handling
    } else if (type === "radar") {
      // For radar charts, we animate the dataset values
    } else if (type === "scatter" || type === "bubble") {
      // For scatter/bubble charts, we don't animate the data itself
    } else {
      // For bar and line charts, we animate the dataset values
    }
  }

  // Create theme-aware options
  const themeAwareOptions = useMemo(() => {
    const isDark = theme === "dark"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

    return {
      ...options,
      animation: {
        duration: 1500,
        easing: "easeOutQuart",
      },
    }
  }, [options, theme])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`w-full h-full ${className || ""}`}
    >
      <ChartComponent type={type} data={data} options={themeAwareOptions} />
    </motion.div>
  )
}
