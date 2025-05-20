"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarNav } from "@/components/sidebar-nav"
import { ThemeToggle } from "@/components/theme-toggle"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Check if we're on the homepage
  const isHomePage = pathname === "/" && isMounted

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-primary" />
              <span className="font-bold">World Happiness Explorer</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild>
              <Link href={isHomePage ? "/predict" : "/predict"}>Try Prediction</Link>
            </Button>
          </div>
        </div>
      </header>

      {!isHomePage ? (
        <div className="flex-1 flex">
          <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40 px-4 py-6">
            <SidebarNav className="mt-6" />
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      ) : (
        <main className="flex-1">{children}</main>
      )}
    </div>
  )
}
