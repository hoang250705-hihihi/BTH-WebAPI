import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const bookRepository = {
  search: async (keyword, limit, offset) => {
    logger.info("Repository: Searching books");

    try {
      const db = await pool;
      const key = `%${keyword}%`;

      const [rows] = await db.query(
        `
        SELECT 
          id,
          title,
          author,
          total_copies,
          available_copies
        FROM books
        WHERE title LIKE ? OR author LIKE ?
        LIMIT ? OFFSET ?
        `,
        [key, key, limit, offset]
      );

      return rows;
    } catch (err) {
      logger.error("Repository Error: search failed", err);
      throw err;
    }
  },

  count: async (keyword) => {
    logger.info("Repository: Counting books");

    try {
      const db = await pool;
      const key = `%${keyword}%`;

      const [[result]] = await db.query(
        `
        SELECT COUNT(*) AS total
        FROM books
        WHERE title LIKE ? OR author LIKE ?
        `,
        [key, key]
      );

      return result.total;
    } catch (err) {
      logger.error("Repository Error: count failed", err);
      throw err;
    }
  },
};
