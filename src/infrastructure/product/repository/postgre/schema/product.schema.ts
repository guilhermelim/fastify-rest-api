import DatabaseConnection from "../../../../db/postgre/database";

export async function ensureProductsTable() {
  const db = DatabaseConnection.getInstance();
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price NUMERIC(10, 2) NOT NULL
    );
  `;
  await db.query(createTableQuery);
}
