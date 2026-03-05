"use client"

import React, { useRef, useState, useCallback, MouseEvent } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  /** Blur radius of the spotlight gradient in px. Default 600. */
  spotlightRadius?: number
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.08)",
  spotlightRadius = 600,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const show = useCallback(() => setOpacity(1), [])
  const hide  = useCallback(() => setOpacity(0), [])

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/50",
        className
      )}
      {...props}
    >
      {/* Spotlight gradient layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${spotlightRadius}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Border glow layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: opacity * 0.5,
          background: `radial-gradient(${spotlightRadius * 0.5}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 60%)`,
        }}
      />

      {/* Content — always above glow layers */}
      <div className="relative h-full z-10">{children}</div>
    </div>
  )
}