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
  deletedanhmuc: async (req, res) => {
    const MaDanhMuc = +req.params.MaDanhMuc;
    logger.info(`Controller: DELETE /danhmucs/${MaDanhMuc}`);
    try {
      await DanhMucService.deletedanhmuc(MaDanhMuc);
      res.json({ message: "DanhMuc deleted successfully" });
    } catch (err) {
      logger.error(`Controller Error: deletedanhmuc failed (${MaDanhMuc})`, err);
      res.status(500).json({ message: err.message });
    }
  },
    postDanhMuc: async (req, res) => {
    logger.info("Controller: POST /danhmucs");
    try {
        const danhmuc = await DanhMucService.postDanhMuc(req.body);
        res.status(201).json(danhmuc);
        } catch (err) {
        logger.error("Controller Error: create failed", err);
        res.status(500).json({ message: err.message });
        }
    },
    putDanhMuc: async (req, res) => {
        const MaDanhMuc = +req.params.MaDanhMuc;
        logger.info(`Controller: PUT /danhmucs/${MaDanhMuc}`);
        try {
        const danhmuc = await DanhMucService.putDanhMuc(MaDanhMuc, req.body);
        res.json(danhmuc);
        } catch (err) {
        logger.error(`Controller Error: putDanhMuc failed (${MaDanhMuc})`, err);
        res.status(404).json({ message: err.message });
        }
    },
};