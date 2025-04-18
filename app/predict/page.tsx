"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart } from "@/components/ui/chart"

export default function PredictPage() {
  const [targetVariable, setTargetVariable] = useState("happiness")
  const [gdp, setGdp] = useState(1.0)
  const [social, setSocial] = useState(1.2)
  const [health, setHealth] = useState(0.8)
  const [freedom, setFreedom] = useState(0.5)
  const [generosity, setGenerosity] = useState(0.2)
  const [corruption, setCorruption] = useState(0.3)
  const [prediction, setPrediction] = useState<number | null>(null)
  const [confidence, setConfidence] = useState<number | null>(null)

  // Simple ML model simulation
  const makePrediction = () => {
    let result = 0
    let conf = 0

    if (targetVariable === "happiness") {
      // Simple weighted sum for happiness score prediction
      result =
        (gdp * 0.28 + social * 0.26 + health * 0.19 + freedom * 0.13 + generosity * 0.08 + corruption * 0.06) * 3.5 +
        3.5 // Scale to typical range
      conf = 0.85
    } else if (targetVariable === "freedom") {
      // Simple model for freedom prediction
      result = (gdp * 0.15 + social * 0.25 + health * 0.1 + generosity * 0.1 + corruption * 0.4) * 0.6
      conf = 0.72
    } else if (targetVariable === "health") {
      // Simple model for health prediction
      result = (gdp * 0.4 + social * 0.3 + freedom * 0.1 + generosity * 0.05 + corruption * 0.15) * 1.1
      conf = 0.78
    }

    setPrediction(Number.parseFloat(result.toFixed(2)))
    setConfidence(Number.parseFloat((conf * 100).toFixed(1)))
  }

  // Reset form
  const resetForm = () => {
    setGdp(1.0)
    setSocial(1.2)
    setHealth(0.8)
    setFreedom(0.5)
    setGenerosity(0.2)
    setCorruption(0.3)
    setPrediction(null)
    setConfidence(null)
  }

  // Prepare data for radar chart
  const radarData = {
    labels: ["GDP", "Social Support", "Health", "Freedom", "Generosity", "Low Corruption"],
    datasets: [
      {
        label: "Your Input",
        data: [
          (gdp / 1.6) * 10,
          (social / 1.7) * 10,
          (health / 1.1) * 10,
          (freedom / 0.6) * 10,
          (generosity / 0.4) * 10,
          (corruption / 0.4) * 10,
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
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link href="/predict" className="text-foreground transition-colors hover:text-foreground/80">
                Predict
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 md:py-10">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">ML Predictions</h1>
              <p className="text-muted-foreground">Make predictions based on your own input values</p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Input Features</CardTitle>
                <CardDescription>Adjust the values for each feature to make a prediction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="gdp">GDP per Capita</Label>
                    <span className="text-sm text-muted-foreground">{gdp.toFixed(2)}</span>
                  </div>
                  <Slider
                    id="gdp"
                    min={0}
                    max={2}
                    step={0.01}
                    value={[gdp]}
                    onValueChange={(value) => setGdp(value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Range: 0.0 - 2.0 (normalized)</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="social">Social Support</Label>
                    <span className="text-sm text-muted-foreground">{social.toFixed(2)}</span>
                  </div>
                  <Slider
                    id="social"
                    min={0}
                    max={2}
                    step={0.01}
                    value={[social]}
                    onValueChange={(value) => setSocial(value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Range: 0.0 - 2.0 (normalized)</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="health">Healthy Life Expectancy</Label>
                    <span className="text-sm text-muted-foreground">{health.toFixed(2)}</span>
                  </div>
                  <Slider
                    id="health"
                    min={0}
                    max={1.5}
                    step={0.01}
                    value={[health]}
                    onValueChange={(value) => setHealth(value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Range: 0.0 - 1.5 (normalized)</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="freedom">Freedom</Label>
                    <span className="text-sm text-muted-foreground">{freedom.toFixed(2)}</span>
                  </div>
                  <Slider
                    id="freedom"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[freedom]}
                    onValueChange={(value) => setFreedom(value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Range: 0.0 - 1.0 (normalized)</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="generosity">Generosity</Label>
                    <span className="text-sm text-muted-foreground">{generosity.toFixed(2)}</span>
                  </div>
                  <Slider
                    id="generosity"
                    min={0}
                    max={0.8}
                    step={0.01}
                    value={[generosity]}
                    onValueChange={(value) => setGenerosity(value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Range: 0.0 - 0.8 (normalized)</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="corruption">Low Corruption</Label>
                    <span className="text-sm text-muted-foreground">{corruption.toFixed(2)}</span>
                  </div>
                  <Slider
                    id="corruption"
                    min={0}
                    max={0.8}
                    step={0.01}
                    value={[corruption]}
                    onValueChange={(value) => setCorruption(value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Range: 0.0 - 0.8 (normalized)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target">Target Variable to Predict</Label>
                  <Select value={targetVariable} onValueChange={setTargetVariable}>
                    <SelectTrigger id="target">
                      <SelectValue placeholder="Select target variable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="happiness">Happiness Score</SelectItem>
                      <SelectItem value="freedom">Freedom</SelectItem>
                      <SelectItem value="health">Healthy Life Expectancy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetForm}>
                  Reset
                </Button>
                <Button onClick={makePrediction}>Make Prediction</Button>
              </CardFooter>
            </Card>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Visualization</CardTitle>
                  <CardDescription>Visual representation of your input values</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <Chart
                    type="radar"
                    options={{
                      scales: {
                        r: {
                          min: 0,
                          max: 10,
                          ticks: {
                            stepSize: 2,
                          },
                        },
                      },
                    }}
                    data={radarData}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Prediction Result</CardTitle>
                  <CardDescription>ML model prediction based on your inputs</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4 py-6">
                  {prediction !== null ? (
                    <>
                      <div className="text-center">
                        <div className="text-4xl font-bold">{prediction}</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Predicted{" "}
                          {targetVariable === "happiness"
                            ? "Happiness Score"
                            : targetVariable === "freedom"
                              ? "Freedom Score"
                              : "Healthy Life Expectancy Score"}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-medium">{confidence}%</div>
                        <p className="text-sm text-muted-foreground">Confidence Level</p>
                      </div>
                      <div className="text-center text-sm text-muted-foreground max-w-md mt-4">
                        {targetVariable === "happiness" ? (
                          <p>
                            This prediction suggests a{" "}
                            {prediction < 5.5
                              ? "below average"
                              : prediction < 6.5
                                ? "average"
                                : prediction < 7.5
                                  ? "above average"
                                  : "very high"}{" "}
                            happiness level.
                            {prediction > 7.0
                              ? " Countries with similar scores include those in Northern Europe."
                              : prediction > 6.0
                                ? " Countries with similar scores include many Western nations."
                                : prediction > 5.0
                                  ? " Countries with similar scores include many middle-income nations."
                                  : " Countries with similar scores include many developing nations."}
                          </p>
                        ) : targetVariable === "freedom" ? (
                          <p>
                            This prediction suggests a {freedom < 0.3 ? "low" : freedom < 0.5 ? "moderate" : "high"}{" "}
                            level of freedom. Freedom to make life choices is strongly correlated with overall
                            happiness.
                          </p>
                        ) : (
                          <p>
                            This prediction suggests a{" "}
                            {health < 0.6 ? "below average" : health < 0.9 ? "average" : "above average"} health score.
                            Health is one of the key contributors to overall happiness.
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <p>Adjust the input values and click "Make Prediction" to see results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
