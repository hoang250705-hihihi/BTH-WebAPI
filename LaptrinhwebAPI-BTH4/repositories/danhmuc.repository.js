import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const DanhMucRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all danhmucs");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM DanhMuc");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },
    getByMaDanhMuc: async (MaDanhMuc) => {
    logger.info(`Repository: Fetching danhmucs with MaDanhMuc ${MaDanhMuc}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM DanhMuc WHERE MaDanhMuc = ?", [MaDanhMuc]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaDanhMuc failed for MaDanhMuc ${MaDanhMuc}`, err);
      throw err;
    }
  },

};

