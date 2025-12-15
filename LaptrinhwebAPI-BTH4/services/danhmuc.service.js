import { DanhMucRepository } from "../repositories/danhmuc.repository.js";
import { DanhMucDTO } from "../dtos/danhmucs/danhmuc.dto.js";
import { logger } from "../config/logger.js";

export const DanhMucService = {
  getAlldanhmucs: async () => {
    logger.info("Service: Getting all danhmucs");
    const danhmucs = await DanhMucRepository.getAll();
    return danhmucs.map((u) => new DanhMucDTO(u));
  },
  getdanhmucByMaDanhMuc: async (MaDanhMuc) => {
    logger.info(`Service: Getting danhmuc by MaDanhMuc ${MaDanhMuc}`);
    const danhmuc = await DanhMucRepository.getByMaDanhMuc(MaDanhMuc);
    if (!danhmuc) {
      logger.warn(`Service Warning: danhmuc ${MaDanhMuc} not found`);
      throw new Error("danhmuc not found");
    }
    return new DanhMucDTO(danhmuc);
    },
};