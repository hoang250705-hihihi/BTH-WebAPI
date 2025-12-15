import { z } from "zod";

export const createNhanVienSchema = z.object({
  MANV: z.string({ required_error: "MANV is required" }).max(20),
  HOTEN: z.string({ required_error: "HOTEN is required" }).max(100),
  NGAYSINH: z.string().optional(), 
  PHAI: z.string().max(10).optional(),
  DIACHI: z.string().max(200).optional(),
  MAPB: z.string().max(20).optional(),
});

export function validateCreateNhanVien(data) {
  return createNhanVienSchema.parse(data);
}
