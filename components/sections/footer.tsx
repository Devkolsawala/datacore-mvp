"use client"

import Link from "next/link"
import {
  Terminal,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
  ExternalLink,
} from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useContact } from "@/components/contact-provider"

function SocialIcon({ icon: Icon, href }: { icon: React.ElementType; href: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all duration-300"
    >
      <Icon className="h-4 w-4" />
    </Link>
  )
}

function FooterLink({
  href,
  onClick,
  children,
  external,
}: {
  href: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  children: React.ReactNode
  external?: boolean
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
    >
      {children}
      {external && (
        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </Link>
  )
}

export function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false)
  const { openContact } = useContact()

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-zinc-800/50 bg-zinc-950 pt-20 pb-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-16">

          {/* Brand */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2.5 font-bold text-white group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="text-lg tracking-tight">
                Data<span className="text-zinc-400">Core</span>
              </span>
            </button>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-[260px]">
              Engineering the next generation of digital infrastructure. We turn complex data into clear business growth.
            </p>
            <div className="flex space-x-2">
              <SocialIcon icon={Github} href="#" />
              <SocialIcon icon={Twitter} href="#" />
              <SocialIcon icon={Linkedin} href="#" />
            </div>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em]">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><FooterLink href="#services" onClick={(e) => scrollToSection(e, "services")}>Services</FooterLink></li>
              <li>
                <Link href="/projects" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors duration-200">
                  Projects
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20 font-medium">
                    New
                  </span>
                </Link>
              </li>
              <li><FooterLink href="#about" onClick={(e) => scrollToSection(e, "about")}>About Us</FooterLink></li>
              <li>
                <button
                  onClick={openContact}
                  className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
                >
                  Contact Sales
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em]">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><FooterLink href="#">Privacy Policy</FooterLink></li>
              <li><FooterLink href="#">Terms of Service</FooterLink></li>
              <li><FooterLink href="#">Cookie Policy</FooterLink></li>
              <li><FooterLink href="#">Security</FooterLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em]">Contact</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="flex items-start gap-3 group">
                <MapPin className="h-4 w-4 text-zinc-600 shrink-0 mt-0.5 group-hover:text-blue-400 transition-colors" />
                <span className="group-hover:text-zinc-300 transition-colors leading-relaxed">
                  101, Tech Park Plaza,<br />
                  Surat, Gujarat — 395007
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="h-4 w-4 text-zinc-600 shrink-0 group-hover:text-blue-400 transition-colors" />
                <a href="mailto:hello@datacore.com" className="group-hover:text-zinc-200 transition-colors">
                  hello@datacore.com
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="h-4 w-4 text-zinc-600 shrink-0 group-hover:text-blue-400 transition-colors" />
                <span className="group-hover:text-zinc-300 transition-colors">+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} DataCore Solutions Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs text-zinc-400 font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-50 p-3 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 text-zinc-400 shadow-xl hover:text-white hover:border-zinc-600 hover:bg-zinc-800 hover:scale-110 transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}