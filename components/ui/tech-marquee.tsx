"use client"

import { 
  Code2, Database, Globe, Cpu, Cloud, Smartphone, 
  Lock, Server, Terminal, Layers 
} from "lucide-react"

const techs = [
  { name: "Next.js", icon: Globe },
  { name: "React Native", icon: Smartphone },
  { name: "Python", icon: Code2 },
  { name: "AWS", icon: Cloud },
  { name: "PostgreSQL", icon: Database },
  { name: "TensorFlow", icon: Cpu },
  { name: "Docker", icon: Layers },
  { name: "TypeScript", icon: Terminal },
  { name: "Kubernetes", icon: Server },
  { name: "Security", icon: Lock },
]

export function TechMarquee() {
  return (
    <section className="py-10 border-y border-zinc-800 bg-zinc-950/50 overflow-hidden">
      <div className="container px-4 mx-auto mb-6 text-center">
        <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
          Powering scalable products with modern tech
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        {/* Gradient Masks to fade edges */}
        <div className="absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-zinc-950 to-transparent"></div>
        <div className="absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-zinc-950 to-transparent"></div>

        {/* The Scrolling Track (Duplicate content for seamless loop) */}
        <div className="animate-marquee flex gap-12 whitespace-nowrap py-4">
          {/* First Set */}
          {techs.map((tech, index) => (
            <div key={index} className="flex items-center gap-2 text-zinc-400">
              <tech.icon className="h-6 w-6 text-zinc-500" />
              <span className="text-lg font-semibold">{tech.name}</span>
            </div>
          ))}
          {/* Second Set (Duplicate) */}
          {techs.map((tech, index) => (
            <div key={`duplicate-${index}`} className="flex items-center gap-2 text-zinc-400">
              <tech.icon className="h-6 w-6 text-zinc-500" />
              <span className="text-lg font-semibold">{tech.name}</span>
            </div>
          ))}
           {/* Third Set (Extra Safety for wide screens) */}
           {techs.map((tech, index) => (
            <div key={`duplicate-2-${index}`} className="flex items-center gap-2 text-zinc-400">
              <tech.icon className="h-6 w-6 text-zinc-500" />
              <span className="text-lg font-semibold">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}