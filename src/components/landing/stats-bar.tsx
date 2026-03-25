"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";

export function StatsBar() {
  return (
    <section className="py-16 bg-gradient-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-heading text-4xl sm:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-slate-300 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
