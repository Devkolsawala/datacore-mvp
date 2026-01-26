"use client"

import Link from "next/link"
import { Terminal, Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12 md:py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <Link 
              href="/" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center space-x-2 font-bold text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="text-lg tracking-tight">DataCore</span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Engineering the next generation of digital infrastructure. We turn complex data into clear business growth.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors"><Github className="h-5 w-5" /></Link>
              <Link href="#" className="text-zinc-400 hover:text-blue-400 transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-zinc-400 hover:text-blue-600 transition-colors"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <a href="#services" onClick={(e) => scrollToSection(e, "services")} className="hover:text-blue-400 transition-colors flex items-center">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => scrollToSection(e, "about")} className="hover:text-blue-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className="hover:text-blue-400 transition-colors">
                  Contact Sales
                </a>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal / Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info (The "Real Business" proof) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                <span>
                  101, Tech Park Plaza,<br />
                  Surat, Gujarat, India 395007
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <a href="mailto:hello@datacore.com" className="hover:text-white transition-colors">
                  hello@datacore.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} DataCore Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-zinc-500 font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}