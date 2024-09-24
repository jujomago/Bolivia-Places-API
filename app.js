import express, { json } from "express"; // require -> commonJS
import { corsMiddleware } from "./middlewares/cors.js";
import morgan from "morgan";
import {
  placesRouter,
  categoriesRouter,
  citiesRouter,
  tagsRouter,
} from "./routes";

const app = express();
app.use(json());
app.disable("x-powered-by");
app.use(morgan("dev"));
//app.use("/movies", moviesRouter);
app.use("/places", placesRouter);
app.use("/categories", categoriesRouter);
app.use("/cities", citiesRouter);
app.use("/tags", tagsRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
