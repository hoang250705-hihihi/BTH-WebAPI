import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const userRepository = {

    getByEmail: async (email) => {
    logger.info(`Repository: Fetching user by email ${email}`);
    try {
      const db = await pool;
      const [rows] = await db.query(
        `SELECT u.*, r.name as role_name
         FROM users u
         LEFT JOIN roles r ON u.role_id = r.id
         WHERE u.email = ?`,
        [email]
      );
      return rows[0];
    } catch (err) {
      logger.error("Repository Error: getByEmail failed", err);
      throw err;
    }
  },

  getRoleIdByName: async (name) => {
    logger.info(`Repository: Fetching role id by name ${name}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT id FROM roles WHERE LOWER(name) = ?", [String(name).toLowerCase()]);
      return rows[0] ? rows[0].id : null;
    } catch (err) {
      logger.error("Repository Error: getRoleIdByName failed", err);
      throw err;
    }
  },

  createUser: async (user) => {
    logger.info(`Repository: Creating user ${user.email}`);
    try {
      const db = await pool;
      const [result] = await db.query(
        `INSERT INTO users (full_name, email, password_hash, role_id)
         VALUES (?, ?, ?, ?)`,
        [user.full_name, user.email, user.password_hash, user.role_id]
      );

      const insertId = result.insertId;
      const [rows] = await db.query(
        `SELECT u.*, r.name as role_name
         FROM users u
         LEFT JOIN roles r ON u.role_id = r.id
         WHERE u.id = ?`,
        [insertId]
      );
      return rows[0];
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },
  
  getAll: async () => {
    logger.info("Repository: Fetching all users");
    try {
      const db = await pool;
      const [rows] = await db.query(
        `SELECT u.*, r.name as role_name
         FROM users u
         LEFT JOIN roles r ON u.role_id = r.id`
      );
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

  getById: async (id) => {
    logger.info(`Repository: Fetching user with ID ${id}`);
    try {
      const db = await pool;
      const [rows] = await db.query(
        `SELECT u.*, r.name as role_name
         FROM users u
         LEFT JOIN roles r ON u.role_id = r.id
         WHERE u.id = ?`,
        [id]
      );
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getById failed for ID ${id}`, err);
      throw err;
    }
  },

  create: async ({ id, name, email, phone }) => {
    logger.info(`Repository: Creating user ${email}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO Users (id, name, email, phone) VALUES (?, ?, ?, ?)",
        [id, name, email, phone]
      );
      return { id, name, email, phone };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },

  update: async (id, { name, email, phone }) => {
    logger.info(`Repository: Updating user ${id}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE Users SET name = ?, email = ?, phone = ? WHERE id = ?",
        [name, email, phone, id]
      );
      return { id, name, email, phone };
    } catch (err) {
      logger.error(`Repository Error: update failed for ID ${id}`, err);
      throw err;
    }
  },

  delete: async (id) => {
    logger.info(`Repository: Deleting user ${id}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM Users WHERE id = ?", [id]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for ID ${id}`, err);
      throw err;
    }
  },
};
