import pg from "pg";

let mainPool = null;

function createPool() {
  const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "BoliviaPlacesApi",
    port: "5432",
  });
  return pool;
}

export const pool = () => {
  if (!mainPool) {
    mainPool = createPool();
  }
  return mainPool;
};
