import pg from "pg";
import { dbConfig } from "../config";

let mainPool = null;

function createPool() {
  const pool = new pg.Pool({ ...dbConfig });
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
