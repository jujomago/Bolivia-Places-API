import { pool } from "../../db.js";

export class PlaceModel {
  static async getAll({ from = 0, numRows = 30 }) {
    try {
      const result = await pool().query(
        "SELECT * FROM places_detail OFFSET $1 LIMIT $2",
        [from, numRows]
      );
      return result.rows;
    } catch (e) {
      console.log("Model error:", e);
      throw new Error(e);
    }
  }
  static async filterByCategory({ category, from = 0, numRows = 30 }) {
    try {
      let query = "";
      if (!isNaN(parseInt(category))) {
        query = `SELECT * FROM places_detail 
        where category_id=$1 OFFSET $2 LIMIT $3`;
      } else {
        query = `SELECT * FROM places_detail 
        where LOWER(category_name)=$1 OFFSET $2 LIMIT $3`;
      }
      const result = await pool().query(query, [category, from, numRows]);

      return result.rows;
    } catch (e) {
      console.log(e);
      throw new Error("Model error:", e);
    }
  }
  static async filterByTag({ tag, from = 0, numRows = 30 }) {
    try {
      let query;
      if (!isNaN(parseInt(tag))) {
        query = `SELECT p.* FROM place_tags pt
            JOIN tags t on t.id=pt.tag_id
            JOIN places_detail p on p.id=pt.place_id
            where t.id=$1 OFFSET $2 LIMIT $3
            `;
      } else {
        query = `SELECT p.* FROM place_tags pt
            JOIN tags t on t.id=pt.tag_id
            JOIN places_detail p on p.id=pt.place_id
            where LOWER(t.name)=$1 OFFSET $2 LIMIT $3
          `;
      }
      const result = await pool().query(query, [tag, from, numRows]);
      return result.rows;
    } catch (e) {
      console.log(e);
      throw new Error("Model error:", e);
    }
  }
  static async filterByCity({ city, from = 0, numRows = 30 }) {
    try {
      let query;
      if (!isNaN(parseInt(city))) {
        query = `SELECT * FROM places_detail where city_id=$1  OFFSET $2 LIMIT $3`;
      } else {
        query = `SELECT * FROM places_detail where LOWER(city_name)=$1  OFFSET $2 LIMIT $3`;
      }
      const result = await pool().query(query, [city, from, numRows]);
      return result.rows;
    } catch (e) {
      console.log(e);
      throw new Error("Model error:", e);
    }
  }
  static async search(strSearch) {
    try {
      const searchQuery = `%${strSearch.toLowerCase()}%`;
      console.log("searchQuery:", searchQuery);
      const result = await pool().query(
        `SELECT * from places_detail
         WHERE LOWER(name) LIKE $1 OR LOWER(description) LIKE $1`,
        [searchQuery]
      );
      return result.rows;
    } catch (e) {
      console.log(e);
      throw new Error("Model error:", e);
    }
  }

  static async getNearest({ lat, lon, radio }) {
    try {
      const query = `
        SELECT * FROM places_detail
        WHERE (
          6371 * acos(
            cos(radians($1)) * cos(radians(latitude)) *
            cos(radians(longitude) - radians($2)) +
            sin(radians($1)) * sin(radians(latitude))
          )
        ) <= $3
      `;

      const result = await pool().query(query, [lat, lon, radio]);
      return result.rows;
    } catch (e) {
      console.log(e);
      throw new Error("Model error:", e);
    }
  }
}
