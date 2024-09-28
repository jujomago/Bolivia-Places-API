import express, { json } from "express"; // require -> commonJS
import { corsMiddleware } from "./src/middlewares/cors.js";
import morgan from "morgan";
//import { specs, swaggerUi } from "./swagger.js";
import { PORT } from "./config.js";
import {
  placesRouter,
  categoriesRouter,
  citiesRouter,
  tagsRouter,
} from "./src/routes/index.js";

const app = express();
app.use(json());
app.disable("x-powered-by");
app.use(morgan("dev"));

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("I am alive");
});
app.use("/places", placesRouter);
app.use("/places_media", categoriesRouter);
app.use("/categories", categoriesRouter);
app.use("/cities", citiesRouter);
app.use("/tags", tagsRouter);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
