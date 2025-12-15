import { SanPhamService } from "../services/sanpham.service.js";
import { logger } from "../config/logger.js";

export const SanPhamController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /sanphams");
      const sanpham = await SanPhamService.getAllsanphams();
      res.json(sanpham);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },
  getByMa: async (req, res) => {
    const Ma = +req.params.Ma;
    logger.info(`Controller: GET /sanphams/${Ma}`);
    try {
      const sanpham = await SanPhamService.getsanphamByMa(Ma);
      res.json(sanpham);
    } catch (err) {
      logger.error(`Controller Error: getByMa failed (${Ma})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  postSanPham: async (req, res) => {
  logger.info("Controller: POST /sanphams");
  try {
      const sanpham = await SanPhamService.postsanpham(req.body);
      res.status(201).json(sanpham);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  putSanPham: async (req, res) => {
    const Ma = +req.params.Ma;
    logger.info(`Controller: PUT /sanphams/${Ma}`);
    try {
      const sanpham = await SanPhamService.putSanPham(Ma, req.body);
      res.json(sanpham);
    } catch (err) {
      logger.error(`Controller Error: putSanPham failed (${Ma})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  deletesanpham: async (req, res) => {
    const Ma = +req.params.Ma;
    logger.info(`Controller: DELETE /sanphams/${Ma}`);
    try {
      const result = await SanPhamService.deletesanpham(Ma);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: deletesanpham failed (${Ma})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  getByTen: async (req, res) => {
    const Ten = req.query.ten || "";
    logger.info(`Controller: GET /sanphams/search?ten=${Ten}`);
    try {
      const sanphams = await SanPhamService.getsanphamByTen(Ten);
      res.json(sanphams);
    } catch (err) {
      logger.error(`Controller Error: getByTen failed`, err);
      res.status(500).json({ message: err.message });
    }
  },

  phantrang: async (req, res) => {
    try {
      const page = req.query.page || 1;
      const size = req.query.size || 10;
      const sort = req.query.sort || "donGia,asc";
      
      logger.info(`Controller: GET /sanphams/phantrang?page=${page}&size=${size}&sort=${sort}`);
      
      const result = await SanPhamService.phantrang(page, size, sort);
      res.json(result);
    } catch (err) {
      logger.error("Controller Error: phantrang failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  thongkeDanhMuc: async (req, res) => {
    logger.info("Controller: GET /thongke/sanpham-danhmuc");
    try {
      const result = await SanPhamService.thongkeDanhMuc();
      res.json(result);
    } catch (err) {
      logger.error("Controller Error: thongkeDanhMuc failed", err);
      res.status(500).json({ message: err.message });
    }
  },
};
