import axios from "axios";
import type { ApiResponse, Lead, LeadFilters, PaginatedLeadsResponse, User } from "@/types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

/** Omit empty filter values so the API does not receive status=&source= */
export function buildLeadQueryParams(filters: LeadFilters): Record<string, string | number> {
  const params: Record<string, string | number> = {
    page: filters.page ?? 1,
    sort: filters.sort ?? "latest",
  };
  if (filters.status) params.status = filters.status;
  if (filters.source) params.source = filters.source;
  if (filters.search?.trim()) params.search = filters.search.trim();
  return params;
}

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiErrorBody {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorBody | undefined;
    return data?.message ?? error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
};

export const authApi = {
  register: (payload: { name: string; email: string; password: string }) =>
    api.post<ApiResponse<{ user: User; token: string }>>("/auth/register", payload),
  login: (payload: { email: string; password: string }) =>
    api.post<ApiResponse<{ user: User; token: string }>>("/auth/login", payload),
  me: () => api.get<ApiResponse<User>>("/auth/me"),
};

export const leadsApi = {
  list: (filters: LeadFilters) =>
    api.get<PaginatedLeadsResponse>("/leads", { params: buildLeadQueryParams(filters) }),
  getById: (id: string) => api.get<ApiResponse<Lead>>(`/leads/${id}`),
  create: (payload: Omit<Lead, "_id" | "createdAt" | "updatedAt" | "createdBy">) =>
    api.post<ApiResponse<Lead>>("/leads", payload),
  update: (id: string, payload: Partial<Lead>) =>
    api.put<ApiResponse<Lead>>(`/leads/${id}`, payload),
  delete: (id: string) => api.delete<ApiResponse<null>>(`/leads/${id}`),
  exportCsv: (filters: LeadFilters) =>
    api.get("/leads/export/csv", {
      params: buildLeadQueryParams(filters),
      responseType: "blob",
    }),
};
