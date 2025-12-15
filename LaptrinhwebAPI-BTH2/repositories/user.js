import { pool } from "../services/mysql.js";

export const userRepo = {
  getUsers: async () => {
    const db = await pool;
    // const result = await db.request().query("SELECT * FROM Users");
    const [results] = await db.query("SELECT * FROM Users");
    return results;
  },
};
