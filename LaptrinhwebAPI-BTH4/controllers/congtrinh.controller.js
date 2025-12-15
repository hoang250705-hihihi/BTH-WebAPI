import { CongTrinhService } from "../services/congtrinh.service.js";
import { logger } from "../config/logger.js";

export const CongTrinhController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /congtrinhs");
      const congtrinh = await CongTrinhService.getAllCongTrinh();
      res.json(congtrinh);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },
};