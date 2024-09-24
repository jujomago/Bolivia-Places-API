import { Router } from "express";
import { TagModel } from "../models/postgres/tag.js";

export const tagsRouter = Router();

tagsRouter.get("/", async (req, res) => {
  const data = await TagModel.getAll();
  res.json(data);
});
tagsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await TagModel.getTag({ id });
  if (data) return res.json(data);
  res.status(404).send("not found");
});
/*placesRouter.get("/category/:id", PlaceController.filterByCategory);
placesRouter.get("/city/:id", PlaceController.filterByCity);
placesRouter.get("/search/:search", PlaceController.search);
placesRouter.get("/nearest/:lat&:lon&:radio", PlaceController.getNearest);

placesRouter.get("/categories", PlaceController.getNearest);
*/
