import { Router } from "express";
import { MediaModel } from "#models/media.js";

export const mediaRouter = Router();

mediaRouter.get("/place/:id", async (req, res) => {
  const data = await MediaModel.getByPlace(req.params.id);
  res.json(data);
});
/* mediaRouter.post("/", async (req, res) => {
  const { placeId, media } = req.body;
  const data = await MediaModel.create({ placeId, media });
  if (data) return res.json(data);
  res.status(404).json({error:"not found"});
}); */
// todo implement crud missing routes here
