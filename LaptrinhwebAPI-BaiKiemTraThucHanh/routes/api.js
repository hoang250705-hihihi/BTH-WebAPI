import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/authens/auth.validator.js";

import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { POLICIES } from "../utils/constants/policies.js";
import { authorizePolicy } from "../middlewares/policy.middleware.js";

// 👉 IMPORT BOOK CONTROLLER
import { bookController } from "../controllers/book.controller.js";

const router = Router();

// ----------------------- AUTHENTICATION & AUTHORIZATION -------------------------------------
router.post("/auth/register", validate(registerSchema), registerUser);
router.post("/auth/login", validate(loginSchema), loginUser);

// ----------------------- USERS -------------------------------------
router.get(
  "/users",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_ALL),
  userController.getAll
);

router.get(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_SELF),
  userController.getById
);

router.post(
  "/users",
  authenticate,
  authorizePolicy(POLICIES.USER_CREATE),
  userController.create
);

router.put(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_UPDATE),
  userController.update
);

router.delete(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_DELETE),
  userController.delete
);

// ----------------------- BOOKS -------------------------------------
// Ý 2: Tìm sách (title / author + phân trang)
router.get(
  "/books/search",
  authenticate,
  authorizePolicy(POLICIES.BOOK_VIEW),
  bookController.search
);
import { loanController } from "../controllers/loan.controller.js";

router.post(
  "/loans",
  authenticate,
  authorizePolicy(POLICIES.LOAN_CREATE),
  loanController.create
);

router.post(
  "/loans/:id/return",
  authenticate,
  authorizePolicy(POLICIES.LOAN_RETURN),
  loanController.return
);


export default router;
