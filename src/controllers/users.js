import { UserModel } from "#models/user.js";
import { validatePartialUser, validateUser } from "#schemas/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const TOKEN_COOKIE_NAME = "token";

export class UserController {
  static async login(req, res) {
    const { ACCESS_TOKEN_SECRET, NODE_ENV } = process.env;
    const result = validatePartialUser(req.body);
    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    try {
      const user = await UserModel.findUserByUsername({
        username: result.data.username,
      });
      if (!user) {
        return res.status(403).send("Invalid credentials username");
      }

      const validPassword = await bcrypt.compare(
        result.data.password,
        user.password
      );
      if (!validPassword) {
        return res.status(403).send("Invalid credentials password");
      }

      const accessToken = jwt.sign(
        { id: user.id, username: user.username, role: user.role_id },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      res
        .cookie(TOKEN_COOKIE_NAME, accessToken, {
          httpOnly: true,
          secure: NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        })
        .json({ message: "Logged in successfully", accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred during login");
    }
  }

  static async register(req, res) {
    const result = validateUser(req.body);
    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const user = {
      ...result.data,
      password: hashedPassword,
    };

    try {
      const userIsNotAvailable = await UserModel.findUserByUsername({
        username: user.username,
      });

      if (userIsNotAvailable)
        return res.status(400).send("The username is taken");

      const emailIsNotlAvailable = await UserModel.findByUserEmail({
        email: user.email,
      });
      if (emailIsNotlAvailable)
        return res.status(400).send("The email already exists");

      const newUser = await UserModel.createUser(user);
      const { password: _, ...publicUser } = newUser;

      res.status(201).json(publicUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al crear el usuario");
    }
  }

  static async logout(req, res) {
    res.clearCookie(TOKEN_COOKIE_NAME).send("Logged out successfully");
  }
}
