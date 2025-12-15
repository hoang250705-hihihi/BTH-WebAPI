import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const SanPhamRepository = {
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

  getByTen: async (Ten) => {
    logger.info(`Repository: Fetching sanpham with Ten ${Ten}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM SanPham WHERE Ten LIKE ?", [`%${Ten}%`]);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getByTen failed for Ten ${Ten}`, err);
      throw err;
    }
  },

  phantrang: async (page, size, sort) => {
    logger.info(`Repository: Fetching sanphams with pagination - page: ${page}, size: ${size}, sort: ${sort}`);
    try {
      const db = await pool;
      
      // Tính offset
      const offset = (page - 1) * size;
      
      // Xử lý sort
      let orderBy = "DonGia ASC";
      if (sort) {
        const [field, direction] = sort.split(",");
        if (field === "donGia" && (direction === "asc" || direction === "desc")) {
          orderBy = `DonGia ${direction.toUpperCase()}`;
        }
      }
      
      // Query với phân trang và sắp xếp
      const query = `SELECT * FROM SanPham ORDER BY ${orderBy} LIMIT ? OFFSET ?`;
      const [rows] = await db.query(query, [size, offset]);
      
      // Đếm tổng số sản phẩm
      const [countResult] = await db.query("SELECT COUNT(*) as total FROM SanPham");
      const total = countResult[0].total;
      
      return {
        data: rows,
        pagination: {
          currentPage: page,
          pageSize: size,
          totalItems: total,
          totalPages: Math.ceil(total / size)
        }
      };
    } catch (err) {
      logger.error("Repository Error: phantrang failed", err);
      throw err;
    }
  },

  thongkeDanhMuc: async () => {
    logger.info("Repository: Fetching sanpham statistics by danhmuc");
    try {
      const db = await pool;
      const query = `
        SELECT 
          dm.MaDanhMuc,
          dm.TenDanhMuc,
          COUNT(sp.Ma) as SoLuongSanPham
        FROM DanhMuc dm
        LEFT JOIN SanPham sp ON dm.MaDanhMuc = sp.MaDanhMuc
        GROUP BY dm.MaDanhMuc, dm.TenDanhMuc
        ORDER BY dm.MaDanhMuc
      `;
      const [rows] = await db.query(query);
      return rows;
    } catch (err) {
      logger.error("Repository Error: thongkeDanhMuc failed", err);
      throw err;
    }
  },
};

