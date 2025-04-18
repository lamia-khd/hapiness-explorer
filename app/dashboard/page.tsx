"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart } from "@/components/ui/chart"

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
  {
    country: "Switzerland",
    score: 7.48,
    gdp: 1.452,
    social: 1.526,
    health: 1.052,
    freedom: 0.572,
    generosity: 0.263,
    corruption: 0.343,
    region: "Europe",
  },
  {
    country: "Sweden",
    score: 7.343,
    gdp: 1.387,
    social: 1.487,
    health: 1.009,
    freedom: 0.574,
    generosity: 0.267,
    corruption: 0.373,
    region: "Europe",
  },
  {
    country: "New Zealand",
    score: 7.307,
    gdp: 1.303,
    social: 1.557,
    health: 1.026,
    freedom: 0.585,
    generosity: 0.33,
    corruption: 0.38,
    region: "Oceania",
  },
  {
    country: "Canada",
    score: 7.278,
    gdp: 1.365,
    social: 1.505,
    health: 1.039,
    freedom: 0.584,
    generosity: 0.285,
    corruption: 0.308,
    region: "North America",
  },
  {
    country: "Austria",
    score: 7.246,
    gdp: 1.376,
    social: 1.475,
    health: 1.016,
    freedom: 0.532,
    generosity: 0.244,
    corruption: 0.226,
    region: "Europe",
  },
  {
    country: "Australia",
    score: 7.228,
    gdp: 1.372,
    social: 1.548,
    health: 1.036,
    freedom: 0.557,
    generosity: 0.332,
    corruption: 0.29,
    region: "Oceania",
  },
  {
    country: "Costa Rica",
    score: 7.167,
    gdp: 1.034,
    social: 1.441,
    health: 0.963,
    freedom: 0.558,
    generosity: 0.144,
    corruption: 0.093,
    region: "North America",
  },
  {
    country: "Israel",
    score: 7.139,
    gdp: 1.276,
    social: 1.455,
    health: 1.029,
    freedom: 0.371,
    generosity: 0.261,
    corruption: 0.082,
    region: "Asia",
  },
  {
    country: "Luxembourg",
    score: 7.09,
    gdp: 1.609,
    social: 1.479,
    health: 1.012,
    freedom: 0.526,
    generosity: 0.194,
    corruption: 0.316,
    region: "Europe",
  },
  {
    country: "United Kingdom",
    score: 7.054,
    gdp: 1.333,
    social: 1.538,
    health: 0.996,
    freedom: 0.45,
    generosity: 0.348,
    corruption: 0.278,
    region: "Europe",
  },
  {
    country: "Ireland",
    score: 7.021,
    gdp: 1.499,
    social: 1.553,
    health: 0.999,
    freedom: 0.516,
    generosity: 0.298,
    corruption: 0.31,
    region: "Europe",
  },
  {
    country: "Germany",
    score: 6.985,
    gdp: 1.373,
    social: 1.454,
    health: 0.987,
    freedom: 0.495,
    generosity: 0.261,
    corruption: 0.265,
    region: "Europe",
  },
  {
    country: "Belgium",
    score: 6.923,
    gdp: 1.356,
    social: 1.504,
    health: 0.986,
    freedom: 0.473,
    generosity: 0.16,
    corruption: 0.21,
    region: "Europe",
  },
  {
    country: "United States",
    score: 6.892,
    gdp: 1.433,
    social: 1.457,
    health: 0.874,
    freedom: 0.454,
    generosity: 0.28,
    corruption: 0.128,
    region: "North America",
  },
  {
    country: "Czech Republic",
    score: 6.852,
    gdp: 1.269,
    social: 1.487,
    health: 0.92,
    freedom: 0.457,
    generosity: 0.046,
    corruption: 0.036,
    region: "Europe",
  },
]

// Regional data for comparison
const regionalData = [
  { region: "Europe", avgScore: 6.8, avgGdp: 1.3, avgSocial: 1.5, avgHealth: 0.98 },
  { region: "North America", avgScore: 6.9, avgGdp: 1.3, avgSocial: 1.45, avgHealth: 0.9 },
  { region: "Asia", avgScore: 5.4, avgGdp: 1.0, avgSocial: 1.2, avgHealth: 0.85 },
  { region: "Africa", avgScore: 4.3, avgGdp: 0.7, avgSocial: 1.0, avgHealth: 0.5 },
  { region: "South America", avgScore: 5.9, avgGdp: 0.9, avgSocial: 1.3, avgHealth: 0.8 },
  { region: "Oceania", avgScore: 7.2, avgGdp: 1.3, avgSocial: 1.55, avgHealth: 1.0 },
]

export default function DashboardPage() {
  const [xAxis, setXAxis] = useState("gdp")
  const [yAxis, setYAxis] = useState("score")
  const [region, setRegion] = useState("all")

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

  // Prepare data for regional comparison
  const barData = {
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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Globe className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">World Happiness Explorer</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/overview" className="transition-colors hover:text-foreground/80">
                Overview
              </Link>
              <Link href="/dashboard" className="text-foreground transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link href="/predict" className="transition-colors hover:text-foreground/80">
                Predict
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">Interactive Dashboard</h1>
              <p className="text-sm text-muted-foreground">Explore correlations, rankings, and regional comparisons</p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Factor Correlation</CardTitle>
                <CardDescription className="text-xs">
                  Explore the relationship between different factors
                </CardDescription>
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
                <Chart
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
                      },
                    },
                  }}
                  data={scatterData}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Regional Comparison</CardTitle>
                <CardDescription className="text-xs">Average happiness scores by region</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <Chart
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
                      },
                      x: {
                        ticks: {
                          font: {
                            size: 9,
                          },
                        },
                      },
                    },
                  }}
                  data={barData}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Top Country Profile</CardTitle>
                <CardDescription className="text-xs">Breakdown of factors for the happiest country</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <Chart
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
                        },
                        pointLabels: {
                          font: {
                            size: 9,
                          },
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

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Top 5 Happiest Countries</CardTitle>
                <CardDescription className="text-xs">Distribution of happiness scores</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <Chart
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

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Happiness Factors Over Time</CardTitle>
                <CardDescription className="text-xs">How key factors have changed over recent years</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <Chart
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
          </div>
        </div>
      </main>
    </div>
  )
}
