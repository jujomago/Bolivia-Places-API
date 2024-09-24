import { Router } from "express";
import { CategoriesController } from "../controllers/categories.js";

export const categoriesRouter = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Returns a sample message
 *     responses:
 *       200:
 *         description: A successful response
 */

categoriesRouter.get("/", CategoriesController.getAll);
categoriesRouter.get("/:id", CategoriesController.getCategory);
/*
categoriesRouter.post("/", PlaceController.createCatgory);
categoriesRouter.update("/", PlaceController.filterByCategory);
categoriesRouter.delete("/", PlaceController.filterByCategory); */
