"use client"

import Link from "next/link"
import { Terminal, LayoutGrid, Briefcase, User, X, Menu, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useContact } from "@/components/contact-provider"

const navLinks = [
  { label: "Services", href: "/#services", sectionId: "services", icon: LayoutGrid },
  { label: "Projects", href: "/projects", icon: Briefcase },
  { label: "About", href: "/#about", sectionId: "about", icon: User },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { openContact } = useContact()
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    if (pathname === "/") {
      e.preventDefault()
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    }
    setMobileOpen(false)
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "border-b border-white/[0.06] bg-zinc-950/85 backdrop-blur-xl shadow-[0_1px_40px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

          {/* ── Logo ── */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group flex items-center space-x-2.5 font-bold text-white"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black overflow-hidden transition-transform duration-300 group-hover:scale-110">
              <Terminal className="h-4 w-4 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-300" />
            </div>
            <span className="text-[17px] tracking-tight">
              Data<span className="text-zinc-400">Core</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
            {navLinks.map(({ label, href, sectionId, icon: Icon }) => {
              const isActive =
                label === "Projects"
                  ? pathname === "/projects"
                  : pathname === "/" && false // section links never "active" by pathname

              return (
                <Link
                  key={label}
                  href={href}
                  onClick={
                    sectionId
                      ? (e) => handleScrollToSection(e, sectionId)
                      : undefined
                  }
                  className={cn(
                    "group relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-zinc-400 transition-colors hover:text-white",
                    isActive && "text-white"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 transition-colors group-hover:text-blue-400" />
                  <span>{label}</span>
                  {/* Animated underline */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100",
                      isActive && "scale-x-100"
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={openContact}
              className="group relative inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
            >
              Contact Sales
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden relative z-10 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-16 left-0 right-0 z-40 border-b border-white/[0.06] bg-zinc-950/95 backdrop-blur-xl px-4 py-6"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map(({ label, href, sectionId, icon: Icon }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={href}
                      onClick={
                        sectionId
                          ? (e) => handleScrollToSection(e, sectionId)
                          : () => setMobileOpen(false)
                      }
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Icon className="h-4 w-4 text-blue-400" />
                      <span className="font-medium">{label}</span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06 }}
                  className="mt-3 pt-3 border-t border-white/[0.06]"
                >
                  <button
                    onClick={() => { openContact(); setMobileOpen(false) }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black hover:bg-zinc-100 transition-colors active:scale-[0.98]"
                  >
                    Contact Sales
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}