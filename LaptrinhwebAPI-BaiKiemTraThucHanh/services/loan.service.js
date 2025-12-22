import { pool } from "../config/database.js";
import { loanRepository } from "../repositories/loan.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { logger } from "../config/logger.js";

export const loanService = {
  createLoan: async (dto) => {
    logger.info("Service: createLoan");

    // 0. Validate user exists to avoid FK error
    const user = await userRepository.getById(dto.user_id);
    if (!user) {
      throw new Error("User not found");
    }

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // 1. Tạo phiếu mượn
      const loanId = await loanRepository.createLoan(
        conn,
        dto.user_id,
        dto.due_date
      );

      // 2. Xử lý từng sách
      for (const item of dto.items) {
        const book = await loanRepository.getBookForUpdate(
          conn,
          item.book_id
        );

        if (!book) {
          throw new Error(`Book ${item.book_id} not found`);
        }

        if (book.available_copies < item.qty) {
          throw new Error(
            `Book ${item.book_id} not enough available copies`
          );
        }

        await loanRepository.insertLoanItem(
          conn,
          loanId,
          item.book_id,
          item.qty
        );

        await loanRepository.updateAvailableCopies(
          conn,
          item.book_id,
          item.qty
        );
      }

      await conn.commit();
      return { loan_id: loanId, message: "Loan created successfully" };
    } catch (err) {
      await conn.rollback();
      logger.error("Service Error: createLoan failed", err);

      // Improve error message for FK constraint failures
      if (err && err.code === "ER_NO_REFERENCED_ROW_2") {
        throw new Error("Invalid foreign key reference: user or book not found");
      }

      throw err;
    } finally {
      conn.release();
    }
  },

    returnLoan: async (loanId) => {
    logger.info(`Service: returnLoan ${loanId}`);

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const loan = await loanRepository.getLoanByIdForUpdate(conn, loanId);
      if (!loan) {
        throw new Error("Loan not found");
      }

      if (loan.status === "RETURNED") {
        throw new Error("Loan already returned");
      }

      const items = await loanRepository.getLoanItems(conn, loanId);

      // Cộng lại số lượng sách
      for (const item of items) {
        await loanRepository.increaseAvailableCopies(
          conn,
          item.book_id,
          item.qty
        );
      }

      // Xác định trạng thái
      const today = new Date();
      const dueDate = new Date(loan.due_date);
      const status = today > dueDate ? "OVERDUE" : "RETURNED";

      await loanRepository.updateLoanStatus(conn, loanId, status);

      await conn.commit();
      return {
        loan_id: loanId,
        status,
        message: "Books returned successfully",
      };
    } catch (err) {
      await conn.rollback();
      logger.error("Service Error: returnLoan failed", err);
      throw err;
    } finally {
      conn.release();
    }
  },

  
};
