import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { hanghoaController } from "../controllers/hanghoa.controller.js";
import { sanphamController } from "../controllers/sanpham.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/authens/auth.validator.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { POLICIES } from "../utils/constants/policies.js";
import { authorizePolicy } from "../middlewares/policy.middleware.js";

const router = Router();

// ----------------------- AUTHENTICATION & AUTHORIZATION -------------------------------------
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

// ----------------------- USERS -------------------------------------
// Admin: xem tất cả users
router.get(
  "/users",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_ALL),
  userController.getAll
);

// User hoặc Admin: xem chính mình
router.get(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_SELF),
  userController.getById
);

// Tạo user mới (chỉ Admin)
router.post(
  "/users",
  authenticate,
  authorizePolicy(POLICIES.USER_CREATE),
  userController.create
);

// Cập nhật user (Admin hoặc chính mình)
router.put(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_UPDATE),
  userController.update
);

// Xóa user (chỉ Admin)
router.delete(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_DELETE),
  userController.delete
);
// ----------------------- SANPHAMS -------------------------------------
router.get(
  "/sanphams",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_ALL),
  sanphamController.getAllsanphams
);
router.get(
  "/sanphams/:ma",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_SELF),
  sanphamController.getById
);
router.post(
  "/sanphams",
  authenticate,
  authorizePolicy(POLICIES.USER_CREATE),
  sanphamController.create
);
router.put(
  "/sanphams/:ma",
  authenticate,
  authorizePolicy(POLICIES.USER_UPDATE),
  sanphamController.update
);
router.delete(
  "/sanphams/:ma",
  authenticate,
  authorizePolicy(POLICIES.USER_DELETE),
  sanphamController.delete
);
// ----------------------- DANHMUCS -------------------------------------
router.get(
  "/danhmucs",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_ALL),
  danhmucController.getAll
);
router.get(
  "/danhmucs/:MaDanhMuc",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_SELF),
  danhmucController.getByMaDanhMuc
);
router.post(
  "/danhmucs",
  authenticate,
  authorizePolicy(POLICIES.USER_CREATE),
  danhmucController.create
);
router.put(
  "/danhmucs/:MaDanhMuc",
  authenticate,
  authorizePolicy(POLICIES.USER_UPDATE),
  danhmucController.update
);
router.delete(
  "/danhmucs/:MaDanhMuc",
  authenticate,
  authorizePolicy(POLICIES.USER_DELETE),
  danhmucController.delete
);

export default router;
