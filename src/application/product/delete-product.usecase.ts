import ProductRepositoryInterface from "../../domain/product/repository/product.repository.interface";

interface DeleteProductDTO {
  id: string;
}

export default class DeleteProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(data: DeleteProductDTO): Promise<void> {
    // Buscando o produto
    const product = await this.productRepository.find(data.id);

    // Deletando o produto
    await this.productRepository.delete(product);
  }
}
