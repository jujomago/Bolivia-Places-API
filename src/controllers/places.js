import { validatePartialPlace, validatePlace } from "#schemas/place.js";
import { PlaceModel } from "../models/place.js";

export class PlaceController {
  static async getAll(req, res) {
    const { from, rows } = req.query;
    try {
      const data = await PlaceModel.getAll({ from, numRows: rows });
      res.json(data);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({error:"error on Controller"});
    }
  }

  static async getLastIds(req, res) {    
    try {
      const data = await PlaceModel.getLastIds();      
      const rawIds = data.map((d)=>d.id);      
      res.json(rawIds);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({error:"error on Controller"});
    }
  }

  static async getPlace(req, res) {
    try {
      const data = await PlaceModel.getPlace({ id: req.params.id });
      if (data) return res.json(data);
      res.status(404).json({error:"not found"});
    } catch (e) {
      console.error(e.message);
      res.status(500).json({error:"error on Controller"});
    }
  }

  static async filterByTag(req, res) {
    const { id: tag } = req.params;
    const { from, rows } = req.query;
    try {
      const data = await PlaceModel.filterByTag({
        tag: tag.toLowerCase(),
        from,
        numRows: rows,
      });
      res.json(data);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({error:"error on Controller"});
    }
  }

  static async filterByCategory(req, res) {
    const { id: category } = req.params;
    const { from, rows } = req.query;

    try {
      const data = await PlaceModel.filterByCategory({
        category: category.toLowerCase(),
        from,
        numRows: rows,
      });
      res.json(data);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({error:"error on Controller"});
    }
  }

  static async filterByCity(req, res) {
    const { id: city } = req.params;
    const { from, rows } = req.query;

    try {
      const data = await PlaceModel.filterByCity({
        city: city.toLowerCase(),
        from,
        numRows: rows,
      });
      res.json(data);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({error:"error on Controller"});
    }
  }
  static async search(req, res) {
    const { search } = req.params;    
    try {
      const data = await PlaceModel.search(search.toLocaleLowerCase());
      res.json(data);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({error:"error on Controller"} );
    }
  }

  static async getNearest(req, res) {
    const { lat, lon, radio } = req.params;

    try {
      const data = await PlaceModel.getNearest({ lat, lon, radio });
      res.json(data);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({error:"error on Controller"});
    }
  }

  static async create(req, res) {
    const result = validatePlace(req.body);
    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    try {
      const data = await PlaceModel.create(result.data);
      return res.json(data);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({error:"Error on Create:"});
    }
  }

  static async update(req, res) {
    const result = validatePartialPlace(req.body);
    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const { id } = req.params;
    if (isNaN(parseInt(id)))
      return res.status(400).json({error: "you should sent an id" });

    try {
      const data = await PlaceModel.udpate(id, result.data);
      return res.json(data);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({error:"Error on Create:"});
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    if (isNaN(parseInt(id)))
      return res.status(400).json({ error: "you should sent an id" });
    try {
      const data = await PlaceModel.delete({
        id,
      });
      return data
        ? res.json({ message: "deleted succesfully" })
        : res.status(400).json({error:"deleted wrong"});
    } catch (e) {
      res.status(500).json({error:"Error on Delete"});
    }
  }


  static async addImages(req, res) {
    const result = validatePartialPlace(req.body);
    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    
    const { id } = req.params;
    if (isNaN(parseInt(id)))
      return res.status(400).json({error: "you should sent an id" });

    try {
      const data = await PlaceModel.addImages({media:result.data.media,placeId:id});
      return res.json(data);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({error:"Error on Create:"});
    }
  }
  // TODO: ADD VALIDATION FOR THIS TYPE WHEN REMOVING AN IMAGE
  /*
  {
    "id":2,    
    "type":"video"
}
  */
  static async removeImage(req, res) {
      const { id: placeId } = req.params;
      const {id:mediaId} = req.body;
    if (isNaN(parseInt(placeId)))
      return res.status(400).json({error: "you should sent an id" });

    try {
      const data = await PlaceModel.removeImage({mediaId, placeId});
      return res.json(data);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({error:"Error on Create:"});
    }
  }


  
    static async setDefaultImage(req, res) {
      const { id: placeId } = req.params;
      const {url} = req.body;
    if (isNaN(parseInt(placeId)))
      return res.status(400).json({error: "you should sent an id" });

    try {
      const data = await PlaceModel.setDefaultImage({url, placeId});
      return res.json(data);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({error:"Error on Create:"});
    }
  }
}
