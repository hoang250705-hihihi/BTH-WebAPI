import { PhongBanService } from "../services/phongban.service.js";
import { logger } from "../config/logger.js";

export const PhongBanController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /phongbans");
      const phongban = await PhongBanService.getAllphongbans();
      res.json(phongban);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },
};