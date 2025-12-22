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
      logger.error(`Repository Error: deletedanhmuc failed for MaDanhMuc ${MaDanhMuc}`, err);
      throw err;
    }
  },
    postDanhMuc: async (danhmucData) => {
        logger.info("Service: Creating danhmuc");
        const danhmuc = await DanhMucRepository.postDanhMuc(danhmucData);
        return new DanhMucDTO(danhmuc);
    },
    putDanhMuc: async (MaDanhMuc, danhmucData) => {
        logger.info(`Service: Updating danhmuc with MaDanhMuc ${MaDanhMuc}`);
        const danhmuc = await DanhMucRepository.putDanhMuc(MaDanhMuc, danhmucData);

        if (!danhmuc) {
        logger.warn(`Service Warning: danhmuc ${MaDanhMuc} not found`);
        throw new Error("danhmuc not found");
        }

        return new DanhMucDTO(danhmuc);
    },
};

