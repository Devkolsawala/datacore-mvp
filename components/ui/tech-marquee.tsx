"use client"

import {
  Code2,
  Database,
  Globe,
  Cpu,
  Cloud,
  Smartphone,
  Lock,
  Server,
  Terminal,
  Layers,
  GitBranch,
  Zap,
} from "lucide-react"

const rowOne = [
  { name: "Next.js", icon: Globe, color: "text-white" },
  { name: "React Native", icon: Smartphone, color: "text-blue-400" },
  { name: "Python", icon: Code2, color: "text-yellow-400" },
  { name: "AWS", icon: Cloud, color: "text-orange-400" },
  { name: "PostgreSQL", icon: Database, color: "text-sky-400" },
  { name: "TensorFlow", icon: Cpu, color: "text-emerald-400" },
]

const rowTwo = [
  { name: "Docker", icon: Layers, color: "text-cyan-400" },
  { name: "TypeScript", icon: Terminal, color: "text-blue-300" },
  { name: "Kubernetes", icon: Server, color: "text-violet-400" },
  { name: "Security", icon: Lock, color: "text-red-400" },
  { name: "CI/CD", icon: GitBranch, color: "text-pink-400" },
  { name: "Edge Functions", icon: Zap, color: "text-amber-400" },
]

function MarqueeRow({
  items,
  direction = "left",
}: {
  items: typeof rowOne
  direction?: "left" | "right"
}) {
  const animClass = direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
  // Triplicate for seamless infinite loop on any screen width
  const triplet = [...items, ...items, ...items]

  return (
    <div className="relative flex overflow-x-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />

      <div className={`${animClass} flex shrink-0 gap-10 py-3`}>
        {triplet.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/10 hover:bg-white/[0.05] transition-all cursor-default select-none"
          >
            <tech.icon
              className={`h-4 w-4 ${tech.color} transition-transform duration-300 group-hover:scale-110`}
            />
            <span className="text-sm font-medium text-zinc-400 whitespace-nowrap group-hover:text-zinc-200 transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section className="relative py-12 border-y border-zinc-800/50 bg-zinc-950/50 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-blue-500/[0.03] to-transparent" />

      <div className="container px-4 mx-auto mb-8 text-center">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-[0.25em]">
          Powering scalable products with modern technology
        </p>
      </div>

      <div className="space-y-3">
        <MarqueeRow items={rowOne} direction="left" />
        <MarqueeRow items={rowTwo} direction="right" />
      </div>

      {/* keyframes are injected globally — add these to your globals.css */}
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        .animate-marquee         { animation: marquee 28s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 28s linear infinite; }
      `}</style>
    </section>
  )
}