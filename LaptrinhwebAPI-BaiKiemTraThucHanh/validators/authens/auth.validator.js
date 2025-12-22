import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  // Accept either a role name (librarian/member) or a direct role_id
  role: z.enum(["librarian", "member"]).optional(),
  role_id: z.number().int().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});
