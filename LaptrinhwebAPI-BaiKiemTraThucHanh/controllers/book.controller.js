import { bookService } from "../services/book.service.js";
import { logger } from "../config/logger.js";

export const bookController = {
  search: async (req, res) => {
    logger.info("Controller: GET /books/search");

    try {
      const result = await bookService.searchBooks(req.query);
      res.json(result);
    } catch (err) {
      logger.error("Controller Error: search failed", err);
      res.status(500).json({ message: err.message });
    }
  },
};
