"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { ComposableMap, Geographies, Geography, ZoomableGroup, Sphere, Graticule } from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface WorldMapProps {
  data: {
    country: string
    code: string
    score: number
    region: string
  }[]
  setSelectedCountry: (country: any) => void
}

export function WorldMap({ data, setSelectedCountry }: WorldMapProps) {
  const { theme } = useTheme()
  const [tooltipContent, setTooltipContent] = useState("")
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [mapData, setMapData] = useState(data)

  // Create a color scale based on happiness scores
  const colorScale = scaleLinear<string>()
    .domain([2.5, 8.0])
    .range([
      theme === "dark" ? "rgba(56, 189, 248, 0.2)" : "rgba(3, 105, 161, 0.2)",
      theme === "dark" ? "rgba(56, 189, 248, 1)" : "rgba(3, 105, 161, 1)",
    ])

  // Update map data when theme changes
  useEffect(() => {
    setMapData([...data])
  }, [theme, data])

  return (
    <div className="relative w-full h-full">
      <TooltipProvider>
        <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
          <TooltipTrigger asChild>
            <div className="w-full h-full" onMouseLeave={() => setTooltipOpen(false)}>
              <ComposableMap
                projectionConfig={{
                  rotate: [-10, 0, 0],
                  scale: 147,
                }}
                width={800}
                height={400}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <ZoomableGroup zoom={1}>
                  <Sphere stroke={theme === "dark" ? "#334155" : "#cbd5e1"} strokeWidth={0.5} fill="transparent" />
                  <Graticule stroke={theme === "dark" ? "#334155" : "#cbd5e1"} strokeWidth={0.5} />
                  <Geographies geography="/data/simplified-world.json">
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const countryCode = geo.properties.code
                        const countryData = mapData.find((d) => d.code === countryCode)

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={
                              countryData ? colorScale(countryData.score) : theme === "dark" ? "#1e293b" : "#e2e8f0"
                            }
                            stroke={theme === "dark" ? "#334155" : "#cbd5e1"}
                            strokeWidth={0.5}
                            style={{
                              default: { outline: "none" },
                              hover: { outline: "none", fill: theme === "dark" ? "#38bdf8" : "#0284c7" },
                              pressed: { outline: "none" },
                            }}
                            onMouseEnter={(evt) => {
                              const { name } = geo.properties
                              const score = countryData ? countryData.score.toFixed(1) : "No data"
                              setTooltipContent(`${name}: ${score}`)
                              setTooltipOpen(true)
                              setTooltipPosition({ x: evt.clientX, y: evt.clientY })
                            }}
                            onMouseLeave={() => {
                              setTooltipContent("")
                              setTooltipOpen(false)
                            }}
                            onClick={() => {
                              if (countryData) {
                                setSelectedCountry(countryData)
                              }
                            }}
                          />
                        )
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="z-50 bg-background border shadow-md px-3 py-1.5 text-sm"
            style={{
              position: "absolute",
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y - 40}px`,
            }}
          >
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-md border">
        <div className="text-xs font-medium mb-1">Happiness Score</div>
        <div className="flex items-center gap-1">
          <div
            className="w-4 h-4"
            style={{ backgroundColor: theme === "dark" ? "rgba(56, 189, 248, 0.2)" : "rgba(3, 105, 161, 0.2)" }}
          ></div>
          <span className="text-xs">2.5</span>
          <div
            className="w-16 h-2 rounded-full"
            style={{
              background: `linear-gradient(to right, ${
                theme === "dark" ? "rgba(56, 189, 248, 0.2)" : "rgba(3, 105, 161, 0.2)"
              }, ${theme === "dark" ? "rgba(56, 189, 248, 1)" : "rgba(3, 105, 161, 1)"})`,
            }}
          ></div>
          <span className="text-xs">8.0</span>
          <div
            className="w-4 h-4"
            style={{ backgroundColor: theme === "dark" ? "rgba(56, 189, 248, 1)" : "rgba(3, 105, 161, 1)" }}
          ></div>
        </div>
      </div>
    </div>
  )
}
