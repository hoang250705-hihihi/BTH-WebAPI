import { z } from "zod";

export const createDanhMucSchema = z.object({
  MaDanhMuc: z.number({ required_error: "MaDanhMuc is required" }),
  TenDanhMuc: z.string({required_error: "TenDanhMuc is required" }).max(100),
});

export function validateCreateDanhMuc(data) {
  return createDanhMucSchema.parse(data);
}