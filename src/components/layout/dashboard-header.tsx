"use client";

import { useState } from "react";
import { Menu, Bell, Search } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Sidebar } from "./sidebar";

interface DashboardHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: "OWNER" | "PROVIDER" | "ADMIN";
  };
  title?: string;
}

export function DashboardHeader({ user, title }: DashboardHeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 h-16 bg-white/95 backdrop-blur-sm border-b border-slate-100 flex items-center px-4 sm:px-6 gap-4">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page title */}
        {title && (
          <h1 className="font-heading font-bold text-lg text-navy hidden sm:block">
            {title}
          </h1>
        )}

        <div className="flex-1" />

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 w-64 border border-slate-100">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-slate-600 placeholder-slate-400 focus:outline-none w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <Avatar src={user.image} name={user.name} size="sm" />
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 z-50 w-72 lg:hidden">
            <Sidebar
              role={user.role}
              user={user}
              onClose={() => setSidebarOpen(false)}
              isMobile
            />
          </div>
        </>
      )}
    </>
  );
}
