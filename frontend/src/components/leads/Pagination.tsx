import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PaginationMeta } from "@/types";

interface PaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  return (
    <motion.div
      className="flex items-center justify-between gap-4 pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <p className="text-sm text-muted">
        Page {pagination.page} of {pagination.totalPages} · {pagination.total} leads
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!pagination.hasPrevPage}
          onClick={() => onPageChange(pagination.page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!pagination.hasNextPage}
          onClick={() => onPageChange(pagination.page + 1)}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
