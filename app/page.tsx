import Link from "next/link"
import { ArrowRight, BarChart3, Globe, LineChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerChildren } from "@/components/animations/stagger-children"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <FadeIn>
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                Explore Global Happiness Data
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Discover trends, visualize correlations, and predict happiness scores using machine learning
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="transition-transform hover:scale-105">
                  <Link href="/overview">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="transition-transform hover:scale-105">
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <FadeIn>
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Our application provides comprehensive tools to understand the factors that contribute to happiness
                around the world
              </p>
            </FadeIn>
          </div>
          <StaggerChildren className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary" />
                <CardTitle>Data Overview</CardTitle>
                <CardDescription>
                  Explore descriptive statistics, feature summaries, and country rankings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Visualize distributions and class breakdowns for key happiness indicators across different countries.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full group">
                  <Link href="/overview" className="flex items-center justify-center">
                    View Overview
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <LineChart className="h-10 w-10 text-primary" />
                <CardTitle>Interactive Dashboard</CardTitle>
                <CardDescription>Visualize correlations, rankings, and regional comparisons</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Interact with animated charts showing relationships between GDP, social support, and happiness scores.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full group">
                  <Link href="/dashboard" className="flex items-center justify-center">
                    Explore Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <Globe className="h-10 w-10 text-primary" />
                <CardTitle>ML Predictions</CardTitle>
                <CardDescription>Make predictions based on your own input values</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Use our trained machine learning model to predict happiness scores or other target variables.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full group">
                  <Link href="/predict" className="flex items-center justify-center">
                    Try Predictions
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </StaggerChildren>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js, Tailwind CSS, and shadcn/ui. Data from the World Happiness Report.
          </p>
        </div>
      </footer>
    </div>
  )
}
