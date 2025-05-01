"use client"

import React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
  delayIncrement?: number
  initialDelay?: number
  staggerTime?: number
  once?: boolean
}

export function StaggerChildren({
  children,
  className,
  delayIncrement = 0.1,
  initialDelay = 0,
  staggerTime = 0.1,
  once = true,
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerTime,
            delayChildren: initialDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child

        return (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                  delay: initialDelay + i * delayIncrement,
                },
              },
            }}
          >
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
