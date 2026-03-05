"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react"

// ── Types ──────────────────────────────────────────────────────────────────

interface ContactContextType {
  openContact: () => void
  closeContact: () => void
}

const ContactContext = createContext<ContactContextType | undefined>(undefined)

export const useContact = (): ContactContextType => {
  const ctx = useContext(ContactContext)
  if (!ctx) throw new Error("useContact must be used within ContactProvider")
  return ctx
}

type Status = "idle" | "loading" | "success" | "error"

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

interface Errors {
  name?: string
  email?: string
  phone?: string
}

// ── Validation ─────────────────────────────────────────────────────────────

function validate(data: FormData): Errors {
  const errs: Errors = {}
  if (!data.name.trim()) errs.name = "Name is required"
  else if (data.name.trim().length < 2) errs.name = "Name must be at least 2 characters"

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email.trim()) errs.email = "Email is required"
  else if (!emailRx.test(data.email)) errs.email = "Enter a valid email address"

  const phoneRx = /^\+?[0-9]{10,15}$/
  const cleaned = data.phone.replace(/[\s\-()]/g, "")
  if (!data.phone.trim()) errs.phone = "Phone number is required"
  else if (!phoneRx.test(cleaned)) errs.phone = "Enter a valid 10-15 digit number"

  return errs
}

// ── Floating label input ───────────────────────────────────────────────────

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
  textarea,
}: {
  id: string
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  required?: boolean
  textarea?: boolean
}) {
  const base =
    "w-full rounded-xl border bg-zinc-900/70 px-4 pt-6 pb-2.5 text-sm text-white placeholder-transparent focus:outline-none focus:ring-1 transition-all duration-200"
  const borderCls = error
    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30"
    : "border-zinc-800 focus:border-blue-500/60 focus:ring-blue-500/20 hover:border-zinc-700"

  const labelCls =
    "absolute left-4 top-4 text-sm text-zinc-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-400 peer-focus:font-medium " +
    (value ? "top-2 text-[10px] text-zinc-500 font-medium" : "")

  return (
    <div className="relative space-y-1">
      {textarea ? (
        <textarea
          id={id}
          rows={3}
          className={`${base} ${borderCls} peer resize-none`}
          placeholder={placeholder ?? label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={`${base} ${borderCls} peer`}
          placeholder={placeholder ?? label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "off"}
        />
      )}
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 text-[11px] text-red-400 font-medium"
          >
            <AlertCircle className="h-3 w-3 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Provider ───────────────────────────────────────────────────────────────

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  // Re-validate on change only for fields already touched
  useEffect(() => {
    if (touched.size > 0) {
      const newErrors = validate(formData)
      const filtered = Object.fromEntries(
        Object.entries(newErrors).filter(([k]) => touched.has(k))
      ) as Errors
      setErrors(filtered)
    }
  }, [formData, touched])

  const openContact = useCallback(() => setIsOpen(true), [])

  const closeContact = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      setStatus("idle")
      setFormData({ name: "", email: "", phone: "", message: "" })
      setErrors({})
      setTouched(new Set())
    }, 400)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all as touched
    setTouched(new Set(["name", "email", "phone"]))
    const errs = validate(formData)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      setStatus(res.ok ? "success" : "error")
      if (res.ok) setTimeout(closeContact, 2200)
    } catch {
      setStatus("error")
    }
  }

  const set = (key: keyof FormData) => (v: string) => {
    setFormData((prev) => ({ ...prev, [key]: v }))
    setTouched((prev) => new Set(prev).add(key))
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
            transition={{ duration: 0.25 }}
            onClick={closeContact}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[420px] rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden"
          >
            {/* Top accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Contact Sales</h2>
                  <p className="text-sm text-zinc-500 mt-0.5">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={closeContact}
                  className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Success state */}
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center gap-4"
                >
                  <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Received!</h3>
                    <p className="text-zinc-500 text-sm">We'll reach out shortly.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <Field
                    id="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={set("name")}
                    error={errors.name}
                    required
                  />
                  <Field
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={set("phone")}
                    error={errors.phone}
                    required
                  />
                  <Field
                    id="email"
                    label="Work Email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={set("email")}
                    error={errors.email}
                    required
                  />
                  <Field
                    id="message"
                    label="Project Details (optional)"
                    value={formData.message}
                    onChange={set("message")}
                    textarea
                  />

                  {/* Error banner */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        Something went wrong. Please try again.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black hover:bg-zinc-100 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98] mt-2"
                  >
                    {status === "loading" ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                    ) : (
                      <><Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" /> Submit Request</>
                    )}
                  </button>
                </form>
              )}
            </div>
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