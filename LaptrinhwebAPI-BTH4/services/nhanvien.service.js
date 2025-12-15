import { NhanVienRepository } from "../repositories/nhanvien.repository.js";
import { NhanVienDTO } from "../dtos/nhanviens/nhanvien.dto.js";
import { logger } from "../config/logger.js";

export const NhanVienService = {
  getAllnhanviens: async () => {
    logger.info("Service: Getting all nhanviens");
    const nhanviens = await NhanVienRepository.getAll();
    return nhanviens.map((u) => new NhanVienDTO(u));
  },

  getNhanVienByMaNV: async (MANV) => {
    logger.info(`Service: Getting nhanvien by MANV ${MANV}`);
    const nhanvien = await NhanVienRepository.getByMaNV(MANV);

    if (!nhanvien) {
      logger.warn(`Service Warning: nhanvien ${MANV} not found`);
      throw new Error("NhanVien not found");
    }

    return new NhanVienDTO(nhanvien);
  },

    postNhanVien: async (nhanvienData) => {
    logger.info("Service: Creating nhanvien");
    const nhanvien = await NhanVienRepository.postNhanVien(nhanvienData);
    return new NhanVienDTO(nhanvien);
    },

    putNhanVien: async (MANV, nhanvienData) => {
    logger.info(`Service: Updating nhanvien with MANV ${MANV}`);
    const nhanvien = await NhanVienRepository.putNhanVien(MANV, nhanvienData);
    
    if (!nhanvien) {
        logger.warn(`Service Warning: nhanvien ${MANV} not found`);
        throw new Error("NhanVien not found");
    }

    return new NhanVienDTO(nhanvien);
    },

    deleteNhanVien: async (MANV) => {
    logger.info(`Service: Deleting nhanvien with MANV ${MANV}`);
    const deleted = await NhanVienRepository.deleteNhanVien(MANV);
    
    if (!deleted) {
        logger.warn(`Service Warning: nhanvien ${MANV} not found`);
        throw new Error("NhanVien not found");
    }
    
    return { message: "NhanVien deleted successfully" };
    },

  // getNhanVienByMAPB: async (MAPB) => {
  //   logger.info(`Service: Getting nhanvien by MAPB ${MAPB}`);
  //   const nhanviens = await NhanVienRepository.getByMAPB(MAPB);

  //   if (!nhanviens || nhanviens.length === 0) {
  //     logger.warn(`Service Warning: nhanvien for MAPB ${MAPB} not found`);
  //     throw new Error("NhanVien not found");
  //   }

  //   return nhanviens.map((u) => new NhanVienDTO(u));
  // },
};