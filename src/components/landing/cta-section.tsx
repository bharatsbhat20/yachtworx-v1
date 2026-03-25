"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-navy text-white p-12 sm:p-16 text-center"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-ocean/20 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mx-auto mb-6">
              <Anchor className="w-8 h-8 text-gold" />
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
              Ready to Set Sail?
            </h2>
            <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8">
              Join over 12,400 yacht owners who trust Yachtworx to protect their
              fleet. Free to start — no credit card required.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button variant="gold" size="xl">
                  Start Free Today
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/providers">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Join as a Provider
                </Button>
              </Link>
            </div>

            <p className="text-slate-400 text-sm mt-6">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
