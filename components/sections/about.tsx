"use client"

import { Database, TrendingUp, ShieldCheck, Zap, Server, BrainCircuit, Code2 } from "lucide-react"
import { motion } from "framer-motion"

export function About() {
  return (
    <section id="about" className="py-32 bg-zinc-950 relative overflow-hidden">
      
      {/* 1. ATMOSPHERE: Noise Texture & Ambient Glows */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -translate-x-1/3 w-[500px] h-[500px] bg-emerald-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid gap-20 lg:grid-cols-2 items-center">
          
          {/* LEFT COLUMN: Narrative & Story */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-1.5 text-sm font-medium text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)] backdrop-blur-md">
              <Code2 className="w-4 h-4 mr-2 text-blue-400" />
              The DataCore Difference
            </div>
            
            {/* Headline */}
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              We Don't Just Write Code. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                We Decode Your Business.
              </span>
            </h2>
            
            {/* Text Blocks */}
            <div className="space-y-6 text-zinc-400 md:text-lg leading-relaxed">
              <p>
                Most agencies build empty shells—apps that look good but lack intelligence. We started <span className="text-white font-semibold">3+ years ago</span> with a different premise:
              </p>
              <blockquote className="border-l-2 border-blue-500/50 pl-6 italic text-zinc-300">
                "Software is useless if it doesn't make you smarter."
              </blockquote>
              <p>
                We are data engineers first. While others figure out how to connect an API, we architect custom ETL pipelines, train predictive models, and turn your historical noise into clear, actionable signals.
              </p>
            </div>
            
            {/* Interactive Feature Rows */}
            <div className="grid gap-4 pt-4">
              <FeatureRow 
                icon={Database} 
                title="Heavy-Lifting Data Engineering" 
                desc="We process terabytes, not just megabytes. Scalable warehouses (Snowflake/BigQuery) are our playground."
                color="text-blue-400"
                bg="bg-blue-500/10"
              />
              <FeatureRow 
                icon={TrendingUp} 
                title="Predictive, Not Just Descriptive" 
                desc="Dashboards show you what happened. Our algorithms tell you what will happen."
                color="text-emerald-400"
                bg="bg-emerald-500/10"
              />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Stats Grid & Social Proof */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-5">
              
              {/* Stat Card 1 */}
              <StatCard 
                icon={Zap} 
                value="3+" 
                label="Years of Innovation" 
                delay={0.1} 
                color="text-yellow-400"
                bg="bg-yellow-500/10"
              />
              
              {/* Stat Card 2 */}
              <StatCard 
                icon={Server} 
                value="50+" 
                label="Enterprise Pipelines" 
                delay={0.2} 
                color="text-purple-400"
                bg="bg-purple-500/10"
              />

              {/* The "Brag" Card (Full Width) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="col-span-2 p-8 rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-zinc-800 relative group overflow-hidden shadow-2xl"
              >
                {/* Subtle Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none transition-opacity group-hover:opacity-100" />
                
                {/* Background Icon Watermark */}
                <div className="absolute top-6 right-6 text-zinc-800/50 group-hover:text-emerald-500/10 transition-colors duration-500">
                  <BrainCircuit className="h-20 w-20" />
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified Outcome
                  </div>
                  
                  <p className="text-xl font-medium text-zinc-200 leading-relaxed">
                    "Other agencies gave us a spreadsheet. DataCore built a live prediction engine that saved us <span className="text-emerald-400 font-bold border-b border-emerald-500/30">$1.2M in inventory waste</span> within the first quarter."
                  </p>
                  
                  <div className="pt-2 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 border border-zinc-700">CTO</div>
                    <div>
                      <div className="text-sm font-semibold text-white">Logistics Unicorn</div>
                      <div className="text-xs text-zinc-500">Bangalore, India</div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// --- HELPER COMPONENTS ---

function FeatureRow({ icon: Icon, title, desc, color, bg }: any) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300 border border-transparent hover:border-white/5 cursor-default">
      <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg} border border-white/5`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <div>
        <h3 className="font-semibold text-white text-lg mb-1">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, value, label, delay, color, bg }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800/60 backdrop-blur-sm hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-300 group cursor-default"
    >
      <div className={`h-12 w-12 ${bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div className="text-4xl font-bold text-white mb-1 tracking-tight">{value}</div>
      <div className="text-sm font-medium text-zinc-500 group-hover:text-zinc-400 transition-colors">{label}</div>
    </motion.div>
  )
}