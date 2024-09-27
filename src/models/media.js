import { pool } from "#db.js";
export class MediaModel {
  static async getByPlace({ place_id }) {
    try {
      const result = await pool().query(
        "SELECT id,url,type FROM media WHERE place_id=$1",
        [place_id]
      );

      return result.rows;
    } catch (e) {
      console.log("Model error:", e);
      throw new Error(e);
    }
  }
}
