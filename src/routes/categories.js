import { Router } from "express";
import { CategoriesController } from "../controllers/categories.js";
import { authenticateToken } from "#middlewares/authValidator.js";

export const categoriesRouter = Router();
categoriesRouter.get("/", CategoriesController.getAll);
categoriesRouter.get("/:id", CategoriesController.getCategory);
categoriesRouter.post("/", authenticateToken, CategoriesController.create);
categoriesRouter.put("/:id", authenticateToken, CategoriesController.update);
categoriesRouter.delete("/:id", authenticateToken, CategoriesController.delete);
