import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const loanRepository = {
  // ======================= Ý 3: TẠO PHIẾU MƯỢN =======================
  createLoan: async (conn, user_id, due_date) => {
    logger.info("Repository: createLoan");
    const [result] = await conn.query(
      `
      INSERT INTO loans (user_id, loan_date, due_date, status)
      VALUES (?, CURDATE(), ?, 'BORROWED')
      `,
      [user_id, due_date]
    );
    return result.insertId;
  },

  getBookForUpdate: async (conn, book_id) => {
    const [[book]] = await conn.query(
      `
      SELECT id, available_copies
      FROM books
      WHERE id = ?
      FOR UPDATE
      `,
      [book_id]
    );
    return book;
  },

  insertLoanItem: async (conn, loan_id, book_id, qty) => {
    await conn.query(
      `
      INSERT INTO loan_items (loan_id, book_id, qty)
      VALUES (?, ?, ?)
      `,
      [loan_id, book_id, qty]
    );
  },

  updateAvailableCopies: async (conn, book_id, qty) => {
    await conn.query(
      `
      UPDATE books
      SET available_copies = available_copies - ?
      WHERE id = ?
      `,
      [qty, book_id]
    );
  },

  // ======================= Ý 4: TRẢ SÁCH =======================
  getLoanByIdForUpdate: async (conn, loan_id) => {
    logger.info("Repository: getLoanByIdForUpdate");
    const [[loan]] = await conn.query(
      `
      SELECT id, due_date, status
      FROM loans
      WHERE id = ?
      FOR UPDATE
      `,
      [loan_id]
    );
    return loan;
  },

  getLoanItems: async (conn, loan_id) => {
    logger.info("Repository: getLoanItems");
    const [items] = await conn.query(
      `
      SELECT book_id, qty
      FROM loan_items
      WHERE loan_id = ?
      `,
      [loan_id]
    );
    return items;
  },

  increaseAvailableCopies: async (conn, book_id, qty) => {
    await conn.query(
      `
      UPDATE books
      SET available_copies = available_copies + ?
      WHERE id = ?
      `,
      [qty, book_id]
    );
  },

  updateLoanStatus: async (conn, loan_id, status) => {
    await conn.query(
      `
      UPDATE loans
      SET status = ?
      WHERE id = ?
      `,
      [status, loan_id]
    );
  },

  
};
