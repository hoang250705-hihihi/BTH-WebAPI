import { PhongBanRepository } from "../repositories/phongban.repository.js";
import { PhongBanDTO } from "../dtos/phongbans/phongban.dto.js";
import { logger } from "../config/logger.js";

export const PhongBanService = {
  getAllphongbans: async () => {
    logger.info("Service: Getting all phongbans");
    const phongbans = await PhongBanRepository.getAll();
    return phongbans.map((u) => new PhongBanDTO(u));
  },
};