import { CongTrinhRepository } from "../repositories/congtrinh.repository.js";
import { CongTrinhDTO } from "../dtos/congtrinhs/congtrinh.dto.js";
import { logger } from "../config/logger.js";

export const CongTrinhService = {
  getAllCongTrinh: async () => {
    logger.info("Service: Getting all congtrinhs");
    const congtrinhs = await CongTrinhRepository.getAll();
    return congtrinhs.map((ct) => new CongTrinhDTO(ct));
  },
};