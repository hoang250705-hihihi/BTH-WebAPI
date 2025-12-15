import { z } from "zod";

export const updateSanPhamSchema = z.object({
  Ten: z.string({ required_error: "Ten is required" }).max(100),
  DonGia: z.number({ required_error: "DonGia is required" }).positive(),
  MaDanhMuc: z.number({ required_error: "MaDanhMuc is required" }),
});

export function validateCreateSanPham(data) {
  return createSanPhamSchema.parse(data);
}