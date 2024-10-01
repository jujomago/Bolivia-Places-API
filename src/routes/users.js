import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "#models/user.js";

import { authenticateToken } from "#middlewares/authValidator.js";

export const usersRouter = Router();

usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const user = await UserModel.findUserByUsername({ username });
    if (!user) {
      return res.status(403).send("Invalid credentials username");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(403).send("Invalid credentials password");
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username, role: user.role_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .json({ message: "Logged in successfully", accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during login");
  }
});

usersRouter.post("/register", async (req, res) => {
  const { username, email, password, fullName, role } = req.body;

  const userRole = role ?? 1; // default standard role

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    username,
    email,
    full_name: fullName,
    password: hashedPassword,
    role: userRole,
  };

  try {
    const userIsNotAvailable = await UserModel.findUserByUsername({ username });
    console.log(userIsNotAvailable);
    if (userIsNotAvailable)
      return res.status(400).send("The username is taken");

    const emailIsNotlAvailable = await UserModel.findByUserEmail({ email });
    if (emailIsNotlAvailable)
      return res.status(400).send("The email already exists");

    const newUser = await UserModel.createUser(user);
    const { password: _, ...publicUser } = newUser;

    res.status(201).json(publicUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el usuario");
  }
});

usersRouter.post("/logout", (req, res) => {
  res.clearCookie("token"); // Elimina la cookie del token
  res.json({ message: "Logged out successfully" });
});
