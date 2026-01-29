"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Bot, Sparkles, Minimize2, ChevronRight, RefreshCw } from "lucide-react"
import { chatData } from "@/lib/chat-data"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  text: string
  sender: 'bot' | 'user'
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  
  // Initial State
  const initialMessage: Message = { 
    id: 'init', 
    text: "Hello! I'm DataCore AI. Select a topic below to get started.", 
    sender: 'bot',
    timestamp: new Date()
  }

  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping, isOpen])

  const handleOpen = () => {
    setIsOpen(!isOpen)
    setHasUnread(false)
  }

  const handleReset = () => {
    setMessages([initialMessage])
  }

  const handleQuestionClick = async (question: string, answer: string) => {
    const userMsg: Message = { 
      id: Date.now().toString(), 
      text: question, 
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    const delay = Math.random() * 500 + 600 
    setTimeout(() => {
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        text: answer, 
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, delay)
  }

  return (
    <>
      {/* 1. FLOATING TRIGGER (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2">
        
        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="mr-4 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 shadow-xl whitespace-nowrap"
            >
              Ask AI Assistant
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 border border-white/10 backdrop-blur-md",
            isOpen ? "bg-zinc-800 text-white" : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/25"
          )}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <Minimize2 className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageSquare className="h-6 w-6 fill-current" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isOpen && hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold ring-2 ring-zinc-950 animate-bounce">
              1
            </span>
          )}
        </motion.button>
      </div>

      {/* 2. CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-[60] w-[360px] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-2xl shadow-2xl overflow-hidden ring-1 ring-white/5"
          >
            
            {/* Header */}
            <div className="flex-none p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-900" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">DataCore Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <p className="text-xs text-zinc-400 font-medium">Online Now</p>
                  </div>
                </div>
              </div>
              
              {/* Reset Button */}
              <button 
                onClick={handleReset}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                title="Reset Chat"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Area - Scrollbar Hidden via CSS Classes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex justify-center">
                <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest">Today</span>
              </div>

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm relative",
                      msg.sender === 'user'
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none"
                    )}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <div className={cn(
                      "text-[9px] mt-1 text-right opacity-70",
                      msg.sender === 'user' ? "text-blue-200" : "text-zinc-500"
                    )}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 rounded-2xl rounded-bl-none px-4 py-3 border border-zinc-800 flex items-center gap-1">
                    <span className="text-xs text-zinc-500 mr-2">Thinking</span>
                    <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* QUICK ACTIONS DASHBOARD (No Fake Input) */}
            <div className="flex-none p-4 bg-zinc-900/90 backdrop-blur-md border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Quick Actions</p>
                 <Sparkles className="h-3 w-3 text-blue-400" />
              </div>
              
              {/* Suggestions Grid - Scrollbar Hidden */}
              <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {chatData.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleQuestionClick(item.question, item.answer)}
                    disabled={isTyping}
                    className="group flex items-center gap-2 text-xs text-left px-3 py-2 rounded-xl bg-zinc-800/80 hover:bg-blue-600/10 hover:border-blue-500/30 hover:text-blue-200 text-zinc-300 border border-zinc-700/50 transition-all disabled:opacity-50 active:scale-95 w-full sm:w-auto"
                  >
                    <span>{item.question}</span>
                    <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400 ml-auto" />
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