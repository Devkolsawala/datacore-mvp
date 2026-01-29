"use client"

import Link from "next/link"
import { Terminal, Github, Twitter, Linkedin, Mail, MapPin, Phone, ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative border-t border-zinc-800 bg-zinc-950 pt-20 pb-10 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link 
              href="/" 
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              className="flex items-center space-x-2 font-bold text-white group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-white to-zinc-400 text-black shadow-lg shadow-white/10 group-hover:scale-105 transition-transform">
                <Terminal className="h-5 w-5" />
              </div>
              <span className="text-xl tracking-tight">DataCore</span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Engineering the next generation of digital infrastructure. We turn complex data into clear business growth.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon icon={Github} href="#" />
              <SocialIcon icon={Twitter} href="#" />
              <SocialIcon icon={Linkedin} href="#" />
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2 w-fit">Company</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              {/* FIXED: Explicitly typed 'e' in the arrow function */}
              <li><FooterLink href="#services" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, "services")}>Services</FooterLink></li>
              <li><Link href="/projects" className="hover:text-blue-400 transition-colors flex items-center gap-2">Projects <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">New</span></Link></li>
              <li><FooterLink href="#about" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, "about")}>About Us</FooterLink></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2 w-fit">Legal</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><FooterLink href="#">Privacy Policy</FooterLink></li>
              <li><FooterLink href="#">Terms of Service</FooterLink></li>
              <li><FooterLink href="#">Cookie Policy</FooterLink></li>
              <li><FooterLink href="#">Security</FooterLink></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2 w-fit">Contact</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5 group-hover:text-blue-400 transition-colors" />
                <span className="group-hover:text-zinc-300 transition-colors">
                  101, Tech Park Plaza,<br />
                  Surat, Gujarat, India 395007
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-blue-500 shrink-0 group-hover:text-blue-400 transition-colors" />
                <a href="mailto:hello@datacore.com" className="group-hover:text-white transition-colors">
                  hello@datacore.com
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-blue-500 shrink-0 group-hover:text-blue-400 transition-colors" />
                <span className="group-hover:text-zinc-300 transition-colors">+91 98765 43210</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-zinc-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} DataCore Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
            <div className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-xs text-zinc-400 font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* BACK TO TOP BUTTON (Fixed to bottom-24) */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
          >
            <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}

function SocialIcon({ icon: Icon, href }: { icon: any, href: string }) {
  return (
    <Link href={href} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all duration-300">
      <Icon className="h-5 w-5" />
    </Link>
  )
}

function FooterLink({ href, onClick, children }: { href: string, onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="inline-block hover:text-blue-400 hover:translate-x-1 transition-all duration-200"
    >
      {children}
    </Link>
  )
}