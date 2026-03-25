import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-heading font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        hero: "btn-hero",
        ocean: "btn-ocean focus-visible:ring-ocean",
        gold: "btn-gold focus-visible:ring-gold",
        outline:
          "border-2 border-ocean text-ocean bg-transparent hover:bg-ocean/5 focus-visible:ring-ocean",
        ghost:
          "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-400",
        link: "text-ocean underline-offset-4 hover:underline",
        navy: "bg-navy text-white hover:bg-navy-700 focus-visible:ring-navy",
        teal: "bg-teal text-white hover:bg-teal-600 focus-visible:ring-teal",
      },
      size: {
        sm: "h-8 px-3 py-1.5 text-sm rounded-lg",
        md: "h-10 px-5 py-2.5 text-sm rounded-xl",
        lg: "h-12 px-7 py-3 text-base rounded-xl",
        xl: "h-14 px-9 py-4 text-lg rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "ocean",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
