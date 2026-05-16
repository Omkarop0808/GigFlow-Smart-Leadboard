import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LeadFilters, LeadSource, LeadStatus, SortOrder } from "@/types";

interface LeadFiltersBarProps {
  filters: LeadFilters;
  onChange: (filters: LeadFilters) => void;
}

export function LeadFiltersBar({ filters, onChange }: LeadFiltersBarProps) {
  return (
    <motion.div
      className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:grid-cols-2 lg:grid-cols-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div className="relative lg:col-span-2" whileFocus={{ scale: 1.01 }}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          placeholder="Search by name or email..."
          className="pl-10"
          value={filters.search ?? ""}
          onChange={(e) => onChange({ ...filters, search: e.target.value, page: 1 })}
        />
      </motion.div>

      <Select
        value={filters.status || "all"}
        onValueChange={(v) =>
          onChange({ ...filters, status: v === "all" ? "" : (v as LeadStatus), page: 1 })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {(["New", "Contacted", "Qualified", "Lost"] as LeadStatus[]).map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.source || "all"}
        onValueChange={(v) =>
          onChange({ ...filters, source: v === "all" ? "" : (v as LeadSource), page: 1 })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          {(["Website", "Instagram", "Referral"] as LeadSource[]).map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.sort ?? "latest"}
        onValueChange={(v) => onChange({ ...filters, sort: v as SortOrder, page: 1 })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
}
