import ProductRepositoryInterface from "../../domain/product/repository/product.repository.interface";
import Product from "../../domain/product/entity/product.entity";

interface FindProductDTO {
  id?: string;
}

export default class FindProductsUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(data?: FindProductDTO): Promise<any> {
    if (data?.id) {
      const product = await this.productRepository.find(data.id);
      return ProductPresenter.toOutput(product);
    }

    const products = await this.productRepository.findAll();
    return ProductPresenter.toOutputMany(products);
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

  // Método para transformar múltiplos produtos
  static toOutputMany(products: Product[]) {
    return products.map(ProductPresenter.toOutput);
  }
}
