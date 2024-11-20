import { FastifyInstance } from "fastify";
import productController from "../controllers/product.controller";

export default async function productRoutes(server: FastifyInstance) {
  // Rota para criar um produto
  server.post("/products", async (request, reply) => {
    return await productController.create(request, reply);
  });

  // Rota para buscar todos os produtos
  server.get("/products", async (request, reply) => {
    return await productController.findAll(request, reply);
  });

  // Rota para buscar um produto específico
  server.get("/products/:id", async (request, reply) => {
    return await productController.find(request, reply);
  });

  // Rota para atualizar um produto
  server.put("/products/:id", async (request, reply) => {
    return await productController.update(request, reply);
  });

  // Rota para deletar um produto
  server.delete("/products/:id", async (request, reply) => {
    return await productController.delete(request, reply);
  });
}
