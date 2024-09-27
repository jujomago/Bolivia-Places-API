import { Router } from "express";
import { PlaceController } from "../controllers/places.js";
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
/*placesRouter.get("/category/:id", PlaceController.filterByCategory);
placesRouter.get("/city/:id", PlaceController.filterByCity);
placesRouter.get("/search/:search", PlaceController.search);
placesRouter.get("/nearest/:lat&:lon&:radio", PlaceController.getNearest);

placesRouter.get("/categories", PlaceController.getNearest);
 */
