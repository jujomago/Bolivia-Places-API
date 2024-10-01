import { Router } from "express";
import { TagModel } from "../models/tag.js";

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
// todo: impolement missing crud routes here
