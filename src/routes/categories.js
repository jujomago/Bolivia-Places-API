import { Router } from "express";
import { CategoriesController } from "../controllers/categories.js";

export const categoriesRouter = Router();
categoriesRouter.get("/", CategoriesController.getAll);
categoriesRouter.get("/:id", CategoriesController.getCategory);
categoriesRouter.post("/", CategoriesController.create);
categoriesRouter.put("/:id", CategoriesController.update);
categoriesRouter.delete("/:id", CategoriesController.delete);
