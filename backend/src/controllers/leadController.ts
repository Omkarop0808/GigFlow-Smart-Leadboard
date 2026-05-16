import { Parser } from "json2csv";
import { Response } from "express";
import { FilterQuery } from "mongoose";
import { AuthRequest } from "../middleware/auth";
import { ILead, Lead } from "../models/Lead";
import { PaginationMeta, SortOrder } from "../types";
import { ApiError } from "../utils/ApiError";
import { sendPaginated, sendSuccess } from "../utils/ApiResponse";

const PAGE_LIMIT = 10;

const buildPagination = (page: number, limit: number, total: number): PaginationMeta => {
  const totalPages = Math.ceil(total / limit) || 1;
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

const buildLeadFilter = (query: AuthRequest["query"]): FilterQuery<ILead> => {
  const filter: FilterQuery<ILead> = {};

  if (query.status) {
    filter.status = query.status;
  }
  if (query.source) {
    filter.source = query.source;
  }
  if (query.search && typeof query.search === "string") {
    const searchRegex = new RegExp(query.search.trim(), "i");
    filter.$or = [{ name: searchRegex }, { email: searchRegex }];
  }

  return filter;
};

export const createLead = async (req: AuthRequest, res: Response) => {
  if (!req.user) throw ApiError.unauthorized();

  const { name, email, status, source } = req.body as {
    name: string;
    email: string;
    status?: string;
    source: string;
  };

  const lead = await Lead.create({
    name,
    email,
    status: status ?? "New",
    source,
    createdBy: req.user.id,
  });

  sendSuccess(res, 201, "Lead created successfully", lead);
};

export const getLeads = async (req: AuthRequest, res: Response) => {
  const page = parseInt((req.query.page as string) ?? "1", 10);
  const sort = ((req.query.sort as string) ?? "latest") as SortOrder;
  const filter = buildLeadFilter(req.query);
  const skip = (page - 1) * PAGE_LIMIT;
  const sortOrder = sort === "oldest" ? 1 : -1;

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(PAGE_LIMIT)
      .populate("createdBy", "name email"),
    Lead.countDocuments(filter),
  ]);

  sendPaginated(
    res,
    "Leads fetched successfully",
    leads,
    buildPagination(page, PAGE_LIMIT, total)
  );
};

export const getLeadById = async (req: AuthRequest, res: Response) => {
  const lead = await Lead.findById(req.params.id).populate("createdBy", "name email");
  if (!lead) {
    throw ApiError.notFound("Lead not found");
  }
  sendSuccess(res, 200, "Lead fetched successfully", lead);
};

export const updateLead = async (req: AuthRequest, res: Response) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("createdBy", "name email");

  if (!lead) {
    throw ApiError.notFound("Lead not found");
  }

  sendSuccess(res, 200, "Lead updated successfully", lead);
};

export const deleteLead = async (req: AuthRequest, res: Response) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) {
    throw ApiError.notFound("Lead not found");
  }
  sendSuccess(res, 200, "Lead deleted successfully", null);
};

export const exportLeadsCsv = async (req: AuthRequest, res: Response) => {
  const filter = buildLeadFilter(req.query);
  const sort = ((req.query.sort as string) ?? "latest") as SortOrder;
  const sortOrder = sort === "oldest" ? 1 : -1;

  const leads = await Lead.find(filter).sort({ createdAt: sortOrder }).lean();

  if (leads.length === 0) {
    throw ApiError.notFound("No leads found to export");
  }

  const fields = ["name", "email", "status", "source", "createdAt"];
  const parser = new Parser({ fields });
  const csv = parser.parse(
    leads.map((l) => ({
      name: l.name,
      email: l.email,
      status: l.status,
      source: l.source,
      createdAt: l.createdAt.toISOString(),
    }))
  );

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename=leads-export-${Date.now()}.csv`);
  res.status(200).send(csv);
};
