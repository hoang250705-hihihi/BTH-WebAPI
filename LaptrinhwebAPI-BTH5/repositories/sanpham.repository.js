import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const sanphamRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all sanphams");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM SanPham");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },
  getByMa: async (Ma) => {
    logger.info(`Repository: Fetching sanpham with Ma ${Ma}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM SanPham WHERE Ma = ?", [Ma]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMa failed for Ma ${Ma}`, err);
      throw err;
    }
  },
  postSanPham: async (sanphamData) => {
    logger.info("Repository: Creating sanpham");
    try {
      const db = await pool;
      const [result] = await db.query(
        "INSERT INTO SanPham (Ten, DonGia, MaDanhMuc) VALUES (?, ?, ?)",
        [sanphamData.Ten, sanphamData.DonGia, sanphamData.MaDanhMuc]
      );
      return { Ma: result.insertId, ...sanphamData };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },
  putSanPham: async (Ma, sanphamData) => {
    logger.info(`Repository: Updating sanpham with Ma ${Ma}`);
    try {
      const db = await pool;
      const [result] = await db.query(
        "UPDATE SanPham SET Ten = ?, DonGia = ?, MaDanhMuc = ? WHERE Ma = ?",
        [sanphamData.Ten, sanphamData.DonGia, sanphamData.MaDanhMuc, Ma]
      );
      
      if (result.affectedRows === 0) {
        return null;
      }
      
      return { Ma, ...sanphamData };
    } catch (err) {
      logger.error(`Repository Error: putSanPham failed for Ma ${Ma}`, err);
      throw err;
    }
  },
  deletesanpham: async (Ma) => {
    logger.info(`Repository: Deleting sanpham with Ma ${Ma}`);
    try {
      const db = await pool;
      const [result] = await db.query("DELETE FROM SanPham WHERE Ma = ?", [Ma]);
      return result.affectedRows > 0;
    } catch (err) {
      logger.error(`Repository Error: deletesanpham failed for Ma ${Ma}`, err);
      throw err;
    }
  },
};
