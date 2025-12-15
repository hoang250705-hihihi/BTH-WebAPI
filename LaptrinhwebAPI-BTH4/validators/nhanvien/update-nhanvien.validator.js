import { z } from "zod";

export const updateNhanVienSchema = z.object({
  HOTEN: z.string({ required_error: "HOTEN is required" }).max(100),
  NGAYSINH: z.string().optional(),
  PHAI: z.string().max(10).optional(),
  DIACHI: z.string().max(200).optional(),
  MAPB: z.string().max(20).optional(),
});

export function validateUpdateNhanVien(data) {
  return updateNhanVienSchema.parse(data);
}
