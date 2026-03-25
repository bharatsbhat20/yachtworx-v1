import * as React from "react";
import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-heading font-semibold overflow-hidden flex-shrink-0",
        sizeMap[size],
        !src && "bg-gradient-ocean text-white",
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name ?? "Avatar"} className="h-full w-full object-cover" />
      ) : (
        <span>{name ? getInitials(name) : "?"}</span>
      )}
    </div>
  );
}
