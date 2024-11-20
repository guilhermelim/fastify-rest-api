import { Pool } from "pg";

class DatabaseConnection {
  private static instance: Pool;

  private constructor() {}

  public static getInstance(): Pool {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new Pool({
        user: "your_username",
        host: "localhost",
        database: "your_database",
        password: "your_password",
        port: 5432,
      });
    }
    return DatabaseConnection.instance;
  }
}

export default DatabaseConnection;
