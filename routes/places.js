import { Router } from "express";
import { PlaceController } from "../controllers/places.js";

export const placesRouter = Router();

placesRouter.get("/", PlaceController.getAll);
placesRouter.get("/:id", PlaceController.getPlace);
placesRouter.get("/tag/:id", PlaceController.filterByTag);
placesRouter.get("/category/:id", PlaceController.filterByCategory);
placesRouter.get("/city/:id", PlaceController.filterByCity);
placesRouter.get("/search/:search", PlaceController.search);
placesRouter.get("/nearest/:lat&:lon&:radio", PlaceController.getNearest);
