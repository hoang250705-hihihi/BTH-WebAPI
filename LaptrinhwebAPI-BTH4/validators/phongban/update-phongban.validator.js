import { z } from "zod";

export const updatePhongBanSchema = z.object({
  TENPB: z.string({ required_error: "TENPB is required" }).max(100),
});

export function validateUpdatePhongBan(data) {
  return updatePhongBanSchema.parse(data);
}
