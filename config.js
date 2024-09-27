export const PORT = process.env.PORT ?? 1234;
export const dbConfig = {
  user: process.env.DB_USER ?? "postgres",
  host: process.env.DB_HOST ?? "localhost",
  password: process.env.DB_PASSWORD ?? "postgres",
  database: process.env.DB_DATABASE ?? "BoliviaPlacesApi",
  port: process.env.DE_PORT ?? "5432",
};
