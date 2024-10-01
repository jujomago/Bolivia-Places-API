import { Router } from "express";
import { CategoriesController } from "../controllers/categories.js";
import { authenticateToken } from "#middlewares/authValidator.js";

export const categoriesRouter = Router();
categoriesRouter.get("/", CategoriesController.getAll);
categoriesRouter.get(
  "/:id",
  authenticateToken,
  CategoriesController.getCategory
);
categoriesRouter.post("/", CategoriesController.create);
categoriesRouter.put("/:id", CategoriesController.update);
categoriesRouter.delete("/:id", CategoriesController.delete);
