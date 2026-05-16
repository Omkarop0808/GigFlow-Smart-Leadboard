import { motion } from "framer-motion";
import { Download, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LeadFiltersBar } from "@/components/leads/LeadFiltersBar";
import { LeadsTable } from "@/components/leads/LeadsTable";
import { Pagination } from "@/components/leads/Pagination";
import { StatCard } from "@/components/leads/StatCard";
import { Button } from "@/components/ui/button";
import { useLeads } from "@/hooks/useLeads";
import { getApiErrorMessage, leadsApi } from "@/services/api";
import type { LeadFilters } from "@/types";

export function DashboardPage() {
  const [filters, setFilters] = useState<LeadFilters>({
    page: 1,
    sort: "latest",
    status: "",
    source: "",
    search: "",
  });
  const [exporting, setExporting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const { leads, pagination, isLoading, error, refetch } = useLeads(filters);

  const stats = useMemo(() => {
    const byStatus = leads.reduce(
      (acc, l) => {
        acc[l.status] = (acc[l.status] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    return {
      total: pagination?.total ?? leads.length,
      qualified: byStatus.Qualified ?? 0,
      new: byStatus.New ?? 0,
    };
  }, [leads, pagination]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    try {
      await leadsApi.delete(id);
      void refetch();
    } catch (err) {
      setActionError(getApiErrorMessage(err));
    }
  };

  const handleExport = async () => {
    setExporting(true);
    setActionError(null);
    try {
      const { data } = await leadsApi.exportCsv({
        status: filters.status,
        source: filters.source,
        search: filters.search,
        sort: filters.sort,
      });
      const url = window.URL.createObjectURL(new Blob([data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-export-${Date.now()}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setActionError(getApiErrorMessage(err));
    } finally {
      setExporting(false);
    }
  };

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard index="01" title="Total Leads" value={stats.total} tags={["Pipeline", "All sources"]} />
        <StatCard index="02" title="Qualified" value={stats.qualified} tags={["Ready", "Sales"]} />
        <StatCard index="03" title="New (page)" value={stats.new} tags={["Fresh", "Follow-up"]} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <LeadFiltersBar filters={filters} onChange={setFilters} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/dashboard/leads/new" className="gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/20 text-xs">
              »
            </span>
            <Plus className="h-4 w-4" />
            Create Lead
          </Link>
        </Button>
        <Button variant="outline" onClick={handleExport} disabled={exporting}>
          <Download className="mr-2 h-4 w-4" />
          {exporting ? "Exporting..." : "Export CSV"}
        </Button>
      </div>

      {(error || actionError) && (
        <motion.p
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-red-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error ?? actionError}
        </motion.p>
      )}

      <LeadsTable leads={leads} isLoading={isLoading} onDelete={handleDelete} />

      {pagination && (
        <Pagination
          pagination={pagination}
          onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
        />
      )}
    </motion.div>
  );
}
