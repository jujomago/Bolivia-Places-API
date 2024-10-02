import express from "express"; // require -> commonJS
import { corsMiddleware } from "./src/middlewares/cors.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//import { specs, swaggerUi } from "./swagger.js";
import {
  placesRouter,
  categoriesRouter,
  citiesRouter,
  tagsRouter,
  usersRouter,
} from "./src/routes/index.js";
import { authenticateToken } from "#middlewares/authValidator.js";
export const PORT = process.env.PORT ?? 1234;
const app = express();
app.disable("x-powered-by");
app.set("view engine", "ejs");
app.use(express.json());
app.use(corsMiddleware());
app.use(cookieParser());
app.use(morgan("dev"));

//app.use(authenticateToken);

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  const username = req.cookies.token || null; // Obtiene el username desde las cookies, si está disponible
  res.render("index", { username }); // Pasa la variable username al template
});

const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/places", placesRouter);
apiRouter.use("/places_media", categoriesRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/cities", citiesRouter);
apiRouter.use("/tags", tagsRouter);

// Aplica el prefijo /api/v1 a todas las rutas agrupadas
app.use("/api/v1", apiRouter);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
