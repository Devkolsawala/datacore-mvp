"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Terminal, LayoutGrid, Briefcase, User } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Helper for scrolling to specific sections (Services, About, Contact)
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === '/') {
      e.preventDefault()
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header className={cn("fixed top-0 z-50 w-full transition-all duration-300", isScrolled ? "border-b border-white/5 bg-zinc-950/80 backdrop-blur-md" : "bg-transparent")}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        
        {/* LOGO: FIXED CLICK BEHAVIOR */}
        <Link 
          href="/" 
          onClick={(e) => {
            // If we are already on home, scroll to top smoothly
            if (pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }} 
          className="flex items-center space-x-2 font-bold text-white cursor-pointer"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="text-lg tracking-tight">DataCore</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
          
          <Link 
            href="/#services" 
            onClick={(e) => handleScrollToSection(e, "services")} 
            className="flex items-center gap-2 transition-colors hover:text-white cursor-pointer group"
          >
            <LayoutGrid className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
            <span>Services</span>
          </Link>

          <Link 
            href="/projects" 
            className={cn(
              "flex items-center gap-2 transition-colors hover:text-white cursor-pointer group",
              pathname === '/projects' ? "text-white" : ""
            )}
          >
            <Briefcase className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
            <span>Projects</span>
          </Link>

          <Link 
            href="/#about" 
            onClick={(e) => handleScrollToSection(e, "about")} 
            className="flex items-center gap-2 transition-colors hover:text-white cursor-pointer group"
          >
            <User className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
            <span>About</span>
          </Link>
          
        </nav>

        {/* CTA */}
        <div className="flex items-center space-x-4">
          <Link href="/#contact" onClick={(e) => handleScrollToSection(e, "contact")}>
            <Button 
              size="sm" 
              className="bg-white text-black hover:bg-zinc-200"
            >
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}