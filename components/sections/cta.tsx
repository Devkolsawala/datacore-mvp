"use client"

import { Button } from "@/components/ui/button"
import { useContact } from "@/components/contact-provider" // Import hook

export function CTA() {
  const { openContact } = useContact() // Use hook

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-zinc-950 to-zinc-950 -z-10" />
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 px-6 py-16 md:px-16 md:py-24 text-center">
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl max-w-2xl">
              Ready to scale your digital infrastructure?
            </h2>
            <p className="max-w-[600px] text-zinc-400 md:text-xl">
              Partner with a team that prioritizes architecture, security, and measurable results.
            </p>
            
            <div className="w-full flex justify-center pt-4">
              <Button 
                onClick={openContact}
                size="lg" 
                className="h-12 px-8 text-base bg-white text-black hover:bg-zinc-200"
              >
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}