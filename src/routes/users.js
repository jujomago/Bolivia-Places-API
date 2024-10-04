import { Router } from "express";
import { UserController } from "#controllers/users.js";
import { verifyToken } from "#middlewares/authValidator.js";

export const usersRouter = Router();

usersRouter.post("/login", UserController.login);
usersRouter.post("/register", UserController.register);
usersRouter.post("/logout", verifyToken, UserController.logout);
