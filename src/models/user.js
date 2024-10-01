import { pool } from "#db.js";
export class UserModel {
  static async findUserByUsername({ username }) {
    try {
      const result = await pool().query(
        "SELECT * FROM users WHERE username=$1",
        [username]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(e);
    }
  }

  static async findByUserEmail({ email }) {
    try {
      const result = await pool().query("SELECT * FROM users WHERE email=$1", [
        email,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error(e);
    }
  }

  static async createUser({ username, password, email, full_name, role }) {
    try {
      const result = await pool().query(
        "INSERT INTO users (username, password, email, full_name, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, password, email, full_name, role]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
