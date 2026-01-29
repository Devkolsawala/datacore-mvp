"use client"

import { useContact } from "@/components/contact-provider"
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { useRef } from "react"

export function CTA() {
  const { openContact } = useContact()
  
  // --- 3D TILT LOGIC ---
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth out the mouse movement
  const xSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 })

  // Calculate rotation based on mouse position
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-12deg", "12deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-zinc-950 perspective-[1000px]">
      
      {/* 1. ATMOSPHERE: Deep Nebula Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 flex justify-center">
        
        {/* 2. 3D TILT CARD WRAPPER */}
        <motion.div 
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="relative w-full max-w-4xl group"
        >
          {/* MOVING BORDER BEAM */}
          <div className="absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-border-flow" />

          {/* MAIN GLASS CARD */}
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900/60 backdrop-blur-xl px-6 py-20 md:px-16 md:py-24 text-center shadow-2xl">
            
            {/* Grid Overlay on Card */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
            
            {/* Content Depth Layer (Pops out slightly in 3D) */}
            <div style={{ transform: "translateZ(50px)" }} className="flex flex-col items-center space-y-8 relative z-10">
              
              {/* Badge */}
              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-md mb-2">
                <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse" />
                Start Building Today
              </div>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl drop-shadow-2xl">
                Ready to engineer your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 animate-gradient-x">
                  digital future?
                </span>
              </h2>
              
              <p className="max-w-[600px] text-zinc-300/80 md:text-xl leading-relaxed">
                Partner with a team that prioritizes scalable architecture, bank-grade security, and measurable business results.
              </p>
              
              <div className="w-full flex justify-center pt-8">
                {/* 3. MAGNETIC SHIMMER BUTTON */}
                <button 
                  onClick={openContact}
                  className="group/btn relative w-full md:w-auto overflow-hidden rounded-full p-[1px] transition-transform active:scale-95"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-10 py-5 text-lg font-medium text-white backdrop-blur-3xl transition-all group-hover/btn:bg-zinc-900">
                    Launch Your Project
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}