import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:5174",
  "http://localhost:5173",
  "https://jujomago.retool.com",
  "https://jujomago.github.io",
  "https://bolivia-api.com",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    /*    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    }, */
    origin: true,
    credentials: true,
  });
