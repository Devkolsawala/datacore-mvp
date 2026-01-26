"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactContextType {
  openContact: () => void
  closeContact: () => void
}

const ContactContext = createContext<ContactContextType | undefined>(undefined)

export const useContact = () => {
  const context = useContext(ContactContext)
  if (!context) throw new Error("useContact must be used within a ContactProvider")
  return context
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // 1. SCROLL LOCK: Freeze background when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // 2. ESCAPE KEY: Close modal on 'Esc' press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeContact()
      }
    }
    
    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
    }
    
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen])

  const openContact = () => setIsOpen(true)
  
  const closeContact = () => {
    setIsOpen(false)
    setTimeout(() => {
      setStatus("idle")
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      
      if (res.ok) {
        setStatus("success")
        setTimeout(closeContact, 2000)
      } else {
        setStatus("error")
      }
    } catch (err) {
      setStatus("error")
    }
  }

  const Modal = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={closeContact}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
          >
            <button 
              onClick={closeContact}
              className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Contact Sales</h2>
              <p className="text-sm text-zinc-400">Leave your details and we'll call you back.</p>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Received!</h3>
                <p className="text-zinc-400 text-sm">We will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 uppercase">Name</label>
                  <input 
                    required
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 uppercase">Phone Number</label>
                  <input 
                    required
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="+91 98765..."
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 uppercase">Email</label>
                  <input 
                    required
                    type="email"
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="work@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 uppercase">Requirements (Optional)</label>
                  <textarea 
                    rows={2}
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none resize-none"
                    placeholder="Brief details..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-zinc-200 mt-2"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Submit
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  return (
    <ContactContext.Provider value={{ openContact, closeContact }}>
      {children}
      {mounted ? createPortal(Modal, document.body) : null}
    </ContactContext.Provider>
  )
}