import { loanService } from "../services/loan.service.js";
import { logger } from "../config/logger.js";

export const loanController = {
  // =================== Ý 3: TẠO PHIẾU MƯỢN ===================
  create: async (req, res) => {
    logger.info("Controller: POST /loans");

    try {
      const payload = { ...req.body };

      // Ưu tiên user đăng nhập
      payload.user_id =
        req.user && req.user.id ? req.user.id : req.body.user_id;

      if (!payload.user_id) {
        return res.status(400).json({ message: "Missing user_id" });
      }

      if (!Array.isArray(payload.items) || payload.items.length === 0) {
        return res.status(400).json({ message: "Missing or empty items" });
      }

      const result = await loanService.createLoan(payload);
      res.status(201).json(result);
    } catch (err) {
      logger.error("Controller Error: create loan failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  // =================== Ý 4: TRẢ SÁCH ===================
  return: async (req, res) => {
    const loanId = +req.params.id;
    logger.info(`Controller: POST /loans/${loanId}/return`);

    try {
      const result = await loanService.returnLoan(loanId);
      res.json(result);
    } catch (err) {
      logger.error("Controller Error: return loan failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  
};
