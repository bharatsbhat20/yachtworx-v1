"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Sailboat,
  Store,
  ClipboardList,
  FolderOpen,
  MessageSquare,
  Shield,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    description:
      "Get a bird's-eye view of your entire fleet with real-time maintenance alerts, service timelines, and value tracking.",
    color: "ocean",
    bgColor: "bg-ocean/10",
    iconColor: "text-ocean",
  },
  {
    icon: Sailboat,
    title: "Boat Digital Twin",
    description:
      "Create a complete digital profile for every vessel. Track 6 component categories, service history, and documents.",
    color: "navy",
    bgColor: "bg-navy/10",
    iconColor: "text-navy",
  },
  {
    icon: Store,
    title: "Service Marketplace",
    description:
      "Browse certified marine mechanics near you. Filter by specialty, rating, certifications, and distance.",
    color: "teal",
    bgColor: "bg-teal/10",
    iconColor: "text-teal",
  },
  {
    icon: ClipboardList,
    title: "Service Pipeline",
    description:
      "Visualize every service request from quote to completion. Never lose track of what's happening with your boat.",
    color: "gold",
    bgColor: "bg-gold/10",
    iconColor: "text-gold-600",
  },
  {
    icon: FolderOpen,
    title: "Document Vault",
    description:
      "Store registrations, insurance, surveys, and service records securely. Get expiry alerts before they lapse.",
    color: "ocean",
    bgColor: "bg-ocean/10",
    iconColor: "text-ocean",
  },
  {
    icon: MessageSquare,
    title: "Integrated Messaging",
    description:
      "Communicate directly with service providers. All conversations tied to service requests for full context.",
    color: "teal",
    bgColor: "bg-teal/10",
    iconColor: "text-teal",
  },
  {
    icon: BarChart3,
    title: "Value Tracking",
    description:
      "Monitor your fleet's estimated value over time. Make data-driven decisions about maintenance and upgrades.",
    color: "navy",
    bgColor: "bg-navy/10",
    iconColor: "text-navy",
  },
  {
    icon: Shield,
    title: "Certified Providers",
    description:
      "Every mechanic on our marketplace is verified. Check certifications, reviews, and specialties at a glance.",
    color: "gold",
    bgColor: "bg-gold/10",
    iconColor: "text-gold-600",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-ocean/10 text-ocean text-sm font-semibold mb-4"
          >
            Everything You Need
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-4xl sm:text-5xl mb-4"
          >
            Built for Serious{" "}
            <span className="gradient-text">Yacht Owners</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Every feature is designed to protect your investment, reduce
            downtime, and connect you with the best marine service professionals.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group p-6 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-card-hover transition-all duration-300 cursor-pointer"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="font-heading font-semibold text-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
