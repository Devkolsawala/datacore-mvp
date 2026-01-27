"use client"

import { SpotlightCard } from "@/components/ui/spotlight-card" // 1. Import SpotlightCard
import { Smartphone, Globe, BarChart3, ArrowRight, BrainCircuit } from "lucide-react"

const services = [
  {
    title: "AI & Automation Solutions",
    description: "Custom AI agents, RAG chatbots, and automated workflows. We build intelligent systems that streamline operations and predict future trends.",
    icon: BrainCircuit,
  },
  {
    title: "Application Development",
    description: "High-performance mobile apps built for scale. We engineer native and cross-platform solutions (React Native, Flutter) for iOS and Android.",
    icon: Smartphone,
  },
  {
    title: "Web Development",
    description: "Enterprise-grade web platforms using Next.js and TypeScript. We build responsive, secure, and SEO-optimized web applications.",
    icon: Globe,
  },
  {
    title: "Data Insights & Analytics",
    description: "Transform raw data into strategic assets. Our advanced analytics pipelines uncover hidden trends and visualize key performance metrics.",
    icon: BarChart3,
  },
]

export function Services() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // Preserved your padding (py-16) and background
    <section id="services" className="py-16 bg-zinc-950">
      <div className="container px-4 md:px-6 mx-auto">
        
        {/* Header Section (Unchanged) */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
            Our Expertise
          </div>
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Digital Solutions
          </h2>
          <p className="max-w-[700px] text-zinc-400 md:text-xl/relaxed">
            We build the infrastructure that powers modern business growth.
          </p>
        </div>
        
        {/* Grid (Preserved lg:grid-cols-4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <SpotlightCard 
              key={index} 
              // 2. Added 'group' to enable hover effects, kept your cursor-pointer
              className="group p-6 h-full flex flex-col justify-between cursor-pointer"
              // 3. Re-attached your scroll function
              onClick={scrollToContact}
            >
              {/* Header Area */}
              <div className="mb-4">
                {/* Icon Box with your specific hover colors */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 group-hover:bg-blue-600 transition-colors duration-300">
                  <service.icon className="h-6 w-6 text-zinc-100" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
              </div>
              
              {/* Content Area */}
              <div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4 min-h-[80px]">
                  {service.description}
                </p>
                
                {/* Learn More Link with your animation */}
                <div className="flex items-center text-sm font-medium text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}