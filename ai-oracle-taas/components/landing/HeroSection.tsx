"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Shield, Zap, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function HeroSection() {
  const [email, setEmail] = useState("")

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <Zap className="w-4 h-4 mr-2" />
            Powered by Cortensor Network
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-foreground leading-tight text-balance"
          >
            The{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Truth Machine</span>
            <br />
            for AI
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-pretty"
          >
            Eliminate AI hallucinations through decentralized consensus. Get verified, truthful answers from multiple
            independent AI miners in the Cortensor network.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 text-sm"
          >
            <div className="flex items-center px-4 py-2 bg-card rounded-full border border-border">
              <Shield className="w-4 h-4 mr-2 text-primary" />
              <span className="text-card-foreground">Hallucination-Free</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-card rounded-full border border-border">
              <Network className="w-4 h-4 mr-2 text-accent" />
              <span className="text-card-foreground">Decentralized Consensus</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-card rounded-full border border-border">
              <Zap className="w-4 h-4 mr-2 text-primary" />
              <span className="text-card-foreground">Real-time Verification</span>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-primary"
              />
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 whitespace-nowrap"
              >
                Get Early Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/oracle">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  Try Oracle Demo
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto pt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">99.2%</div>
              <div className="text-muted-foreground">Truth Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">50+</div>
              <div className="text-muted-foreground">Active Miners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">2.3s</div>
              <div className="text-muted-foreground">Avg Response Time</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
