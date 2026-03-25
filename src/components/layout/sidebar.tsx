"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Sailboat,
  Store,
  ClipboardList,
  FolderOpen,
  MessageSquare,
  LogOut,
  Anchor,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

const ownerNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/boats", label: "My Fleet", icon: Sailboat },
  { href: "/marketplace", label: "Marketplace", icon: Store },
  { href: "/requests", label: "Service Requests", icon: ClipboardList },
  { href: "/documents", label: "Documents", icon: FolderOpen },
  { href: "/messages", label: "Messages", icon: MessageSquare },
];

const providerNav = [
  { href: "/provider/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/provider/requests", label: "Requests", icon: ClipboardList },
  { href: "/provider/profile", label: "My Profile", icon: User },
  { href: "/messages", label: "Messages", icon: MessageSquare },
];

interface SidebarProps {
  role: "OWNER" | "PROVIDER" | "ADMIN";
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onClose?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ role, user, onClose, isMobile }: SidebarProps) {
  const pathname = usePathname();
  const navItems = role === "PROVIDER" ? providerNav : ownerNav;

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-100">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-ocean text-white">
            <Anchor className="w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-xl text-navy">
            Yacht<span className="gradient-text">worx</span>
          </span>
        </Link>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Role badge */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-ocean/5">
          <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          <span className="text-xs font-semibold text-ocean uppercase tracking-wide">
            {role === "PROVIDER" ? "Service Provider" : "Boat Owner"}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              item.href !== "/provider/dashboard" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "nav-link",
                isActive && "active"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-ocean" : "text-slate-400"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-4 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors mb-2">
          <Avatar src={user.image} name={user.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {user.name}
            </p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
