"use client"

import type React from "react"

import { useEffect, useRef, useMemo } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  PieController,
  DoughnutController,
  RadarController,
  LineController,
  BarController,
  ScatterController,
  BubbleController,
  PolarAreaController,
  Tooltip,
  Legend,
  Title,
  Filler,
} from "chart.js"
import { Chart as ChartJSReact } from "react-chartjs-2"
import { useTheme } from "next-themes"

// Register all components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  PieController,
  DoughnutController,
  RadarController,
  LineController,
  BarController,
  ScatterController,
  BubbleController,
  PolarAreaController,
  Tooltip,
  Legend,
  Title,
  Filler,
)

interface ChartProps {
  type: "line" | "bar" | "radar" | "pie" | "doughnut" | "polarArea" | "bubble" | "scatter"
  data: any
  options?: any
  className?: string
}

export function Chart({ type, data, options, className }: ChartProps) {
  const chartRef = useRef<ChartJS | null>(null)
  const { theme } = useTheme()

  // Set default colors based on theme
  useEffect(() => {
    // Only set global defaults once
    const isDark = theme === "dark"
    ChartJS.defaults.color = isDark ? "#cbd5e1" : "#64748b"
    ChartJS.defaults.borderColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
  }, [theme])

  // Handle cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [])

  // Prepare chart options with theme-aware grid colors
  const themeAwareOptions = useMemo(() => {
    const isDark = theme === "dark"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

    // Deep clone the options to avoid modifying the original
    const newOptions = JSON.parse(JSON.stringify(options || {}))

    // Add grid color settings if scales exist
    if (newOptions.scales) {
      Object.keys(newOptions.scales).forEach((scaleKey) => {
        const scale = newOptions.scales[scaleKey]
        if (scale) {
          if (!scale.grid) scale.grid = {}
          scale.grid.color = gridColor
        }
      })
    }

    return {
      responsive: true,
      maintainAspectRatio: false,
      ...newOptions,
    }
  }, [options, theme])

  return (
    <div className={`w-full h-full ${className || ""}`}>
      <ChartJSReact
        ref={chartRef}
        type={type}
        data={data}
        options={themeAwareOptions}
        redraw={true} // Force redraw on props change to avoid update issues
      />
    </div>
  )
}

// These are empty placeholder components to satisfy imports in other files
// They don't use useEffectEvent anymore
export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>
}

export const ChartTooltip = () => {
  return null
}

export const ChartTooltipContent = () => {
  return null
}

export const ChartLegend = () => {
  return null
}

export const ChartLegendContent = () => {
  return null
}

export const ChartStyle = () => {
  return null
}
