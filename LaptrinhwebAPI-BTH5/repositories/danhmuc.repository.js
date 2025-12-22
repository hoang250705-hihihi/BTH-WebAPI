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
    deletedanhmuc: async (MaDanhMuc) => {
    logger.info(`Repository: Deleting danhmuc with MaDanhMuc ${MaDanhMuc}`);
    try {
      const db = await pool;
      const [result] = await db.query("DELETE FROM DanhMuc WHERE MaDanhMuc = ?", [MaDanhMuc]);
      return result;
    } catch (err) {
      logger.error(`Repository Error: deletesanpham failed for MaDanhMuc ${MaDanhMuc}`, err);
      throw err;
    }
  },
    postDanhMuc: async (danhmucData) => {
        logger.info("Repository: Creating danhmuc");
        try {
            const db = await pool;
            const [result] = await db.query(
            "INSERT INTO DanhMuc (TenDanhMuc) VALUES (?)",
            [danhmucData.TenDanhMuc]
            );
            return { MaDanhMuc: result.insertId, ...danhmucData };
        } catch (err) {
            logger.error("Repository Error: create failed", err);
            throw err;
        }
    },
  putDanhMuc: async (MaDanhMuc, danhmucData) => {
    logger.info(`Repository: Updating danhmuc with MaDanhMuc ${MaDanhMuc}`);
    try {
      const db = await pool;
      const [result] = await db.query(
        "UPDATE DanhMuc SET TenDanhMuc = ? WHERE MaDanhMuc = ?",
        [danhmucData.TenDanhMuc, MaDanhMuc]
      );
      
      if (result.affectedRows === 0) {
        return null;
      }
      
      return { MaDanhMuc, ...danhmucData };
    } catch (err) {
      logger.error(`Repository Error: putDanhMuc failed for MaDanhMuc ${MaDanhMuc}`, err);
      throw err;
    }
  },
};

