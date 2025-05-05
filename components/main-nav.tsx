"use client"

import Link from "next/link"
import { Globe } from "lucide-react"
import { usePathname } from "next/navigation"

export function MainNav() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Globe className="h-6 w-6 text-primary" />
        <span className="hidden font-bold sm:inline-block">World Happiness Explorer</span>
      </Link>
      {!isHomePage && (
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/overview"
            className={pathname === "/overview" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
          >
            Overview
          </Link>
          <Link
            href="/dashboard"
            className={pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
          >
            Dashboard
          </Link>
          <Link
            href="/predict"
            className={pathname === "/predict" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
          >
            Predict
          </Link>
        </nav>
      )}
    </div>
  )
}
