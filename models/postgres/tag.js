import { pool } from "../../db.js";
export class TagModel {
  static async getAll() {
    try {
      const result = await pool().query("SELECT * FROM tags");
      return result.rows;
    } catch (e) {
      console.log("Model error:", e);
      throw new Error(e);
    }
  }
  static async getTag({ id }) {
    try {
      const result = await pool().query("SELECT * FROM tags WHERE id=$1", [id]);
      return result.rows[0];
    } catch (e) {
      console.log("Model error:", e);
      throw new Error(e);
    }
  }
}
