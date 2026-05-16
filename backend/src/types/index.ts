export type UserRole = "admin" | "sales";

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";

export type LeadSource = "Website" | "Instagram" | "Referral";

export type SortOrder = "latest" | "oldest";

export interface JwtPayload {
  userId: string;
  role: UserRole;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiPaginatedResponse<T> {
  success: true;
  message: string;
  data: T[];
  pagination: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
