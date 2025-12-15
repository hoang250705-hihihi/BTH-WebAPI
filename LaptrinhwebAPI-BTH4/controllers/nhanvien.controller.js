import { NhanVienService } from "../services/nhanvien.service.js";
import { logger } from "../config/logger.js";


export const NhanVienController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /nhanviens");
      const nhanvien = await NhanVienService.getAllnhanviens();
      res.json(nhanvien);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

    getByMaNV: async (req, res) => {
    try {
        const { MaNV } = req.params;   
        logger.info(`Controller: GET /nhanviens/${MaNV}`);

        const nhanvien = await NhanVienService.getNhanVienByMaNV(MaNV);
        res.status(200).json(nhanvien);
    } catch (err) {
        logger.error("Controller Error: getByMaNV failed", err);

        if (err.message === "NhanVien not found") {
        return res.status(404).json({ message: err.message });
        }

        res.status(500).json({ message: err.message });
    }
    },

    postNhanVien: async (req, res) => {
    logger.info("Controller: POST /nhanviens");
    try {
        const nhanvien = await NhanVienService.postNhanVien(req.body);
        res.status(201).json(nhanvien);
    } catch (err) {
        logger.error("Controller Error: postNhanVien failed", err);
        res.status(500).json({ message: err.message });
    }
    },

    putNhanVien: async (req, res) => {
    const MaNV = req.params.MaNV;
    logger.info(`Controller: PUT /nhanviens/${MaNV}`);
    try {
        const nhanvien = await NhanVienService.putNhanVien(MaNV, req.body);
        res.json(nhanvien);
    } catch (err) {
        logger.error(`Controller Error: putNhanVien failed (${MaNV})`, err);
        res.status(404).json({ message: err.message });
    }
    },

    deleteNhanVien: async (req, res) => {
    const MaNV = req.params.MaNV;
    logger.info(`Controller: DELETE /nhanviens/${MaNV}`);
    try {
        const result = await NhanVienService.deleteNhanVien(MaNV);
        res.json(result);
    } catch (err) {
        logger.error(`Controller Error: deleteNhanVien failed (${MaNV})`, err);
        res.status(404).json({ message: err.message });
    }
    },

    // getByMAPB: async (req, res) => {
    // try {
    //     const { MAPB } = req.params;   
    //     logger.info(`Controller: GET /nhanviens/${MAPB}`);

    //     const nhanvien = await NhanVienService.getNhanVienByMAPB(MAPB);
    //     res.status(200).json(nhanvien);
    // } catch (err) {
    //     logger.error("Controller Error: getByMAPB failed", err);

    //     if (err.message === "NhanVien not found") {
    //     return res.status(404).json({ message: err.message });
    //     }

    //     res.status(500).json({ message: err.message });
    // }
    // },
};