import { motion } from "framer-motion";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge, sourceToBadgeVariant, statusToBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import type { Lead } from "@/types";

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export function LeadsTable({ leads, isLoading, onDelete }: LeadsTableProps) {
  const { user } = useAuth();

  if (isLoading) {
    return (
      <motion.div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </motion.div>
    );
  }

  if (leads.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20 text-center"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="mb-4 h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(255,140,0,0.2),_transparent_70%)]" />
        <h3 className="text-xl font-semibold text-white">No leads found</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Adjust your filters or create a new lead to get started.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="overflow-x-auto rounded-2xl border border-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-white/10 bg-white/[0.03]">
          <tr>
            {["Name", "Email", "Status", "Source", "Created", "Actions"].map((h) => (
              <th key={h} className="px-4 py-3 font-medium text-zinc-400">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <motion.tr
              key={lead._id}
              className="border-b border-white/5 hover:bg-white/[0.02]"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <td className="px-4 py-3 font-medium text-white">{lead.name}</td>
              <td className="px-4 py-3 text-muted">{lead.email}</td>
              <td className="px-4 py-3">
                <Badge variant={statusToBadgeVariant(lead.status)}>{lead.status}</Badge>
              </td>
              <td className="px-4 py-3">
                <Badge variant={sourceToBadgeVariant(lead.source)}>{lead.source}</Badge>
              </td>
              <td className="px-4 py-3 text-muted">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/dashboard/leads/${lead._id}`} aria-label="View lead">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/dashboard/leads/${lead._id}/edit`} aria-label="Edit lead">
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  {user?.role === "admin" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(lead._id)}
                      aria-label="Delete lead"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
