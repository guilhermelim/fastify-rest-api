// src/index.ts
import server from "./infrastructure/http/server";
import SequelizeDatabase from "./infrastructure/db/sequelize/database";

// Função principal de inicialização
const startApp = async () => {
  try {
    // Inicializando o banco de dados
    await SequelizeDatabase.initialize();

    // Iniciando o servidor HTTP
    await server.listen({ port: 3000 });
    console.log("Server is running on port 3000");
  } catch (error) {
    console.error("Error starting the application:", error);
    process.exit(1); // Finaliza a aplicação em caso de erro
  }
};

// Executando a aplicação
startApp();
