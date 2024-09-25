import { pool } from "../../db.js";
export class CategoryModel {
  static async getAll() {
    try {
      const result = await pool().query("SELECT * FROM categories");
      return result.rows;
    } catch (e) {
      console.log("Model error:", e);
      throw new Error(e);
    }
  }
  static async getCategory({ id }) {
    console.log("requesting id", id);
    try {
      const result = await pool().query(
        "SELECT * FROM categories WHERE id=$1",
        [id]
      );
      return result.rows[0];
    } catch (e) {
      console.log("Model error:", e);
      throw new Error(e);
    }
  }
  static async create({ name }) {
    try {
      const checkDuplicate = await pool().query(
        "SELECT * from categories WHERE UPPER(name)=UPPER($1)",
        [name]
      );
      if (checkDuplicate.rows.length == 0) {
        const result = await pool().query(
          "INSERT INTO categories(name) VALUES($1) RETURNING *",
          [name]
        );
        return result.rows[0];
      } else {
        throw Error("La categoria ya existe");
      }
    } catch (e) {
      console.log("Model error:", e);
      throw new Error(e);
    }
  }
}
