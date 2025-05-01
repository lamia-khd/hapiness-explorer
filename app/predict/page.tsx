"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FadeIn } from "@/components/animations/fade-in"
import { AnimatedChart } from "@/components/animations/animated-chart"
import { motion } from "framer-motion"

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
  const [isCalculating, setIsCalculating] = useState(false)

  // Simple ML model simulation
  const makePrediction = () => {
    setIsCalculating(true)

    // Simulate calculation time
    setTimeout(() => {
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
      setIsCalculating(false)
    }, 800)
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
    <div className="container py-6">
      <FadeIn className="space-y-1 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">ML Predictions</h1>
        <p className="text-muted-foreground">Make predictions based on your own input values</p>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-2">
        <FadeIn>
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Input Features</CardTitle>
              <CardDescription>Adjust the values for each feature to make a prediction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
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
              </motion.div>
              <motion.div
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
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
              </motion.div>
              <motion.div
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
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
              </motion.div>
              <motion.div
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
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
              </motion.div>
              <motion.div
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
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
              </motion.div>
              <motion.div
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
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
              </motion.div>
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
              <Button onClick={makePrediction} disabled={isCalculating} className="relative">
                {isCalculating ? (
                  <>
                    <span className="opacity-0">Make Prediction</span>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </motion.div>
                  </>
                ) : (
                  "Make Prediction"
                )}
              </Button>
            </CardFooter>
          </Card>
        </FadeIn>
        <div className="grid gap-6">
          <FadeIn delay={0.1}>
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <CardTitle>Feature Visualization</CardTitle>
                <CardDescription>Visual representation of your input values</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <AnimatedChart
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
          </FadeIn>
          <FadeIn delay={0.2}>
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <CardTitle>Prediction Result</CardTitle>
                <CardDescription>ML model prediction based on your inputs</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4 py-6">
                {prediction !== null ? (
                  <>
                    <motion.div
                      className="text-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="text-4xl font-bold">{prediction}</div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Predicted{" "}
                        {targetVariable === "happiness"
                          ? "Happiness Score"
                          : targetVariable === "freedom"
                            ? "Freedom Score"
                            : "Healthy Life Expectancy Score"}
                      </p>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.1 }}
                    >
                      <div className="text-xl font-medium">{confidence}%</div>
                      <p className="text-sm text-muted-foreground">Confidence Level</p>
                    </motion.div>
                    <motion.div
                      className="text-center text-sm text-muted-foreground max-w-md mt-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
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
                          This prediction suggests a {freedom < 0.3 ? "low" : freedom < 0.5 ? "moderate" : "high"} level
                          of freedom. Freedom to make life choices is strongly correlated with overall happiness.
                        </p>
                      ) : (
                        <p>
                          This prediction suggests a{" "}
                          {health < 0.6 ? "below average" : health < 0.9 ? "average" : "above average"} health score.
                          Health is one of the key contributors to overall happiness.
                        </p>
                      )}
                    </motion.div>
                  </>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Adjust the input values and click "Make Prediction" to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
