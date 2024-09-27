import { pool } from "#db.js";
export class CityModel {
  static async getAll() {
    try {
      const result = await pool().query("SELECT * FROM cities");
      return result.rows;
    } catch (e) {
      console.log("Model error:", e);
      throw new Error(e);
    }
  }
  static async getCity({ id }) {
    try {
      const result = await pool().query("SELECT * FROM cities WHERE id=$1", [
        id,
      ]);
      return result.rows[0];
    } catch (e) {
      console.log("Model error:", e);
      throw new Error(e);
    }
  }
}
