import { validateCategory } from "#schemas/category.js";
import { CategoryModel } from "../models/category.js";

export class CategoriesController {
  static async getAll(req, res) {
    console.log("la cookie");
    console.log(req.cookies.token);

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
  static async create(req, res) {
    const result = validateCategory(req.body);
    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    try {
      const data = await CategoryModel.create({ ...result.data });
      return res.json(data);
    } catch (e) {
      res.status(500).send("Error on Create");
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const result = validateCategory(req.body);
    if (isNaN(parseInt(id)))
      return res.status(400).json({ error: "you should sent an id" });

    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    try {
      const data = await CategoryModel.update({
        id,
        ...result.data,
      });
      return data
        ? res.json({ message: "updated succesfully" })
        : res.status(400).json({ message: "updated wrong" });
    } catch (e) {
      res.status(500).send("Error on Update");
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    if (isNaN(parseInt(id)))
      return res.status(400).json({ error: "you should sent an id" });
    try {
      const data = await CategoryModel.delete({
        id,
      });
      return data
        ? res.json({ message: "deleted succesfully" })
        : res.status(400).json({ message: "deleted wrong" });
    } catch (e) {
      res.status(500).send("Error on Delete");
    }
  }
}
