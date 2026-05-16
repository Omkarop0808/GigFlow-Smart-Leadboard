import { Router } from "express";
import { getMe, login, register } from "../controllers/authController";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../utils/asyncHandler";
import { loginValidation, registerValidation } from "../validators/authValidator";

const router = Router();

router.post("/register", validate(registerValidation), asyncHandler(register));
router.post("/login", validate(loginValidation), asyncHandler(login));
router.get("/me", authenticate, asyncHandler(getMe));

export default router;
