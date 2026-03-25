"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Anchor, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const dashboardHref =
    session?.user?.role === "PROVIDER" ? "/provider/dashboard" : "/dashboard";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-ocean text-white">
              <Anchor className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold text-xl text-navy">
              Yacht<span className="gradient-text">worx</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/#features"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-navy rounded-lg hover:bg-slate-50 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-navy rounded-lg hover:bg-slate-50 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/providers"
              className="px-4 py-2 text-sm font-medium text-ocean hover:text-navy rounded-lg hover:bg-ocean/5 transition-colors font-semibold"
            >
              For Providers
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <Avatar
                    src={session.user?.image}
                    name={session.user?.name}
                    size="sm"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-card-hover border border-slate-100 py-2 z-50">
                    <Link
                      href={dashboardHref}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="ocean" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-4 py-4 space-y-2">
            <Link
              href="/#features"
              className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/providers"
              className="block px-4 py-2.5 text-sm font-semibold text-ocean hover:bg-ocean/5 rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              For Providers
            </Link>
            <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
              {session ? (
                <>
                  <Link href={dashboardHref} onClick={() => setIsOpen(false)}>
                    <Button variant="ocean" size="md" className="w-full">
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="md"
                    className="w-full text-red-500"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="md" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                    <Button variant="ocean" size="md" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Keep cn import used
const _ = cn;
void _;
