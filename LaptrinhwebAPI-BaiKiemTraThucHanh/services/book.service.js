import { bookRepository } from "../repositories/book.repository.js";
import { logger } from "../config/logger.js";

export const bookService = {
  searchBooks: async (query) => {
    logger.info("Service: Searching books");

    const keyword = query.keyword || "";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const books = await bookRepository.search(keyword, limit, offset);
    const total = await bookRepository.count(keyword);

    return {
      data: books,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
};
