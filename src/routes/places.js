import { Router } from "express";
import { PlaceController } from "../controllers/places.js";
import { verifyToken } from "#middlewares/authValidator.js";
import { MediaModel } from "#models/media.js";
import apicache from 'apicache'

export const placesRouter = Router();
let cache = apicache.middleware

placesRouter.get("/", cache('1 minutes'), PlaceController.getAll);
placesRouter.get("/ids", cache('10 minutes'), PlaceController.getLastIds);
placesRouter.get("/:id",cache('1 minutes'), PlaceController.getPlace);
placesRouter.get("/tag/:id", cache('1 minutes'),PlaceController.filterByTag);
placesRouter.get("/category/:id", cache('1 minutes'),PlaceController.filterByCategory);
placesRouter.get("/city/:id", cache('1 minutes'),PlaceController.filterByCity);
placesRouter.get("/search/:search", cache('1 minutes'), PlaceController.search);
placesRouter.get("/nearest/:lat&:lon&:radio", cache('1 minutes'),PlaceController.getNearest);
placesRouter.get("/:id/images", cache('1 minutes'), async (req, res) => {
    const data = await MediaModel.getByPlace({place_id:req.params.id});
    res.json(data);
});
//TODO: DOCUMENT MISSING ENDPOINTS
placesRouter.post("/", verifyToken, PlaceController.create);
placesRouter.put("/:id", verifyToken, PlaceController.update);
placesRouter.delete("/:id", verifyToken, PlaceController.delete); 
placesRouter.post("/:id/add-images", verifyToken, PlaceController.addImages);
placesRouter.delete("/:id/remove-image", verifyToken, PlaceController.removeImage);
placesRouter.patch("/:id/set-default-image", verifyToken, PlaceController.setDefaultImage);