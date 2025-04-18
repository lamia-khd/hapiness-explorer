import Link from "next/link"
import { ArrowRight, BarChart3, Globe, LineChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
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
              <Link href="/predict" className="transition-colors hover:text-foreground/80">
                Predict
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button asChild className="ml-auto hidden md:flex">
                <Link href="/predict">Try Prediction</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">Explore Global Happiness Data</h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Discover trends, visualize correlations, and predict happiness scores using machine learning
            </p>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/overview">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Our application provides comprehensive tools to understand the factors that contribute to happiness around
              the world
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card>
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
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/overview" className="flex items-center justify-center">
                    View Overview
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
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
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/dashboard" className="flex items-center justify-center">
                    Explore Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="h-10 w-10 text-primary" />
                <CardTitle>ML Predictions</CardTitle>
                <CardDescription>Make predictions based on your own input values</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Use our trained machine learning model to predict happiness scores or other target variables.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/predict" className="flex items-center justify-center">
                    Try Predictions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
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
