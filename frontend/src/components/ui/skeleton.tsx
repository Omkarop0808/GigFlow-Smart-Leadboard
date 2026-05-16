import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("rounded-xl bg-white/5", className)}
      initial={{ opacity: 0.4 }}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    />
  );
}
