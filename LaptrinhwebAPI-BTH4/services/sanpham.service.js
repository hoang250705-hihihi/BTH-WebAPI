import { SanPhamRepository } from "../repositories/sanpham.repository.js";
import { SanPhamDTO } from "../dtos/sanphams/sanpham.dto.js";
import { logger } from "../config/logger.js";

export const SanPhamService = {
  getAllsanphams: async () => {
    logger.info("Service: Getting all sanphams");
    const sanphams = await SanPhamRepository.getAll();
    return sanphams.map((u) => new SanPhamDTO(u));
  },

  getsanphamByMa: async (Ma) => {
    logger.info(`Service: Getting sanpham by Ma ${Ma}`);
    const sanpham = await SanPhamRepository.getByMa(Ma);

    if (!sanpham) {
      logger.warn(`Service Warning: sanpham ${Ma} not found`);
      throw new Error("sanpham ko ton tai");
    }

    return new SanPhamDTO(sanpham);
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

  getsanphamByTen: async (Ten) => {
    logger.info(`Service: Getting sanpham by Ten ${Ten}`);
    const sanphams = await SanPhamRepository.getByTen(Ten);
    return sanphams.map((sp) => new SanPhamDTO(sp));
  },

  phantrang: async (page = 1, size = 10, sort = "donGia,asc") => {
    logger.info(`Service: Getting paginated sanphams - page: ${page}, size: ${size}, sort: ${sort}`);
    
    // Validate page và size
    page = parseInt(page) || 1;
    size = parseInt(size) || 10;
    
    if (page < 1) page = 1;
    if (size < 1 || size > 100) size = 10;
    
    const result = await SanPhamRepository.phantrang(page, size, sort);
    
    return {
      data: result.data.map((sp) => new SanPhamDTO(sp)),
      pagination: result.pagination
    };
  },

  thongkeDanhMuc: async () => {
    logger.info("Service: Getting sanpham statistics by danhmuc");
    const result = await SanPhamRepository.thongkeDanhMuc();
    return result;
  },
  
};