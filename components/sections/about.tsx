"use client"

import { Database, TrendingUp, ShieldCheck, Zap, Server, BrainCircuit } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background elements for depth */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[500px] w-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          
          {/* Left Column: The Narrative */}
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
              The DataCore Difference
            </div>
            
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl leading-tight">
              We Don't Just Write Code. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">We Decode Your Business.</span>
            </h2>
            
            <div className="space-y-4 text-zinc-400 md:text-lg">
              <p>
                Most agencies build empty shells—apps that look good but lack intelligence. We started <strong>3+ years ago</strong> with a different premise: <span className="text-zinc-200 font-medium">Software is useless if it doesn't make you smarter.</span>
              </p>
              <p>
                We are data engineers first. While others are figuring out how to connect an API, we are architecting custom ETL pipelines, training predictive models, and turning your historical noise into clear, actionable signals.
              </p>
            </div>
            
            <div className="grid gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded bg-blue-500/10">
                  <Database className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Heavy-Lifting Data Engineering</h3>
                  <p className="text-sm text-zinc-500">We process terabytes, not just megabytes. Scalable warehouses (Snowflake/BigQuery) are our playground.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded bg-purple-500/10">
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Predictive, Not Just Descriptive</h3>
                  <p className="text-sm text-zinc-500">Dashboards show you what happened. Our algorithms tell you what <em>will</em> happen.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The "Real" Proof */}
          <div className="relative">
            {/* Grid of Stats */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Stat Card 1 */}
              <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm hover:border-zinc-700 transition-colors">
                <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">3+</div>
                <div className="text-sm font-medium text-zinc-500">Years of Innovation</div>
              </div>

              {/* Stat Card 2 */}
              <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm hover:border-zinc-700 transition-colors">
                <div className="h-10 w-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Server className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">50+</div>
                <div className="text-sm font-medium text-zinc-500">Enterprise Pipelines</div>
              </div>

              {/* Stat Card 3 (Full Width - The "Brag") */}
              <div className="col-span-2 p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 relative group">
                <div className="absolute top-4 right-4 text-zinc-700 group-hover:text-zinc-600 transition-colors">
                  <BrainCircuit className="h-8 w-8" />
                </div>
                <div className="space-y-2 relative z-10">
                  <div className="text-emerald-500 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Outcome
                  </div>
                  <p className="text-lg font-medium text-zinc-200 leading-relaxed">
                    "Other agencies gave us a spreadsheet. DataCore built a live prediction engine that saved us <strong>$1.2M in inventory waste</strong> within the first quarter."
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">CTO</div>
                    <div className="text-sm text-zinc-500">Logistics Unicorn, India</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}