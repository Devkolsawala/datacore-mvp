"use client"

import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Smartphone, Globe, BarChart3, ArrowRight, BrainCircuit, Sparkles } from "lucide-react"
import { motion, Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function Services() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-32 bg-zinc-950 relative overflow-hidden">
      
      {/* 1. MODERN TEXTURE: Subtle noise overlay for depth */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>
      
      {/* 2. ATMOSPHERE: Deeper, more complex glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-20"
        >
          <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm font-medium text-blue-400 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 mr-2 text-blue-400" />
            Core Capabilities
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl">
            Engineering for the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">next generation.</span>
          </h2>
          <p className="max-w-[700px] text-zinc-400 md:text-xl leading-relaxed">
            We build the mission-critical infrastructure that powers scalable businesses.
          </p>
        </motion.div>
        
        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[320px]"
        >
          
          {/* CARD 1: AI (Featured) */}
          <motion.div variants={cardVariants} className="md:col-span-2 h-full">
            <SpotlightCard 
              className="group cursor-pointer bg-zinc-900/40 border-zinc-800/60 h-full overflow-hidden"
              onClick={scrollToContact}
              spotlightColor="rgba(59, 130, 246, 0.2)"
            >
              {/* Internal Gradient for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative h-full flex flex-col justify-between p-8 z-10">
                <div className="flex items-start justify-between">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 shadow-inner group-hover:shadow-blue-500/20 group-hover:border-blue-500/30 transition-all duration-500">
                    <BrainCircuit className="h-7 w-7 text-zinc-300 group-hover:text-blue-400" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    Flagship
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    AI & Automation
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-base max-w-md">
                    Deploy custom agents and RAG chatbots. We automate complex workflows with precision.
                  </p>
                </div>

                <div className="flex items-center text-sm font-medium text-white/50 group-hover:text-blue-400 transition-colors mt-6">
                  View Solutions <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* CARD 2: Data */}
          <motion.div variants={cardVariants} className="h-full">
            <SpotlightCard 
              className="group cursor-pointer bg-zinc-900/40 border-zinc-800/60 h-full"
              onClick={scrollToContact}
              spotlightColor="rgba(168, 85, 247, 0.2)"
            >
              <div className="relative h-full flex flex-col justify-between p-8">
                <div className="p-3.5 w-fit rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 shadow-inner group-hover:border-purple-500/30 transition-all duration-500">
                  <BarChart3 className="h-6 w-6 text-zinc-300 group-hover:text-purple-400" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">Analytics</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Turn raw data into strategic assets with real-time visualization pipelines.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* CARD 3: Mobile */}
          <motion.div variants={cardVariants} className="h-full">
            <SpotlightCard 
              className="group cursor-pointer bg-zinc-900/40 border-zinc-800/60 h-full"
              onClick={scrollToContact}
              spotlightColor="rgba(16, 185, 129, 0.2)"
            >
              <div className="relative h-full flex flex-col justify-between p-8">
                 <div className="p-3.5 w-fit rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 shadow-inner group-hover:border-emerald-500/30 transition-all duration-500">
                  <Smartphone className="h-6 w-6 text-zinc-300 group-hover:text-emerald-400" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">Mobile Apps</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    High-performance React Native & Flutter apps built for scale.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

           {/* CARD 4: Web (Featured) */}
           <motion.div variants={cardVariants} className="md:col-span-2 h-full">
            <SpotlightCard 
              className="group cursor-pointer bg-zinc-900/40 border-zinc-800/60 h-full"
              onClick={scrollToContact}
              spotlightColor="rgba(249, 115, 22, 0.2)"
            >
              <div className="relative h-full flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-8">
                <div className="flex flex-col justify-between h-full">
                   <div className="p-3.5 w-fit rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 shadow-inner group-hover:border-orange-500/30 transition-all duration-500 mb-4 sm:mb-0">
                    <Globe className="h-6 w-6 text-zinc-300 group-hover:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">Web Platforms</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                       Next.js enterprise architecture. SEO-optimized, secure, and ready for millions of users.
                    </p>
                  </div>
                </div>
                
                {/* Modern Code Block Decoration */}
                <div className="hidden sm:block p-5 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-zinc-500 w-72 backdrop-blur-sm shadow-2xl">
                  <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                  </div>
                  <div className="space-y-1">
                    <p><span className="text-purple-400">export</span> <span className="text-blue-400">async</span> <span className="text-yellow-300">function</span> <span className="text-blue-300">Scale</span>() {"{"}</p>
                    <p className="pl-4 text-zinc-400">// Deploying infrastructure...</p>
                    <p className="pl-4"><span className="text-blue-400">await</span> <span className="text-green-400">System</span>.init();</p>
                    <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-orange-400">"Ready"</span>;</p>
                    <p>{"}"}</p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}