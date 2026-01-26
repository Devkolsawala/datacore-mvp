"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Terminal } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className={cn("fixed top-0 z-50 w-full transition-all duration-300", isScrolled ? "border-b border-white/5 bg-zinc-950/80 backdrop-blur-md" : "bg-transparent")}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" onClick={(e) => { if(window.location.pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }} className="flex items-center space-x-2 font-bold text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="text-lg tracking-tight">DataCore</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
          <a href="#services" onClick={(e) => scrollToSection(e, "services")} className="transition-colors hover:text-white cursor-pointer">Services</a>
          <a href="#about" onClick={(e) => scrollToSection(e, "about")} className="transition-colors hover:text-white cursor-pointer">About</a>
        </nav>

        <div className="flex items-center space-x-4">
          {/* UPDATED: Now scrolls to #contact instead of opening modal directly */}
          <Button 
            onClick={(e) => scrollToSection(e, "contact")} 
            size="sm" 
            className="bg-white text-black hover:bg-zinc-200"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </header>
  )
}