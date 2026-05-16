import { useCallback, useEffect, useState } from "react";
import { getApiErrorMessage, leadsApi } from "@/services/api";
import type { Lead, LeadFilters, PaginationMeta } from "@/types";
import { useDebounce } from "./useDebounce";

export function useLeads(filters: LeadFilters) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(filters.search ?? "", 400);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await leadsApi.list({
        ...filters,
        search: debouncedSearch || undefined,
        status: filters.status || undefined,
        source: filters.source || undefined,
      });
      setLeads(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(getApiErrorMessage(err));
      setLeads([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters.page, filters.status, filters.source, filters.sort, debouncedSearch]);

  useEffect(() => {
    void fetchLeads();
  }, [fetchLeads]);

  return { leads, pagination, isLoading, error, refetch: fetchLeads };
}
