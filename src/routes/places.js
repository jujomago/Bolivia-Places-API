import { Router } from "express";
import { PlaceController } from "../controllers/places.js";
import { verifyToken } from "#middlewares/authValidator.js";
import { MediaModel } from "#models/media.js";

export const placesRouter = Router();

placesRouter.get("/", PlaceController.getAll);
placesRouter.get("/:id", PlaceController.getPlace);
placesRouter.get("/tag/:id", PlaceController.filterByTag);
placesRouter.get("/category/:id", PlaceController.filterByCategory);
placesRouter.get("/city/:id", PlaceController.filterByCity);
placesRouter.get("/search/:search", PlaceController.search);
placesRouter.get("/nearest/:lat&:lon&:radio", PlaceController.getNearest);
placesRouter.get("/:id/images", async (req, res) => {
    const data = await MediaModel.getByPlace({place_id:req.params.id});
    res.json(data);
  });
  
  /*


placesRouter.post("/", verifyToken, PlaceController.create);
placesRouter.put("/:id", verifyToken, PlaceController.update);
placesRouter.delete("/:id", verifyToken, PlaceController.delete); */
