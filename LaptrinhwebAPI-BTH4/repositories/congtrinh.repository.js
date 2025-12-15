import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const CongTrinhRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all congtrinhs");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM CongTrinh");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },
};