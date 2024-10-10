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
      console.log("Model error:",  e.message);
      throw new Error( e.message );
    }
  }
  static async create({media,placeId, connection}){
    const client= connection ?? pool();    
    try {
        const result =  await client.query(
          `INSERT INTO media (place_id, url, type) 
           SELECT * FROM UNNEST ($1::int[], $2::text[], $3::text[]) RETURNING *`,
          [
            media.map(() => placeId),
            media.map((item) => item.url),
            media.map((item) => item.type),
          ]
        );
        return result.rows;      
    } catch (e) {
      console.log("MediaModel error:", e.message);
      throw new Error( e);
    }
  }
}
