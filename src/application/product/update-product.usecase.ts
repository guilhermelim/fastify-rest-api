import Product from "../../domain/product/entity/product.entity";
import ProductRepositoryInterface from "../../domain/product/repository/product.repository.interface";

interface UpdateProductDTO {
  id: string;
  name: string;
  price: number;
}

export default class UpdateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(data: UpdateProductDTO): Promise<any> {
    // Buscando o produto no repositório
    const product = await this.productRepository.find(data.id);

    // Alterando os dados do produto
    product.changeName(data.name);
    product.changePrice(data.price);

    // Atualizando o produto no repositório
    await this.productRepository.update(product);

    // Retornando o produto atualizado formatado
    return ProductPresenter.toOutput(product);
  }
}

class ProductPresenter {
  static toOutput(product: Product) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
