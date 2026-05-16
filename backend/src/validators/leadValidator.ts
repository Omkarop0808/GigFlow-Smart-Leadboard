import { body, param, query } from "express-validator";

const leadStatuses = ["New", "Contacted", "Qualified", "Lost"];
const leadSources = ["Website", "Instagram", "Referral"];

export const createLeadValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("status")
    .optional()
    .isIn(leadStatuses)
    .withMessage(`Status must be one of: ${leadStatuses.join(", ")}`),
  body("source")
    .isIn(leadSources)
    .withMessage(`Source must be one of: ${leadSources.join(", ")}`),
];

export const updateLeadValidation = [
  param("id").isMongoId().withMessage("Invalid lead ID"),
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("status")
    .optional()
    .isIn(leadStatuses)
    .withMessage(`Status must be one of: ${leadStatuses.join(", ")}`),
  body("source")
    .optional()
    .isIn(leadSources)
    .withMessage(`Source must be one of: ${leadSources.join(", ")}`),
];

export const leadIdValidation = [
  param("id").isMongoId().withMessage("Invalid lead ID"),
];

const optionalQuery = { values: "falsy" } as const;

export const listLeadsValidation = [
  query("page")
    .optional(optionalQuery)
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("status")
    .optional(optionalQuery)
    .isIn(leadStatuses)
    .withMessage(`Status must be one of: ${leadStatuses.join(", ")}`),
  query("source")
    .optional(optionalQuery)
    .isIn(leadSources)
    .withMessage(`Source must be one of: ${leadSources.join(", ")}`),
  query("search").optional(optionalQuery).isString().trim(),
  query("sort")
    .optional(optionalQuery)
    .isIn(["latest", "oldest"])
    .withMessage("Sort must be latest or oldest"),
];
