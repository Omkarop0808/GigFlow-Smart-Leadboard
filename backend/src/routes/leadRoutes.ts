import { Router } from "express";
import {
  createLead,
  deleteLead,
  exportLeadsCsv,
  getLeadById,
  getLeads,
  updateLead,
} from "../controllers/leadController";
import { authenticate, authorize } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createLeadValidation,
  leadIdValidation,
  listLeadsValidation,
  updateLeadValidation,
} from "../validators/leadValidator";

const router = Router();

router.use(authenticate);

router.get("/", validate(listLeadsValidation), asyncHandler(getLeads));
router.get("/export/csv", validate(listLeadsValidation), asyncHandler(exportLeadsCsv));
router.get("/:id", validate(leadIdValidation), asyncHandler(getLeadById));
router.post("/", validate(createLeadValidation), asyncHandler(createLead));
router.put("/:id", validate(updateLeadValidation), asyncHandler(updateLead));
router.delete(
  "/:id",
  authorize("admin"),
  validate(leadIdValidation),
  asyncHandler(deleteLead)
);

export default router;
