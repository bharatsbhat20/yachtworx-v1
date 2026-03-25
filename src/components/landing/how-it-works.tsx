"use client";

import { motion } from "framer-motion";
import { UserPlus, Sailboat, Wrench, CheckCircle } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up as a yacht owner in under 2 minutes. No credit card required to get started.",
    color: "ocean",
  },
  {
    step: "02",
    icon: Sailboat,
    title: "Add Your Fleet",
    description:
      "Build digital profiles for each vessel. Add photos, specs, components, and existing service records.",
    color: "teal",
  },
  {
    step: "03",
    icon: Wrench,
    title: "Find & Book Mechanics",
    description:
      "Browse certified providers in our marketplace. Request service, get quotes, and track progress.",
    color: "gold",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Stay Protected",
    description:
      "Get maintenance alerts, keep documents current, and watch your fleet's value grow over time.",
    color: "navy",
  },
];

const colorMap: Record<string, string> = {
  ocean: "bg-ocean/10 text-ocean border-ocean/20",
  teal: "bg-teal/10 text-teal border-teal/20",
  gold: "bg-gold/10 text-gold-600 border-gold/20",
  navy: "bg-navy/10 text-navy border-navy/20",
};

const numberColor: Record<string, string> = {
  ocean: "text-ocean",
  teal: "text-teal",
  gold: "text-gold-500",
  navy: "text-navy",
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-teal/10 text-teal text-sm font-semibold mb-4"
          >
            Simple Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-4xl sm:text-5xl mb-4"
          >
            Get Running in{" "}
            <span className="gradient-text">Minutes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 max-w-xl mx-auto"
          >
            Four simple steps to transform how you manage your yacht.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-[calc(100%-200px)] h-0.5 bg-slate-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step icon */}
                  <div
                    className={`relative flex items-center justify-center w-16 h-16 rounded-2xl border-2 ${colorMap[step.color]} mb-6 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-7 h-7" />
                    <div
                      className={`absolute -top-3 -right-3 w-7 h-7 rounded-full bg-white border-2 border-current flex items-center justify-center`}
                    >
                      <span
                        className={`text-xs font-bold ${numberColor[step.color]}`}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`font-heading text-sm font-bold tracking-wider uppercase ${numberColor[step.color]} mb-2`}
                  >
                    Step {step.step}
                  </span>
                  <h3 className="font-heading font-semibold text-navy text-lg mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
