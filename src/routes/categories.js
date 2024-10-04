import { Router } from "express";
import { CategoriesController } from "../controllers/categories.js";
import { verifyToken } from "#middlewares/authValidator.js";

export const categoriesRouter = Router();
categoriesRouter.get("/", CategoriesController.getAll);
categoriesRouter.get("/:id", CategoriesController.getCategory);
categoriesRouter.post("/", verifyToken, CategoriesController.create);
categoriesRouter.put("/:id", verifyToken, CategoriesController.update);
categoriesRouter.delete("/:id", verifyToken, CategoriesController.delete);
