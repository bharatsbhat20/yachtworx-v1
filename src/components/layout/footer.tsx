import Link from "next/link";
import { Anchor } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-ocean/30 text-white">
                <Anchor className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-xl">Yachtworx</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              The all-in-one platform for yacht owners and marine mechanics.
              Manage, maintain, and protect your fleet.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "Marketplace", "For Providers"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-slate-300 hover:text-white text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {["Documentation", "Help Center", "Blog", "Community"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-slate-300 hover:text-white text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-slate-300 hover:text-white text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Yachtworx. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <span>Made with</span>
            <span className="text-gold">⚓</span>
            <span>for yacht lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
