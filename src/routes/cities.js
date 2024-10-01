import { Router } from "express";
import { CityModel } from "../models/city.js";

export const citiesRouter = Router();

citiesRouter.get("/", async (req, res) => {
  const data = await CityModel.getAll();
  res.json(data);
});
citiesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await CityModel.getCity({ id });
  if (data) return res.json(data);
  res.status(404).send("not found");
});
// todo implement crud missing routes here
