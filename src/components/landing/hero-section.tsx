"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Shield, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80')`,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120V60C240 0 480 0 720 40C960 80 1200 80 1440 40V120H0Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6"
          >
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span>Trusted by 12,400+ yacht owners worldwide</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Your Yacht.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-300">
              Perfectly
            </span>{" "}
            Maintained.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-200 leading-relaxed mb-8 max-w-xl"
          >
            The all-in-one platform connecting yacht owners with certified marine
            mechanics. Track maintenance, manage documents, and protect your
            fleet&apos;s value — all in one beautiful dashboard.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link href="/auth/register">
              <Button variant="hero" size="xl">
                Start for Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <button className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl text-white font-heading font-semibold text-base border border-white/30 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </div>
              Watch Demo
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            {[
              { icon: Shield, text: "Enterprise-grade security" },
              { icon: Star, text: "4.9/5 owner rating" },
              { icon: TrendingUp, text: "Protect fleet value" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-slate-300 text-sm"
              >
                <Icon className="w-4 h-4 text-teal" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
