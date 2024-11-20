import { FastifyRequest, FastifyReply } from "fastify";
import CreateProductUseCase from "../../../application/product/create-product.usecase";
import FindProductsUseCase from "../../../application/product/find-products.usecase";
import UpdateProductUseCase from "../../../application/product/update-product.usecase";
import DeleteProductUseCase from "../../../application/product/delete-product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, price } = request.body as { name: string; price: number };

  // Validate input
  if (!name || !price) {
    return reply.status(400).send({
      status: "error",
      message: "Name and price are required.",
    });
  }

  const useCase = new CreateProductUseCase(new ProductRepository());
  try {
    const result = await useCase.execute({ name, price });
    return reply.status(201).send({
      status: "success",
      message: "Product created successfully.",
      data: result,
    });
  } catch (error) {
    return reply.status(500).send({
      status: "error",
      message: "Error creating the product.",
      details: (error as any).message,
    });
  }
};

const find = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  const useCase = new FindProductsUseCase(new ProductRepository());
  try {
    const result = await useCase.execute({ id });

    if (!result) {
      return reply.status(404).send({
        status: "error",
        message: `Product with ID ${id} not found.`,
      });
    }

    return reply.status(200).send({
      status: "success",
      message: "Product found successfully.",
      data: result,
    });
  } catch (error) {
    return reply.status(500).send({
      status: "error",
      message: "Error fetching the product.",
      details: (error as any).message,
    });
  }
};

const findAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const useCase = new FindProductsUseCase(new ProductRepository());
  try {
    const result = await useCase.execute();
    return reply.status(200).send({
      status: "success",
      message: "Products fetched successfully.",
      data: result,
    });
  } catch (error) {
    return reply.status(500).send({
      status: "error",
      message: "Error fetching the products.",
      details: (error as any).message,
    });
  }
};

const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { name, price } = request.body as { name: string; price: number };

  if (!name || !price) {
    return reply.status(400).send({
      status: "error",
      message: "Name and price are required for update.",
    });
  }

  const useCase = new UpdateProductUseCase(new ProductRepository());
  try {
    const result = await useCase.execute({ id, name, price });

    if (!result) {
      return reply.status(404).send({
        status: "error",
        message: `Product with ID ${id} not found for update.`,
      });
    }

    return reply.status(200).send({
      status: "success",
      message: "Product updated successfully.",
      data: result,
    });
  } catch (error) {
    return reply.status(500).send({
      status: "error",
      message: "Error updating the product.",
      details: (error as any).message,
    });
  }
};

const destroy = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  const useCase = new DeleteProductUseCase(new ProductRepository());
  try {
    const result = await useCase.execute({ id });

    // If the result is undefined, return success (no content)
    if (result === undefined) {
      return reply.status(204).send({
        status: "success",
        message: "Product deleted successfully.",
      });
    }

    // If the product isn't found to delete, return 404
    return reply.status(404).send({
      status: "error",
      message: `Product with ID ${id} not found for deletion.`,
    });
  } catch (error) {
    return reply.status(500).send({
      status: "error",
      message: "Error deleting the product.",
      details: (error as any).message,
    });
  }
};

export default {
  create,
  find,
  findAll,
  update,
  delete: destroy,
};
