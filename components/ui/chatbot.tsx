"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  Bot,
  Sparkles,
  X,
  RefreshCw,
  ChevronRight,
} from "lucide-react"
import { chatData } from "@/lib/chat-data"
import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────

type Sender = "bot" | "user"

interface Message {
  id: string
  text: string
  sender: Sender
  timestamp: Date
}

// ── Constants ──────────────────────────────────────────────────────────────

const INITIAL_MESSAGE: Message = {
  id: "init",
  text: "Hi! I'm DataCore's AI assistant. Select a topic below to get started — I'm here to help.",
  sender: "bot",
  timestamp: new Date(),
}

// ── Chatbot component ──────────────────────────────────────────────────────

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleToggle = () => {
    setIsOpen((v) => !v)
    if (!isOpen) setHasUnread(false)
  }

  const handleReset = useCallback(() => {
    setMessages([{ ...INITIAL_MESSAGE, timestamp: new Date() }])
  }, [])

  const handleQuestion = useCallback(
    (question: string, answer: string) => {
      if (isTyping) return
      const userMsg: Message = {
        id: Date.now().toString(),
        text: question,
        sender: "user",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMsg])
      setIsTyping(true)
      setTimeout(
        () => {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              text: answer,
              sender: "bot",
              timestamp: new Date(),
            },
          ])
          setIsTyping(false)
        },
        Math.random() * 400 + 700
      )
    },
    [isTyping]
  )

  return (
    <>
      {/* ── Trigger button ── */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2">
        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 8, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="mr-2 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700/60 text-xs text-zinc-200 shadow-xl whitespace-nowrap"
            >
              Ask AI Assistant
              <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-zinc-800" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl border transition-all duration-300",
            isOpen
              ? "bg-zinc-800 border-zinc-700 text-white"
              : "bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-500/30 text-white shadow-blue-500/20"
          )}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <MessageSquare className="h-5 w-5 fill-current" />
              )}
            </motion.span>
          </AnimatePresence>

          {/* Unread badge */}
          {!isOpen && hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold ring-2 ring-zinc-950">
              1
            </span>
          )}

          {/* Ping ring (idle only) */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full border border-blue-500/30 animate-ping opacity-30 pointer-events-none" />
          )}
        </motion.button>
      </div>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.93, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.93 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[60] w-[360px] sm:w-[400px] h-[600px] max-h-[80svh] flex flex-col rounded-2xl border border-white/[0.08] bg-zinc-950/90 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden ring-1 ring-white/[0.04]"
          >
            {/* Header */}
            <div className="flex-none px-4 py-3 border-b border-white/[0.06] bg-gradient-to-r from-white/[0.04] to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none">DataCore Assistant</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <p className="text-[11px] text-zinc-500 font-medium">Online · Replies instantly</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="p-2 rounded-lg hover:bg-white/8 text-zinc-500 hover:text-zinc-200 transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Date divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-zinc-800" />
                <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest">Today</span>
                <div className="flex-1 h-px bg-zinc-800" />
              </div>

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={cn("flex gap-2", msg.sender === "user" ? "justify-end" : "justify-start")}
                >
                  {msg.sender === "bot" && (
                    <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-blue-500/30 to-cyan-500/30 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="h-3.5 w-3.5 text-blue-400" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-zinc-900 border border-zinc-800/80 text-zinc-200 rounded-bl-sm"
                    )}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <p className={cn("text-[10px] mt-1 text-right opacity-60",
                      msg.sender === "user" ? "text-blue-200" : "text-zinc-600"
                    )}>
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-blue-500/30 to-cyan-500/30 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Bot className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  <div className="bg-zinc-900 rounded-2xl rounded-bl-sm px-4 py-3 border border-zinc-800/80 flex items-center gap-1">
                    {[0, 150, 300].map((delay, i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick actions */}
            <div className="flex-none p-3 border-t border-white/[0.06] bg-zinc-900/60 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2.5 px-1">
                <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
                  Quick Topics
                </p>
                <Sparkles className="h-3 w-3 text-zinc-600" />
              </div>

              <div className="flex flex-col gap-1 max-h-[160px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {chatData.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleQuestion(item.question, item.answer)}
                    disabled={isTyping}
                    className="group flex items-center justify-between gap-2 w-full text-left text-xs px-3 py-2 rounded-xl bg-zinc-800/50 hover:bg-blue-600/10 border border-zinc-700/40 hover:border-blue-500/25 text-zinc-400 hover:text-zinc-200 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    <span>{item.question}</span>
                    <ChevronRight className="h-3 w-3 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}