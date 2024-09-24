import { CategoryModel } from "../models/postgres/category.js";

export class CategoriesController {
  static async getAll(req, res) {
    try {
      const data = await CategoryModel.getAll();
      res.json(data);
    } catch (e) {
      console.log(e);
      res.status(500).send("error on Controller");
    }
  }
  static async getCategory(req, res) {
    const { id } = req.params;
    try {
      const data = await CategoryModel.getCategory({ id });
      if (data) return res.json(data);
      res.status(404).send("not found");
    } catch (e) {
      console.log(e);
      res.status(500).send("error on Controller");
    }
  }
}
