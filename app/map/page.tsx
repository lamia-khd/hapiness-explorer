"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FadeIn } from "@/components/animations/fade-in"
import { ScaleIn } from "@/components/animations/scale-in"
import { useTheme } from "next-themes"
import { AnimatedChart } from "@/components/animations/animated-chart"
import { WorldMap } from "@/components/world-map"

// Sample data based on World Happiness Index
const happinessData = [
  { country: "Finland", code: "FIN", score: 7.8, region: "Europe" },
  { country: "Denmark", code: "DNK", score: 7.6, region: "Europe" },
  { country: "Switzerland", code: "CHE", score: 7.5, region: "Europe" },
  { country: "Iceland", code: "ISL", score: 7.5, region: "Europe" },
  { country: "Norway", code: "NOR", score: 7.4, region: "Europe" },
  { country: "Netherlands", code: "NLD", score: 7.4, region: "Europe" },
  { country: "Sweden", code: "SWE", score: 7.3, region: "Europe" },
  { country: "New Zealand", code: "NZL", score: 7.3, region: "Oceania" },
  { country: "Austria", code: "AUT", score: 7.2, region: "Europe" },
  { country: "Australia", code: "AUS", score: 7.2, region: "Oceania" },
  { country: "Israel", code: "ISR", score: 7.1, region: "Asia" },
  { country: "Germany", code: "DEU", score: 7.1, region: "Europe" },
  { country: "Canada", code: "CAN", score: 7.0, region: "North America" },
  { country: "Ireland", code: "IRL", score: 7.0, region: "Europe" },
  { country: "United States", code: "USA", score: 6.9, region: "North America" },
  { country: "United Kingdom", code: "GBR", score: 6.8, region: "Europe" },
  { country: "France", code: "FRA", score: 6.7, region: "Europe" },
  { country: "Mexico", code: "MEX", score: 6.5, region: "North America" },
  { country: "Spain", code: "ESP", score: 6.4, region: "Europe" },
  { country: "Italy", code: "ITA", score: 6.4, region: "Europe" },
  { country: "Brazil", code: "BRA", score: 6.3, region: "South America" },
  { country: "Chile", code: "CHL", score: 6.2, region: "South America" },
  { country: "Japan", code: "JPN", score: 6.0, region: "Asia" },
  { country: "South Korea", code: "KOR", score: 5.9, region: "Asia" },
  { country: "Russia", code: "RUS", score: 5.5, region: "Europe" },
  { country: "China", code: "CHN", score: 5.3, region: "Asia" },
  { country: "India", code: "IND", score: 4.0, region: "Asia" },
  { country: "South Africa", code: "ZAF", score: 4.8, region: "Africa" },
  { country: "Egypt", code: "EGY", score: 4.3, region: "Africa" },
  { country: "Nigeria", code: "NGA", score: 4.0, region: "Africa" },
  { country: "Kenya", code: "KEN", score: 4.4, region: "Africa" },
  { country: "Ghana", code: "GHA", score: 4.9, region: "Africa" },
  { country: "Ethiopia", code: "ETH", score: 4.1, region: "Africa" },
  { country: "Tanzania", code: "TZA", score: 3.8, region: "Africa" },
  { country: "Uganda", code: "UGA", score: 4.4, region: "Africa" },
  { country: "Zimbabwe", code: "ZWE", score: 3.3, region: "Africa" },
  { country: "Afghanistan", code: "AFG", score: 2.5, region: "Asia" },
]

// Group data by region
const regionData = happinessData.reduce((acc, country) => {
  if (!acc[country.region]) {
    acc[country.region] = []
  }
  acc[country.region].push(country)
  return acc
}, {})

// Calculate average happiness score by region
const regionAverages = Object.keys(regionData).map((region) => {
  const countries = regionData[region]
  const total = countries.reduce((sum, country) => sum + country.score, 0)
  const average = total / countries.length
  return { region, average }
})

export default function MapPage() {
  const [year, setYear] = useState("2023")
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState("All")
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Filter countries by region if needed
  const filteredData =
    selectedRegion === "All" ? happinessData : happinessData.filter((country) => country.region === selectedRegion)

  // Prepare data for region comparison
  const regionChartData = {
    labels: regionAverages.map((r) => r.region),
    datasets: [
      {
        label: "Average Happiness Score",
        data: regionAverages.map((r) => r.average),
        backgroundColor: isDark ? "rgba(56, 189, 248, 0.6)" : "rgba(3, 105, 161, 0.6)",
        borderColor: isDark ? "#38bdf8" : "#0369a1",
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="container py-6">
      <FadeIn className="space-y-1 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Happiness World Map</h1>
        <p className="text-muted-foreground">Visualize happiness scores across different countries</p>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-3">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle>Global Happiness Map</CardTitle>
              <CardDescription>Darker colors indicate higher happiness scores</CardDescription>
              <div className="flex items-center gap-4 mt-2">
                <div className="grid gap-1">
                  <label htmlFor="year" className="text-xs font-medium">
                    Year
                  </label>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger id="year" className="h-7 text-xs w-[100px]">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1">
                  <label htmlFor="region" className="text-xs font-medium">
                    Region
                  </label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger id="region" className="h-7 text-xs w-[150px]">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Regions</SelectItem>
                      {Object.keys(regionData).map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[500px] relative">
              <ScaleIn>
                <WorldMap data={filteredData} setSelectedCountry={setSelectedCountry} />
              </ScaleIn>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Country Details</CardTitle>
              <CardDescription>Select a country on the map to see details</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedCountry ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{selectedCountry.country}</h3>
                    <p className="text-sm text-muted-foreground">Region: {selectedCountry.region}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Happiness Score</div>
                    <div className="text-3xl font-bold">{selectedCountry.score.toFixed(1)}</div>
                    <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(selectedCountry.score / 10) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>10</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Happiness Ranking</div>
                    <div className="text-lg">
                      {happinessData
                        .sort((a, b) => b.score - a.score)
                        .findIndex((country) => country.code === selectedCountry.code) + 1}
                      {" of "}
                      {happinessData.length}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Happiness Category</div>
                    <div className="text-lg">
                      {selectedCountry.score >= 7.0
                        ? "Very Happy"
                        : selectedCountry.score >= 6.0
                          ? "Happy"
                          : selectedCountry.score >= 5.0
                            ? "Moderately Happy"
                            : selectedCountry.score >= 4.0
                              ? "Less Happy"
                              : "Least Happy"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground">
                  <p>Click on a country on the map to view its happiness details</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6 transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Regional Comparison</CardTitle>
              <CardDescription>Average happiness scores by region</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
              <AnimatedChart
                type="bar"
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 8,
                      title: {
                        display: true,
                        text: "Average Score",
                        font: {
                          size: 10,
                        },
                      },
                      ticks: {
                        font: {
                          size: 9,
                        },
                      },
                      grid: {
                        color: "rgba(200, 200, 200, 0.1)",
                      },
                    },
                    x: {
                      ticks: {
                        font: {
                          size: 9,
                        },
                      },
                      grid: {
                        color: "rgba(200, 200, 200, 0.1)",
                      },
                    },
                  },
                }}
                data={regionChartData}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
