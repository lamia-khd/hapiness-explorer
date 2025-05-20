"use client"

import { useState } from "react"
import { BarChart3, Globe, LineChart } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerChildren } from "@/components/animations/stagger-children"
import { AnimatedCounter } from "@/components/animations/animated-counter"
import { AnimatedChart } from "@/components/animations/animated-chart"

// Sample data based on World Happiness Index [^1]
const happinessData = [
  { country: "Finland", score: 7.769, gdp: 1.34, social: 1.587, health: 0.986, freedom: 0.596 },
  { country: "Denmark", score: 7.6, gdp: 1.383, social: 1.573, health: 0.996, freedom: 0.592 },
  { country: "Norway", score: 7.554, gdp: 1.488, social: 1.582, health: 1.028, freedom: 0.603 },
  { country: "Iceland", score: 7.494, gdp: 1.38, social: 1.624, health: 1.026, freedom: 0.591 },
  { country: "Netherlands", score: 7.488, gdp: 1.396, social: 1.522, health: 0.999, freedom: 0.557 },
  { country: "Switzerland", score: 7.48, gdp: 1.452, social: 1.526, health: 1.052, freedom: 0.572 },
  { country: "Sweden", score: 7.343, gdp: 1.387, social: 1.487, health: 1.009, freedom: 0.574 },
  { country: "New Zealand", score: 7.307, gdp: 1.303, social: 1.557, health: 1.026, freedom: 0.585 },
  { country: "Canada", score: 7.278, gdp: 1.365, social: 1.505, health: 1.039, freedom: 0.584 },
  { country: "Austria", score: 7.246, gdp: 1.376, social: 1.475, health: 1.016, freedom: 0.532 },
]

// Statistics for the dataset
const statistics = {
  count: 156,
  meanScore: 5.4,
  medianScore: 5.2,
  minScore: 2.9,
  maxScore: 7.8,
  stdDev: 1.1,
}

export default function OverviewPage() {
  const [activeTab, setActiveTab] = useState("statistics")

  return (
    <div className="container py-6">
      <FadeIn className="space-y-1 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Data Overview</h1>
        <p className="text-muted-foreground">Explore descriptive statistics, feature summaries, and country rankings</p>
      </FadeIn>

      <div>
        <Tabs defaultValue="statistics" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="rankings">Country Rankings</TabsTrigger>
            <TabsTrigger value="distributions">Distributions</TabsTrigger>
          </TabsList>
          <TabsContent value="statistics" className="mt-6">
            <StaggerChildren className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Countries</CardTitle>
                  <Globe className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter to={statistics.count} from={0} formatter={(v) => Math.round(v).toString()} />
                  </div>
                  <p className="text-xs text-muted-foreground">Countries in the dataset</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <BarChart3 className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter to={statistics.meanScore} />
                  </div>
                  <p className="text-xs text-muted-foreground">Mean happiness score (0-10 scale)</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
                  <LineChart className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter to={statistics.maxScore} />
                  </div>
                  <p className="text-xs text-muted-foreground">Finland (highest ranked country)</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Standard Deviation</CardTitle>
                  <BarChart3 className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter to={statistics.stdDev} />
                  </div>
                  <p className="text-xs text-muted-foreground">Variation in happiness scores</p>
                </CardContent>
              </Card>
            </StaggerChildren>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <FadeIn delay={0.3}>
                <Card>
                  <CardHeader>
                    <CardTitle>Feature Descriptions</CardTitle>
                    <CardDescription>Key factors that contribute to happiness scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">GDP per Capita</h4>
                        <p className="text-sm text-muted-foreground">
                          Economic output per person, adjusted for purchasing power parity
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Social Support</h4>
                        <p className="text-sm text-muted-foreground">Having someone to count on in times of trouble</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Healthy Life Expectancy</h4>
                        <p className="text-sm text-muted-foreground">Number of years of healthy life expectancy</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Freedom to Make Life Choices</h4>
                        <p className="text-sm text-muted-foreground">
                          Satisfaction with freedom to make life decisions
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Generosity</h4>
                        <p className="text-sm text-muted-foreground">Donation behavior adjusted for GDP per capita</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Perceptions of Corruption</h4>
                        <p className="text-sm text-muted-foreground">Perceived levels of public sector corruption</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Card>
                  <CardHeader>
                    <CardTitle>Feature Importance</CardTitle>
                    <CardDescription>Relative importance of factors in predicting happiness</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <AnimatedChart
                      type="bar"
                      options={{
                        indexAxis: "y",
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          x: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                              display: true,
                              text: "Relative Importance (%)",
                            },
                            grid: {
                              color: "rgba(200, 200, 200, 0.1)",
                            },
                          },
                          y: {
                            title: {
                              display: true,
                              text: "Feature",
                            },
                            grid: {
                              color: "rgba(200, 200, 200, 0.1)",
                            },
                          },
                        },
                      }}
                      data={{
                        labels: [
                          "GDP per Capita",
                          "Social Support",
                          "Healthy Life Expectancy",
                          "Freedom",
                          "Generosity",
                          "Corruption",
                        ],
                        datasets: [
                          {
                            data: [28, 26, 19, 13, 8, 6],
                            backgroundColor: [
                              "rgba(75, 192, 192, 0.6)",
                              "rgba(54, 162, 235, 0.6)",
                              "rgba(153, 102, 255, 0.6)",
                              "rgba(255, 159, 64, 0.6)",
                              "rgba(255, 99, 132, 0.6)",
                              "rgba(201, 203, 207, 0.6)",
                            ],
                            borderColor: [
                              "rgb(75, 192, 192)",
                              "rgb(54, 162, 235)",
                              "rgb(153, 102, 255)",
                              "rgb(255, 159, 64)",
                              "rgb(255, 99, 132)",
                              "rgb(201, 203, 207)",
                            ],
                            borderWidth: 1,
                          },
                        ],
                      }}
                    />
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </TabsContent>
          <TabsContent value="rankings" className="mt-6">
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>Top 10 Happiest Countries</CardTitle>
                  <CardDescription>
                    Countries with the highest happiness scores and their contributing factors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>Data from the World Happiness Report</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Happiness Score</TableHead>
                        <TableHead className="hidden md:table-cell">GDP per Capita</TableHead>
                        <TableHead className="hidden md:table-cell">Social Support</TableHead>
                        <TableHead className="hidden md:table-cell">Health</TableHead>
                        <TableHead className="hidden md:table-cell">Freedom</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {happinessData.map((country, index) => (
                        <TableRow key={country.country} className="transition-colors hover:bg-muted/50">
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{country.country}</TableCell>
                          <TableCell>{country.score.toFixed(2)}</TableCell>
                          <TableCell className="hidden md:table-cell">{country.gdp.toFixed(2)}</TableCell>
                          <TableCell className="hidden md:table-cell">{country.social.toFixed(2)}</TableCell>
                          <TableCell className="hidden md:table-cell">{country.health.toFixed(2)}</TableCell>
                          <TableCell className="hidden md:table-cell">{country.freedom.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </FadeIn>
          </TabsContent>
          <TabsContent value="distributions" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FadeIn>
                <Card>
                  <CardHeader>
                    <CardTitle>Happiness Score Distribution</CardTitle>
                    <CardDescription>Distribution of happiness scores across all countries</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <AnimatedChart
                      type="bar"
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          x: {
                            title: {
                              display: true,
                              text: "Happiness Score Range",
                            },
                            grid: {
                              color: "rgba(200, 200, 200, 0.1)",
                            },
                          },
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: "Number of Countries",
                            },
                            grid: {
                              color: "rgba(200, 200, 200, 0.1)",
                            },
                          },
                        },
                      }}
                      data={{
                        labels: [
                          "2.5-3.0",
                          "3.0-3.5",
                          "3.5-4.0",
                          "4.0-4.5",
                          "4.5-5.0",
                          "5.0-5.5",
                          "5.5-6.0",
                          "6.0-6.5",
                          "6.5-7.0",
                          "7.0-7.5",
                          "7.5-8.0",
                        ],
                        datasets: [
                          {
                            label: "Countries",
                            data: [3, 8, 12, 18, 25, 30, 22, 16, 12, 8, 2],
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgb(75, 192, 192)",
                            borderWidth: 1,
                          },
                        ],
                      }}
                    />
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle>GDP per Capita Distribution</CardTitle>
                    <CardDescription>Distribution of GDP per capita across all countries</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <AnimatedChart
                      type="bar"
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          x: {
                            title: {
                              display: true,
                              text: "GDP per Capita (normalized)",
                            },
                            grid: {
                              color: "rgba(200, 200, 200, 0.1)",
                            },
                          },
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: "Number of Countries",
                            },
                            grid: {
                              color: "rgba(200, 200, 200, 0.1)",
                            },
                          },
                        },
                      }}
                      data={{
                        labels: [
                          "0.0-0.2",
                          "0.2-0.4",
                          "0.4-0.6",
                          "0.6-0.8",
                          "0.8-1.0",
                          "1.0-1.2",
                          "1.2-1.4",
                          "1.4-1.6",
                        ],
                        datasets: [
                          {
                            label: "Countries",
                            data: [22, 35, 30, 25, 20, 15, 8, 1],
                            backgroundColor: "rgba(54, 162, 235, 0.6)",
                            borderColor: "rgb(54, 162, 235)",
                            borderWidth: 1,
                          },
                        ],
                      }}
                    />
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
