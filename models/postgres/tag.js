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

  static async getByPlace({ place_id }) {
    try {
      const result = await pool().query(
        "SELECT t.id,t.name FROM place_tags pt join tags t on t.id=pt.tag_id where pt.place_id=$1;",
        [place_id]
      );
      return result.rows;
    } catch (e) {
      console.log("Model error:", e);
      throw new Error(e);
    }
  }
}
