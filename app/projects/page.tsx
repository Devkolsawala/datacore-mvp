"use client"

// 1. FIXED: Relative imports to prevent "Module not found" errors
import { Navbar } from "../../components/navbar"
import { Footer } from "../../components/sections/footer" 
import { SpotlightCard } from "../../components/ui/spotlight-card"
import { ExternalLink, Smartphone, BrainCircuit, Film, UtensilsCrossed, Sparkles, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { motion, Variants } from "framer-motion" // <--- IMPORT 'Variants'

// Projects Data
const projects = [
  {
    title: "Naradmuni",
    subtitle: "AI Spiritual Companion",
    description: "An AI-powered wise companion for life's journey. It fuses ancient wisdom with modern LLMs to offer guidance on relationships, career, and inner peace.",
    link: "https://naradmuni.vercel.app/",
    icon: BrainCircuit,
    color: "from-orange-500/20 to-amber-500/20 text-orange-400 border-orange-500/30",
    glow: "rgba(249, 115, 22, 0.2)",
    status: "Flagship",
    tech: ["OpenAI", "Next.js", "Vector DB"],
    featured: true 
  },
  {
    title: "Culinary AI",
    subtitle: "Personalized Dish Recommender",
    description: "A smart culinary engine that maps flavor profiles. Suggests dishes based on dietary constraints and preferences.",
    link: "https://aidishrecommendation-2kfirwo46-dev090502s-projects.vercel.app/", 
    icon: UtensilsCrossed,
    color: "from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30",
    glow: "rgba(34, 197, 94, 0.2)",
    status: "Live",
    tech: ["ML", "Data Science", "Python"],
    featured: false
  },
  {
    title: "CineMatch AI",
    subtitle: "Semantic Recommendation Engine",
    description: "Moving beyond basic filtering. Uses deep semantic understanding to find movies that match the *feel* of what you love.",
    link: "https://movierecommender-olddmm7qovbgmhpajusjmp.streamlit.app/",
    icon: Film,
    color: "from-red-500/20 to-pink-500/20 text-red-400 border-red-500/30",
    glow: "rgba(239, 68, 68, 0.2)",
    status: "Live",
    tech: ["Python", "Streamlit", "TensorFlow"],
    featured: false
  },
  
  {
    title: "Smart Calc",
    subtitle: "Native Android Utility",
    description: "A highly optimized calculator built for the Android ecosystem. Features memory-efficient architecture.",
    link: "https://play.google.com/store/games?device=phone&hl=en_IN",
    icon: Smartphone,
    color: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30",
    glow: "rgba(59, 130, 246, 0.2)",
    status: "Beta",
    tech: ["Kotlin", "Android SDK", "Material 3"],
    featured: false
  }
]

// --- FIX START: Explicitly typed Variants ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

// --- FIX END ---

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 selection:bg-purple-500/30">
      <Navbar />
      
      {/* 1. ATMOSPHERE */}
      <div className="fixed inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="pt-32 pb-24 container px-4 md:px-6 mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-24 space-y-6"
        >
           <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/5 px-4 py-1.5 text-sm font-medium text-purple-300 shadow-[0_0_20px_-10px_rgba(168,85,247,0.5)] backdrop-blur-md">
            <Sparkles className="w-4 h-4 mr-2" />
            Innovation Lab
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Work.</span>
          </h1>
          <p className="max-w-[600px] text-zinc-400 md:text-xl leading-relaxed">
            Experiments, prototypes, and production systems.
          </p>
        </motion.div>

        {/* 2. BENTO GRID LAYOUT */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className={`relative ${project.featured ? "md:col-span-3" : "md:col-span-1"}`}
            >
              {/* 3. HOVER EFFECT WRAPPER */}
              <motion.div
                whileHover={{ y: -8, scale: 1.01 }} // The "Pop" effect
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <SpotlightCard 
                  className="group h-full flex flex-col bg-zinc-900/40 border-zinc-800/60 overflow-hidden relative rounded-3xl"
                  spotlightColor={project.glow}
                >
                  {/* Internal Glow Gradient */}
                  <div className={`absolute top-0 right-0 p-20 opacity-0 group-hover:opacity-20 transition-opacity duration-700`}>
                     <div className={`w-40 h-40 rounded-full blur-3xl bg-gradient-to-br ${project.color}`} />
                  </div>

                  <div className={`p-8 flex flex-col h-full relative z-10 ${project.featured ? "md:flex-row md:items-center md:gap-12" : ""}`}>
                    
                    {/* ICON / VISUAL */}
                    <div className="mb-6 md:mb-0">
                      <div className={`p-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} border border-white/5 shadow-inner flex items-center justify-center`}>
                        <project.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    {/* TEXT CONTENT */}
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors">
                          {project.title}
                        </h3>
                        {/* Status Pill */}
                        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                            project.status === "Live" || project.status === "Flagship"
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" 
                              : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
                          }`}>
                           {project.status === "Flagship" ? "Featured" : project.status}
                        </div>
                      </div>
                      
                      <p className="text-xs font-semibold text-zinc-500 mb-3 uppercase tracking-widest">
                        {project.subtitle}
                      </p>
                      
                      <p className="text-zinc-400 leading-relaxed mb-6 text-sm max-w-lg">
                        {project.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[11px] text-zinc-400 font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 4. MODERN BUTTON (Shimmer Effect) */}
                    <div className={`${project.featured ? "md:min-w-[200px]" : "mt-auto pt-6 border-t border-white/5"}`}>
                      <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                        <button className="group/btn relative w-full overflow-hidden rounded-xl bg-white p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-medium text-white backdrop-blur-3xl transition-colors hover:bg-zinc-900">
                             {project.status === "Beta" ? "View Progress" : "Launch Project"}
                             <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                          </span>
                        </button>
                      </Link>
                    </div>

                  </div>
                </SpotlightCard>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <Footer /> 
    </main>
  )
}