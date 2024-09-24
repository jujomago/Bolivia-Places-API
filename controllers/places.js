import { PlaceModel } from "../models/postgres/place.js";

export class PlaceController {
  static async getAll(req, res) {
    const { from, rows } = req.query;
    try {
      const data = await PlaceModel.getAll({ from, numRows: rows });
      res.json(data);
    } catch (e) {
      console.log(e);
      res.status(500).send("error on Controller");
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
      console.log(e);
      res.status(500).send("error on Controller");
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
      console.log(e);
      res.status(500).send("error on Controller");
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
      console.log(e);
      res.status(500).send("error on Controller");
    }
  }
  static async search(req, res) {
    const { search } = req.params;
    console.log("el val:", search);
    try {
      const data = await PlaceModel.search(search.toLocaleLowerCase());
      res.json(data);
    } catch (e) {
      console.log(e);
      res.status(500).send("error on Controller");
    }
  }

  static async getNearest(req, res) {
    console.log("filterin by Category controller");
    const { lat, lon, radio } = req.params;

    try {
      const data = await PlaceModel.getNearest({ lat, lon, radio });
      res.json(data);
    } catch (e) {
      console.log(e);
      res.status(500).send("error on Controller");
    }
  }
}
