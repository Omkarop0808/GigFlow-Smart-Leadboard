import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface ServiceCardProps {
  index: string;
  title: string;
  tags: string[];
  delay?: number;
}

export function ServiceCard({ index, title, tags, delay = 0 }: ServiceCardProps) {
  return (
    <motion.article
      className="group relative flex min-h-[280px] flex-col rounded-2xl border border-white/10 bg-zinc-950/80 p-6 transition-colors hover:border-primary/30"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-0 transition group-hover:opacity-100" />
      <span className="text-xs font-medium tracking-widest text-primary">{index}</span>
      <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>
      <motion.button
        type="button"
        className="mt-auto flex h-9 w-9 items-center justify-center rounded-full bg-primary text-black"
        whileHover={{ rotate: 90, scale: 1.1 }}
        aria-hidden
      >
        <Plus className="h-4 w-4" />
      </motion.button>
    </motion.article>
  );
}
