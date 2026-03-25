import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-navy/10 text-navy",
        ocean: "bg-ocean/10 text-ocean",
        teal: "bg-teal/10 text-teal",
        gold: "bg-gold/10 text-gold-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-amber-100 text-amber-700",
        danger: "bg-red-100 text-red-700",
        outline: "border border-current text-slate-600",
        secondary: "bg-slate-100 text-slate-600",
        pending: "bg-gold/10 text-amber-700",
        quoted: "bg-ocean/10 text-ocean",
        accepted: "bg-teal/10 text-teal",
        "in-progress": "bg-navy/10 text-navy",
        completed: "bg-green-100 text-green-700",
        cancelled: "bg-slate-100 text-slate-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
