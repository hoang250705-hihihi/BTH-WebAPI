import { sanphamService } from "../services/sanpham.service.js";
import { logger } from "../config/logger.js";

export const sanphamController = {
  getAllsanphams: async (req, res) => {
    try {
      logger.info("Controller: GET /sanphams");
      const sanphams = await sanphamService.getAllsanphams();
      res.json(sanphams);
    } catch (err) {
      logger.error("Controller Error: getAllsanphams failed", err);
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
};
