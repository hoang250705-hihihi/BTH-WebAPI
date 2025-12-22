import { sanphamRepository } from "../repositories/sanpham.repository.js";
import { SanPhamDTO } from "../dtos/sanphams/sanpham.dto.js";
import { logger } from "../config/logger.js";

export const sanphamService = {
  getAllsanphams: async () => {
    logger.info("Service: Getting all sanphams");
    const sanphams = await sanphamRepository.getAll();
    return sanphams.map((u) => new SanPhamDTO(u));
  },
  postsanpham: async (sanphamData) => {
    logger.info("Service: Creating sanpham");
    const sanpham = await SanPhamRepository.postSanPham(sanphamData);
    return new SanPhamDTO(sanpham);
  },
  putSanPham: async (Ma, sanphamData) => {
    logger.info(`Service: Updating sanpham with Ma ${Ma}`);
    const sanpham = await SanPhamRepository.putSanPham(Ma, sanphamData);
    
    if (!sanpham) {
      logger.warn(`Service Warning: sanpham ${Ma} not found`);
      throw new Error("sanpham not found");
    }
  
    return new SanPhamDTO(sanpham);
  },
  deletesanpham: async (Ma) => {
    logger.info(`Service: Deleting sanpham with Ma ${Ma}`);
    const deleted = await SanPhamRepository.deletesanpham(Ma);
    
    if (!deleted) {
      logger.warn(`Service Warning: sanpham ${Ma} not found`);
      throw new Error("sanpham not found");
    }
    
    return { message: "sanpham deleted successfully" };
  },
};
