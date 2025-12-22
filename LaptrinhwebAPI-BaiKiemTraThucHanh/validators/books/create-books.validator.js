import { z } from "zod";
export const createBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  total_copies: z.coerce.number().int().min(0).default(1),
  available_copies: z.coerce.number().int().min(0).default(1)
});

export function validateCreateBook(data) {
  return createbookSchema.parse(data);
}