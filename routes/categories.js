import { Router } from "express";
import { PlaceController } from "../controllers/places.js";

export const categoriesRouter = Router();

placesRouter.get("/", PlaceController.getAll);
placesRouter.get("/:id", PlaceController.filterByTag);
categoriesRouter.post("/", PlaceController.filterByCategory);
categoriesRouter.update("/", PlaceController.filterByCategory);
categoriesRouter.delete("/", PlaceController.filterByCategory);
