import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const NhanVienRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all nhanviens");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM NhanVien");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

  getByMaNV: async (MANV) => {
    logger.info(`Repository: Fetching nhanvien with MANV = ${MANV}`);
    try {
      const db = await pool;
      const [rows] = await db.query(
        "SELECT * FROM NhanVien WHERE MANV = ?",
        [MANV]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      logger.error(
        `Repository Error: getByMaNV failed for MANV ${MANV}`,
        err
      );
      throw err;
    }
  },

    postNhanVien: async (nhanvienData) => {
    logger.info("Repository: Creating nhanvien");
    try {
        const db = await pool;
        const [result] = await db.query(
        "INSERT INTO NhanVien (MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB) VALUES (?, ?, ?, ?, ?, ?)",
        [
            nhanvienData.MANV,
            nhanvienData.HOTEN,
            nhanvienData.NGAYSINH || null,
            nhanvienData.PHAI || null,
            nhanvienData.DIACHI || null,
            nhanvienData.MAPB || null
        ]
        );
        return { MANV: nhanvienData.MANV, ...nhanvienData };
    } catch (err) {
        logger.error("Repository Error: postNhanVien failed", err);
        throw err;
    }
    },

    putNhanVien: async (MANV, nhanvienData) => {
    logger.info(`Repository: Updating nhanvien with MANV ${MANV}`);
    try {
        const db = await pool;
        const [result] = await db.query(
        "UPDATE NhanVien SET HOTEN = ?, NGAYSINH = ?, PHAI = ?, DIACHI = ?, MAPB = ? WHERE MANV = ?",
        [
            nhanvienData.HOTEN,
            nhanvienData.NGAYSINH || null,
            nhanvienData.PHAI || null,
            nhanvienData.DIACHI || null,
            nhanvienData.MAPB || null,
            MANV
        ]
        );
        
        if (result.affectedRows === 0) {
        return null;
        }
        
        return { MANV, ...nhanvienData };
    } catch (err) {
        logger.error(`Repository Error: putNhanVien failed for MANV ${MANV}`, err);
        throw err;
    }
    },

    deleteNhanVien: async (MANV) => {
    logger.info(`Repository: Deleting nhanvien with MANV ${MANV}`);
    try {
        const db = await pool;
        const [result] = await db.query("DELETE FROM NhanVien WHERE MANV = ?", [MANV]);
        return result.affectedRows > 0;
    } catch (err) {
        logger.error(`Repository Error: deleteNhanVien failed for MANV ${MANV}`, err);
        throw err;
    }
    },

    // getByMAPB: async (MAPB) => {
    //     logger.info(`Repository: Fetching nhanvien with MAPB = ${MAPB}`);
    //     try {
    //     const db = await pool;
    //     const [rows] = await db.query(
    //       "SELECT * FROM NhanVien WHERE MAPB = ?",
    //       [MAPB]
    //     );
    //     return rows;
    //     } catch (err) {
    //     logger.error(
    //         `Repository Error: getByMAPB failed for MAPB ${MAPB}`,
    //         err
    //     );
    //     throw err;
    //     }
    // },
};