import { pool, withTransaction } from "#db.js";
import { MediaModel } from "./media.js";
import { TagModel } from "./tag.js";

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
  static async getPlace({ id }) {
    try {
      const result = await pool().query(
        "SELECT * FROM places_detail WHERE id=$1",
        [id]
      );
      const place = result.rows[0];
      if (place) {
        place["media"] = await MediaModel.getByPlace({
          place_id: place.id,
        });
        place["tags"] = await TagModel.getByPlace({
          place_id: place.id,
        });
      }
      return place;
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

  static async create(place) {
    const {
      name,
      description,
      description_html,
      location,
      default_photo,
      latitude,
      longitude,
      category_id,
      city_id,
      media,
      tags,
    } = place;

    try {
      let result;
      await withTransaction(async (client) => {
        result = await client.query(
          `INSERT INTO 
            places(name, description, description_html, location, default_photo, latitude, longitude, city_id, category_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
          [
            name,
            description,
            description_html,
            location,
            default_photo,
            latitude,
            longitude,
            city_id,
            category_id,
          ]
        );

        const newPlaceId = result.rows[0].id;

        if (media?.length > 0) {
          await client.query(
            `INSERT INTO media (place_id, url, type) 
             SELECT * FROM UNNEST ($1::int[], $2::text[], $3::text[])`,
            [
              media.map(() => newPlaceId),
              media.map((item) => item.url),
              media.map((item) => item.type),
            ]
          );
        }

        if (tags?.length > 0) {
          await client.query(
            `INSERT INTO place_tags (place_id, tag_id) 
             SELECT * FROM UNNEST ($1::int[], $2::int[])`,
            [tags.map(() => newPlaceId), tags]
          );
        }
      });
      return result.rows[0];
    } catch (e) {
      console.error("Error creando place:", e);
      throw new Error(e);
    }
  }
  static async delete({ id }) {
    try {
      const result = await pool().query("DELETE  from places WHERE id=$1", [
        id,
      ]);
      return result.rowCount === 1;
    } catch (e) {
      console.log("Model error:", e);
      throw new Error(e);
    }
  }
  static async udpate(id, place) {
    const {
      name,
      description,
      description_html,
      location,
      default_photo,
      latitude,
      longitude,
      category_id,
      city_id,
      media,
      tags,
    } = place;
    try {
      const result = await pool().query(
        `UPDATE places
	          SET name=$1, description=$2, category_id=$3, description_html=$4,
            default_photo=$5, latitude=$6, longitude=$7, city_id=$8, location=$9
	        WHERE id=$10`,
        [
          name,
          description,
          category_id,
          description_html,
          default_photo,
          latitude,
          longitude,
          city_id,
          location,
          id,
        ]
      );
      return result.rowCount === 1;
    } catch (e) {
      console.log("Model error:", e);
      throw new Error(e);
    }
  }
}
