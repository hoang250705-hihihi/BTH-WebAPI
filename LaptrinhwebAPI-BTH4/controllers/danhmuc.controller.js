import { DanhMucService } from "../services/danhmuc.service.js";
import { logger } from "../config/logger.js";

export const DanhMucController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /danhmucs");
      const danhmuc = await DanhMucService.getAlldanhmucs();
      res.json(danhmuc);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },
  getByMaDanhMuc: async (req, res) => {
    const MaDanhMuc = +req.params.MaDanhMuc;
    logger.info(`Controller: GET /danhmucs/${MaDanhMuc}`);
    try {
      const danhmuc = await DanhMucService.getdanhmucByMaDanhMuc(MaDanhMuc);
      res.json(danhmuc);
    } catch (err) {
      logger.error(`Controller Error: getByMaDanhMuc failed (${MaDanhMuc})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
