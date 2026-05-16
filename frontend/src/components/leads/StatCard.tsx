import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  index: string;
  title: string;
  value: number | string;
  tags?: string[];
  className?: string;
}

export function StatCard({ index, title, value, tags = [], className }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className={cn("group relative overflow-hidden", className)}>
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
        <CardHeader className="pb-2">
          <span className="text-xs font-medium tracking-widest text-primary">{index}</span>
          <CardTitle className="text-base font-medium text-zinc-300">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-white">{value}</p>
          {tags.length > 0 && (
            <motion.div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
          <motion.button
            type="button"
            className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-black"
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-hidden
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
