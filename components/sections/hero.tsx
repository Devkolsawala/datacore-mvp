"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Terminal } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden py-20 md:py-24">
      
      {/* DEBUG LAYER: 
         1. opacity-100 (Full visibility)
         2. Removed all fancy z-indexes, relying on DOM order
         3. Removed the "bg-zinc-950" from overlays
      */}
      <div className="absolute inset-0 h-full w-full z-0">
        <Image 
          src="/bg.png" 
          alt="Hero Background" 
          fill
          priority
          className="object-cover" 
          quality={75}
        />
      </div>

      {/* Lighter Gradient Only (No solid background color) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>

      {/* Grid Pattern (Made lighter) */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* CONTENT (z-10 puts it above the image) */}
      <div className="relative z-10 container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-8 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-400 backdrop-blur-xl"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            System Operational
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
          >
            Engineering the Future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Data & Intelligence
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            We build scalable analytics infrastructure and high-performance applications for forward-thinking enterprises.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-4 min-[400px]:flex-row"
          >
            <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-zinc-200" onClick={() => scrollToId('contact')}>
              Start Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base border-zinc-800 bg-black/40 backdrop-blur-sm text-zinc-300 hover:bg-zinc-900 hover:text-white" onClick={() => scrollToId('services')}>
              <Terminal className="mr-2 h-4 w-4" /> View Stack
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}