import Fastify from "fastify";
import productRoutes from "./routes/product.routes";
import homeRoute from "./routes/home.routes";

const server = Fastify({
  logger: {
    level: "info", // Você pode usar 'debug' para mais detalhes
  },
});

server.register(homeRoute);
server.register(productRoutes); // Registrando as rotas do produto

// Exportando o servidor configurado
export default server;
