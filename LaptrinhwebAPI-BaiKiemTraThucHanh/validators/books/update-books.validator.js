import { z } from "zod";

export const updateBookSchema = z.object({
  title: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  total_copies: z.coerce.number().int().min(0).optional(),
  available_copies: z.coerce.number().int().min(0).optional()
});

export function validateUpdateBook(data) {
  return updateBookSchema.parse(data);
}