"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
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
  
  // Validation State
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = "hidden" } 
    else { document.body.style.overflow = "unset" }
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  const openContact = () => setIsOpen(true)
  
  const closeContact = () => {
    setIsOpen(false)
    setTimeout(() => {
      setStatus("idle")
      setFormData({ name: "", email: "", phone: "", message: "" })
      setErrors({})
    }, 500)
  }

  // --- VALIDATION LOGIC ---
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    // Name: Required, min 2 chars
    if (!formData.name.trim()) newErrors.name = "Name is required"
    else if (formData.name.length < 2) newErrors.name = "Name is too short"

    // Email: Regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email address"

    // Phone: 10-15 digits
    const phoneRegex = /^\+?[0-9]{10,15}$/
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) newErrors.phone = "Invalid phone number (10-15 digits)"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 1. Run Validation
    if (!validateForm()) return

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
      console.error(err)
      setStatus("error")
    }
  }

  const Modal = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeContact}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
          >
            <button onClick={closeContact} className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
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
                
                {/* NAME FIELD */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400 uppercase">Name <span className="text-red-500">*</span></label>
                  <input 
                    className={`w-full rounded-md border bg-zinc-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 ${errors.name ? 'border-red-500/50 focus:ring-red-500' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500'}`} 
                    placeholder="John Doe" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                  {errors.name && <p className="text-xs text-red-400 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/> {errors.name}</p>}
                </div>

                {/* PHONE FIELD */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400 uppercase">Phone <span className="text-red-500">*</span></label>
                  <input 
                    className={`w-full rounded-md border bg-zinc-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 ${errors.phone ? 'border-red-500/50 focus:ring-red-500' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500'}`} 
                    placeholder="+91 98765 43210" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  />
                  {errors.phone && <p className="text-xs text-red-400 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/> {errors.phone}</p>}
                </div>

                {/* EMAIL FIELD */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400 uppercase">Email <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    className={`w-full rounded-md border bg-zinc-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 ${errors.email ? 'border-red-500/50 focus:ring-red-500' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500'}`} 
                    placeholder="work@email.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  />
                  {errors.email && <p className="text-xs text-red-400 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/> {errors.email}</p>}
                </div>

                {/* MESSAGE FIELD */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400 uppercase">Message</label>
                  <textarea 
                    rows={2} 
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none resize-none" 
                    placeholder="Project details..." 
                    value={formData.message} 
                    onChange={(e) => setFormData({...formData, message: e.target.value})} 
                  />
                </div>

                <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200 mt-2" disabled={status === "loading"}>
                  {status === "loading" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Submit Request
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