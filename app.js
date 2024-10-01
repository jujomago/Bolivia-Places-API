import express from "express"; // require -> commonJS
import { corsMiddleware } from "./src/middlewares/cors.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//import { specs, swaggerUi } from "./swagger.js";
import { PORT } from "./config.js";
import {
  placesRouter,
  categoriesRouter,
  citiesRouter,
  tagsRouter,
  usersRouter,
} from "./src/routes/index.js";

const app = express();
app.disable("x-powered-by");
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  const username = req.cookies.token || null; // Obtiene el username desde las cookies, si está disponible
  res.render("index", { username }); // Pasa la variable username al template
});

app.use("/users", usersRouter);
app.use("/places", placesRouter);
app.use("/places_media", categoriesRouter);
app.use("/categories", categoriesRouter);
app.use("/cities", citiesRouter);
app.use("/tags", tagsRouter);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
