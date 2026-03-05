"use client"

import { Footer } from "@/components/sections/footer"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import {
  Smartphone,
  BrainCircuit,
  Film,
  UtensilsCrossed,
  Sparkles,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"

// ── Types ──────────────────────────────────────────────────────────────────

interface Project {
  title: string
  subtitle: string
  description: string
  link: string
  icon: React.ElementType
  gradient: string
  glow: string
  border: string
  status: "Flagship" | "Live" | "Beta"
  tech: string[]
  featured?: boolean
}

// ── Data ───────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    title: "Naradmuni",
    subtitle: "AI Spiritual Companion",
    description:
      "An AI-powered wise companion for life's journey. Fuses ancient wisdom with modern LLMs to offer guidance on relationships, career, and inner peace.",
    link: "https://naradmuni.vercel.app/",
    icon: BrainCircuit,
    gradient: "from-orange-500/20 to-amber-500/10",
    glow: "rgba(249,115,22,0.15)",
    border: "group-hover:border-orange-500/30",
    status: "Flagship",
    tech: ["OpenAI", "Next.js", "Vector DB"],
    featured: true,
  },
  {
    title: "Culinary AI",
    subtitle: "Personalized Dish Recommender",
    description:
      "A smart culinary engine that maps flavor profiles and suggests dishes based on dietary constraints and personal taste preferences.",
    link: "https://aidishrecommendation-2kfirwo46-dev090502s-projects.vercel.app/",
    icon: UtensilsCrossed,
    gradient: "from-green-500/20 to-emerald-500/10",
    glow: "rgba(34,197,94,0.15)",
    border: "group-hover:border-emerald-500/30",
    status: "Live",
    tech: ["ML", "Data Science", "Python"],
  },
  {
    title: "CineMatch AI",
    subtitle: "Semantic Recommendation Engine",
    description:
      "Beyond basic filtering. Uses deep semantic understanding to find movies matching the feel of what you love.",
    link: "https://movierecommender-olddmm7qovbgmhpajusjmp.streamlit.app/",
    icon: Film,
    gradient: "from-red-500/20 to-pink-500/10",
    glow: "rgba(239,68,68,0.15)",
    border: "group-hover:border-red-500/30",
    status: "Live",
    tech: ["Python", "Streamlit", "TensorFlow"],
  },
  {
    title: "Smart Calc",
    subtitle: "Native Android Utility",
    description:
      "A highly optimized calculator built for the Android ecosystem with memory-efficient architecture and Material You theming.",
    link: "https://play.google.com/store/games?device=phone&hl=en_IN",
    icon: Smartphone,
    gradient: "from-blue-500/20 to-indigo-500/10",
    glow: "rgba(59,130,246,0.15)",
    border: "group-hover:border-blue-500/30",
    status: "Beta",
    tech: ["Kotlin", "Android SDK", "Material 3"],
  },
]

// ── Animations ─────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

// ── Status badge ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Project["status"] }) {
  const isLive = status === "Live" || status === "Flagship"
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
        isLive
          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-emerald-400 animate-pulse" : "bg-yellow-400"}`} />
      {status === "Flagship" ? "Featured" : status}
    </span>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Atmosphere */}
      <div className="fixed inset-0 opacity-[0.025] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
      <div className="fixed top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 pt-32 pb-24 container px-4 md:px-6 mx-auto">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-24 space-y-5"
        >
          <div className="inline-flex items-center rounded-full border border-purple-500/25 bg-purple-500/5 px-4 py-1.5 text-sm font-medium text-purple-300 shadow-[0_0_20px_-10px_rgba(168,85,247,0.5)]">
            <Sparkles className="w-3.5 h-3.5 mr-2" />
            Innovation Lab
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Work.
            </span>
          </h1>
          <p className="max-w-[520px] text-zinc-400 md:text-lg leading-relaxed">
            Experiments, prototypes, and production systems — built for real users.
          </p>
        </motion.div>

        {/* Project grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className={project.featured ? "md:col-span-3" : "md:col-span-1"}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="h-full"
              >
                <SpotlightCard
                  className={`group h-full flex flex-col bg-zinc-900/40 border-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-500 ${project.border}`}
                  spotlightColor={project.glow}
                >
                  {/* Gradient tint */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                  <div
                    className={`relative z-10 p-7 md:p-8 flex flex-col h-full gap-6 ${
                      project.featured ? "md:flex-row md:items-center" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div className="shrink-0">
                      <div className={`p-4 w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} border border-white/10 flex items-center justify-center shadow-inner`}>
                        <project.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
                        <StatusBadge status={project.status} />
                      </div>
                      <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
                        {project.subtitle}
                      </p>
                      <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-zinc-400 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Launch button */}
                    <div className={`shrink-0 ${project.featured ? "md:min-w-[180px]" : "pt-4 border-t border-white/[0.06]"}`}>
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative flex w-full overflow-hidden rounded-xl p-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                      >
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-[-1000%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
                        />
                        <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-zinc-900 gap-2">
                          {project.status === "Beta" ? "View Progress" : "Launch Project"}
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </span>
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