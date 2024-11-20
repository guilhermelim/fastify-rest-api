import ProductModel from "../../product/repository/sequelize/model/product.model";

class ModelsManager {
  private models: any[] = [];

  addModel(model: any) {
    this.models.push(model);
  }

  getModels(): any[] {
    return this.models;
  }
}

const modelsManager = new ModelsManager();

// Adicionar os modelos
modelsManager.addModel(ProductModel);

// Adicione outros modelos aqui conforme necessário
// import AnotherModel from '../../another/repository/sequelize/model/another.model';
// modelsManager.addModel(AnotherModel);

export default modelsManager;
