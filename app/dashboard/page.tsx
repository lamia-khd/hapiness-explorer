"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerChildren } from "@/components/animations/stagger-children"
import { AnimatedChart } from "@/components/animations/animated-chart"

// Sample data based on World Happiness Index [^1]
const happinessData = [
  {
    country: "Finland",
    score: 7.769,
    gdp: 1.34,
    social: 1.587,
    health: 0.986,
    freedom: 0.596,
    generosity: 0.153,
    corruption: 0.393,
    region: "Europe",
  },
  {
    country: "Denmark",
    score: 7.6,
    gdp: 1.383,
    social: 1.573,
    health: 0.996,
    freedom: 0.592,
    generosity: 0.252,
    corruption: 0.41,
    region: "Europe",
  },
  {
    country: "Norway",
    score: 7.554,
    gdp: 1.488,
    social: 1.582,
    health: 1.028,
    freedom: 0.603,
    generosity: 0.271,
    corruption: 0.341,
    region: "Europe",
  },
  {
    country: "Iceland",
    score: 7.494,
    gdp: 1.38,
    social: 1.624,
    health: 1.026,
    freedom: 0.591,
    generosity: 0.354,
    corruption: 0.118,
    region: "Europe",
  },
  {
    country: "Netherlands",
    score: 7.488,
    gdp: 1.396,
    social: 1.522,
    health: 0.999,
    freedom: 0.557,
    generosity: 0.322,
    corruption: 0.298,
    region: "Europe",
  },
  // More data...
]

// First, let's update the regional data to include more metrics for comparison
const regionalData = [
  {
    region: "Europe",
    avgScore: 6.8,
    avgGdp: 1.3,
    avgSocial: 1.5,
    avgHealth: 0.98,
    avgFreedom: 0.55,
    avgGenerosity: 0.25,
    avgCorruption: 0.22,
  },
  {
    region: "North America",
    avgScore: 6.9,
    avgGdp: 1.3,
    avgSocial: 1.45,
    avgHealth: 0.9,
    avgFreedom: 0.54,
    avgGenerosity: 0.28,
    avgCorruption: 0.18,
  },
  {
    region: "Asia",
    avgScore: 5.4,
    avgGdp: 1.0,
    avgSocial: 1.2,
    avgHealth: 0.85,
    avgFreedom: 0.48,
    avgGenerosity: 0.21,
    avgCorruption: 0.12,
  },
  {
    region: "Africa",
    avgScore: 4.3,
    avgGdp: 0.7,
    avgSocial: 1.0,
    avgHealth: 0.5,
    avgFreedom: 0.42,
    avgGenerosity: 0.23,
    avgCorruption: 0.1,
  },
  {
    region: "South America",
    avgScore: 5.9,
    avgGdp: 0.9,
    avgSocial: 1.3,
    avgHealth: 0.8,
    avgFreedom: 0.51,
    avgGenerosity: 0.18,
    avgCorruption: 0.08,
  },
  {
    region: "Oceania",
    avgScore: 7.2,
    avgGdp: 1.3,
    avgSocial: 1.55,
    avgHealth: 1.0,
    avgFreedom: 0.58,
    avgGenerosity: 0.33,
    avgCorruption: 0.32,
  },
]

export default function DashboardPage() {
  const [xAxis, setXAxis] = useState("gdp")
  const [yAxis, setYAxis] = useState("score")
  const [region, setRegion] = useState("all")

  // Now, let's add a new state variable for the selected region in the comparison
  const [selectedRegion, setSelectedRegion] = useState("Europe")

  // Filter data by region if needed
  const filteredData = region === "all" ? happinessData : happinessData.filter((item) => item.region === region)

  // Prepare data for scatter plot
  const scatterData = {
    datasets: [
      {
        label: "Countries",
        data: filteredData.map((item) => ({
          x: item[xAxis],
          y: item[yAxis],
          country: item.country,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }

  // Now, let's update the barData to include more metrics for the selected region
  // Prepare data for regional comparison
  const barData = {
    labels: ["Happiness Score", "GDP", "Social Support", "Health", "Freedom", "Generosity", "Low Corruption"],
    datasets: [
      {
        label: "Global Average",
        data: [
          5.9, // Global average happiness score
          1.0, // Global average GDP
          1.3, // Global average social support
          0.85, // Global average health
          0.5, // Global average freedom
          0.25, // Global average generosity
          0.17, // Global average corruption
        ],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 1,
      },
      {
        label: selectedRegion,
        data: [
          regionalData.find((r) => r.region === selectedRegion)?.avgScore || 0,
          regionalData.find((r) => r.region === selectedRegion)?.avgGdp || 0,
          regionalData.find((r) => r.region === selectedRegion)?.avgSocial || 0,
          regionalData.find((r) => r.region === selectedRegion)?.avgHealth || 0,
          regionalData.find((r) => r.region === selectedRegion)?.avgFreedom || 0,
          regionalData.find((r) => r.region === selectedRegion)?.avgGenerosity || 0,
          regionalData.find((r) => r.region === selectedRegion)?.avgCorruption || 0,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  }

  // Prepare data for regional happiness scores comparison (as shown in the image)
  const regionalScoresData = {
    labels: regionalData.map((item) => item.region),
    datasets: [
      {
        label: "Average Happiness Score",
        data: regionalData.map((item) => item.avgScore),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  }

  // Prepare data for radar chart
  const topCountry = happinessData[0]
  const radarData = {
    labels: ["GDP", "Social Support", "Health", "Freedom", "Generosity", "Low Corruption"],
    datasets: [
      {
        label: topCountry.country,
        data: [
          (topCountry.gdp / 1.6) * 10,
          (topCountry.social / 1.7) * 10,
          (topCountry.health / 1.1) * 10,
          (topCountry.freedom / 0.6) * 10,
          (topCountry.generosity / 0.4) * 10,
          (topCountry.corruption / 0.4) * 10,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        pointBackgroundColor: "rgb(75, 192, 192)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(75, 192, 192)",
      },
    ],
  }

  return (
    <div className="container py-6">
      <FadeIn className="space-y-1 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Interactive Dashboard</h1>
        <p className="text-muted-foreground">Explore correlations, rankings, and regional comparisons</p>
      </FadeIn>

      <StaggerChildren className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Factor Correlation</CardTitle>
            <CardDescription className="text-xs">Explore the relationship between different factors</CardDescription>
            <div className="flex flex-wrap gap-2 mt-1">
              <div className="grid gap-1">
                <label htmlFor="x-axis" className="text-xs font-medium">
                  X-Axis
                </label>
                <Select value={xAxis} onValueChange={setXAxis}>
                  <SelectTrigger id="x-axis" className="h-7 text-xs w-[120px]">
                    <SelectValue placeholder="Select factor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gdp">GDP per Capita</SelectItem>
                    <SelectItem value="social">Social Support</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="freedom">Freedom</SelectItem>
                    <SelectItem value="generosity">Generosity</SelectItem>
                    <SelectItem value="corruption">Low Corruption</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1">
                <label htmlFor="y-axis" className="text-xs font-medium">
                  Y-Axis
                </label>
                <Select value={yAxis} onValueChange={setYAxis}>
                  <SelectTrigger id="y-axis" className="h-7 text-xs w-[120px]">
                    <SelectValue placeholder="Select factor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Happiness Score</SelectItem>
                    <SelectItem value="gdp">GDP per Capita</SelectItem>
                    <SelectItem value="social">Social Support</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="freedom">Freedom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1">
                <label htmlFor="region" className="text-xs font-medium">
                  Region
                </label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger id="region" className="h-7 text-xs w-[120px]">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="North America">North America</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                    <SelectItem value="Oceania">Oceania</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[250px]">
            <AnimatedChart
              type="scatter"
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const point = context.raw
                        return `${point.country}: (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`
                      },
                    },
                  },
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text:
                        xAxis === "gdp"
                          ? "GDP per Capita"
                          : xAxis === "social"
                            ? "Social Support"
                            : xAxis === "health"
                              ? "Health"
                              : xAxis === "freedom"
                                ? "Freedom"
                                : xAxis === "generosity"
                                  ? "Generosity"
                                  : "Low Corruption",
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
                  y: {
                    title: {
                      display: true,
                      text:
                        yAxis === "score"
                          ? "Happiness Score"
                          : yAxis === "gdp"
                            ? "GDP per Capita"
                            : yAxis === "social"
                              ? "Social Support"
                              : yAxis === "health"
                                ? "Health"
                                : "Freedom",
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
                },
              }}
              data={scatterData}
            />
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Regional Comparison</CardTitle>
            <CardDescription className="text-xs">Compare regions against global averages</CardDescription>
            <div className="grid gap-1 mt-2">
              <label htmlFor="compare-region" className="text-xs font-medium">
                Select Region
              </label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger id="compare-region" className="h-7 text-xs">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regionalData.map((item) => (
                    <SelectItem key={item.region} value={item.region}>
                      {item.region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="h-[250px]">
            <AnimatedChart
              type="bar"
              options={{
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      boxWidth: 10,
                      font: {
                        size: 9,
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.dataset.label || ""
                        const value = context.raw || 0
                        return `${label}: ${value.toFixed(2)}`
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Value (normalized)",
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
                        size: 8,
                      },
                      maxRotation: 45,
                      minRotation: 45,
                    },
                    grid: {
                      color: "rgba(200, 200, 200, 0.1)",
                    },
                  },
                },
              }}
              data={barData}
            />
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Country Profile</CardTitle>
            <CardDescription className="text-xs">Breakdown of factors for the happiest country</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <AnimatedChart
              type="radar"
              options={{
                scales: {
                  r: {
                    min: 0,
                    max: 10,
                    ticks: {
                      stepSize: 2,
                      font: {
                        size: 8,
                      },
                      backdropColor: "transparent",
                    },
                    pointLabels: {
                      font: {
                        size: 9,
                      },
                    },
                    grid: {
                      color: "rgba(200, 200, 200, 0.1)",
                    },
                    angleLines: {
                      color: "rgba(200, 200, 200, 0.1)",
                    },
                  },
                },
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      boxWidth: 10,
                      font: {
                        size: 10,
                      },
                    },
                  },
                },
              }}
              data={radarData}
            />
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top 5 Happiest Countries</CardTitle>
            <CardDescription className="text-xs">Distribution of happiness scores</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <AnimatedChart
              type="pie"
              options={{
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      boxWidth: 10,
                      padding: 10,
                      font: {
                        size: 9,
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || ""
                        const value = context.raw || 0
                        return `${label}: ${value.toFixed(2)}`
                      },
                    },
                  },
                },
                maintainAspectRatio: false,
              }}
              data={{
                labels: happinessData.slice(0, 5).map((country) => country.country),
                datasets: [
                  {
                    data: happinessData.slice(0, 5).map((country) => country.score),
                    backgroundColor: [
                      "rgba(75, 192, 192, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(153, 102, 255, 0.6)",
                      "rgba(255, 159, 64, 0.6)",
                      "rgba(255, 99, 132, 0.6)",
                    ],
                    borderColor: [
                      "rgb(75, 192, 192)",
                      "rgb(54, 162, 235)",
                      "rgb(153, 102, 255)",
                      "rgb(255, 159, 64)",
                      "rgb(255, 99, 132)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Happiness Factors Over Time</CardTitle>
            <CardDescription className="text-xs">How key factors have changed over recent years</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <AnimatedChart
              type="line"
              options={{
                scales: {
                  y: {
                    beginAtZero: false,
                    title: {
                      display: true,
                      text: "Value",
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
                    title: {
                      display: true,
                      text: "Year",
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
                },
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      boxWidth: 10,
                      font: {
                        size: 9,
                      },
                    },
                  },
                },
              }}
              data={{
                labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
                datasets: [
                  {
                    label: "GDP per Capita",
                    data: [0.85, 0.87, 0.9, 0.93, 0.95, 0.92, 0.96],
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                  },
                  {
                    label: "Social Support",
                    data: [0.78, 0.8, 0.82, 0.85, 0.87, 0.89, 0.9],
                    borderColor: "rgb(54, 162, 235)",
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                  },
                  {
                    label: "Health",
                    data: [0.7, 0.72, 0.75, 0.77, 0.8, 0.78, 0.82],
                    borderColor: "rgb(153, 102, 255)",
                    backgroundColor: "rgba(153, 102, 255, 0.5)",
                  },
                ],
              }}
            />
          </CardContent>
        </Card>

        {/* Regional Comparison Chart (as shown in the image) */}
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Regional Comparison</CardTitle>
            <CardDescription className="text-xs">Average happiness scores by region</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
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
              data={regionalScoresData}
            />
          </CardContent>
        </Card>
      </StaggerChildren>
    </div>
  )
}
