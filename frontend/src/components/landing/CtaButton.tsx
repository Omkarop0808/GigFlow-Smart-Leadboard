import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "white";
  className?: string;
}

export function CtaButton({ to, children, variant = "primary", className }: CtaButtonProps) {
  const styles = {
    primary: "bg-zinc-900 text-white border border-white/10 hover:border-primary/50",
    secondary: "bg-transparent text-white border border-white/20 hover:bg-white/5",
    white: "bg-white text-black hover:bg-zinc-200",
  };

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Link
        to={to}
        className={cn(
          "inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium transition-colors",
          styles[variant],
          className
        )}
      >
        {variant !== "white" && (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-black">
            »
          </span>
        )}
        {children}
      </Link>
    </motion.div>
  );
}
