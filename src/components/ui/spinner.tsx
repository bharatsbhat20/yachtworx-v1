import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-3",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-slate-200 border-t-ocean",
        sizeMap[size],
        className
      )}
    />
  );
}

export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="text-4xl animate-wave">⚓</div>
        <Spinner size="lg" />
        <p className="text-slate-500 font-body text-sm">Loading Yachtworx...</p>
      </div>
    </div>
  );
}
