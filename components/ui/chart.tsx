"use client"

import type React from "react"

import { useEffect, useRef } from "react"
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

// Set default options
ChartJS.defaults.color = "#64748b"
ChartJS.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

interface ChartProps {
  type: "line" | "bar" | "radar" | "pie" | "doughnut" | "polarArea" | "bubble" | "scatter"
  data: any
  options?: any
  className?: string
}

export function Chart({ type, data, options, className }: ChartProps) {
  const chartRef = useRef<ChartJS>(null)

  useEffect(() => {
    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className={`w-full h-full ${className || ""}`}>
      <ChartJSReact
        ref={chartRef}
        type={type}
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          ...options,
        }}
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
