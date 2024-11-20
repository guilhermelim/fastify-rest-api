import { randomUUID as uuid } from "node:crypto";

import Product from "../../domain/product/entity/product.entity";
import ProductRepositoryInterface from "../../domain/product/repository/product.repository.interface";

interface CreateProductDTO {
  name: string;
  price: number;
}

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(data: CreateProductDTO): Promise<any> {
    // Criando a entidade de produto
    const product = new Product(
      uuid(), // Gerando um ID simples para o exemplo
      data.name,
      data.price
    );

    // Salvando o produto no repositório
    await this.productRepository.create(product);

    // Retornando o produto criado com a transformação adequada
    return ProductPresenter.toOutput(product); // Usando toOutput para formatar o produto criado
  }
}

class ProductPresenter {
  // Método para transformar um único produto
  static toOutput(product: Product) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
