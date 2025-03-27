import pg from "pg";

let mainPool = null;

function createPool() {
  // Si existe una cadena de conexión, úsala primero
  if (process.env.DATABASE_URL) {
    console.log("entra aqui");
    return new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Esto puede ser necesario para conectarse con Supabase
      },
    });
  }
  console.log("esto no sale");

  // Configuración por parámetros individuales (como respaldo)
  const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false, // Esto puede ser necesario para conectarse con Supabase
    },
  });
  return pool;
}

export const pool = () => {
  if (!mainPool) {
    mainPool = createPool();
  }
  return mainPool;
};

// Función para manejar transacciones
export const withTransaction = async (callback) => {
  const client = await pool().connect();
  try {
    await client.query("BEGIN");
    console.log("init transaction");
    await callback(client); // Pasa el cliente a la función callback para ejecutar las consultas
    await client.query("COMMIT");
    console.log("commit transaction");
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("roolback transaction");
    throw error;
  } finally {
    client.release(); // Libera el cliente de la conexión
  }
};
