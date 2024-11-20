import { Sequelize } from "sequelize-typescript";
import modelsManager from "./models.manager";

class SequelizeDatabase {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!SequelizeDatabase.instance) {
      SequelizeDatabase.instance = new Sequelize({
        // database: "your_database",
        // dialect: "postgres",
        // username: "your_username",
        // password: "your_password",
        // host: "localhost",
        // port: 5432,
        // logging: false,
        sync: { force: true },
        storage: ":memory:",
        dialect: "sqlite",
        logging: false,
      });

      SequelizeDatabase.instance.addModels(modelsManager.getModels());
    }
    return SequelizeDatabase.instance;
  }

  public static async initialize() {
    const sequelize = SequelizeDatabase.getInstance();
    try {
      await sequelize.sync({ force: true });
      console.log("Database connected and models synchronized.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

export default SequelizeDatabase;
