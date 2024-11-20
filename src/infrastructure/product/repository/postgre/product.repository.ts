import ProductRepositoryInterface from "../../../../domain/product/repository/product.repository.interface";
import Product from "../../../../domain/product/entity/product.entity";
import { ensureProductsTable } from "./schema/product.schema";
import DatabaseConnection from "../../../db/postgre/database";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ensureProductsTable();
    const db = DatabaseConnection.getInstance();
    const insertQuery =
      "INSERT INTO products (id, name, price) VALUES ($1, $2, $3)";
    const values = [entity.id, entity.name, entity.price];
    await db.query(insertQuery, values);
  }

  async update(entity: Product): Promise<void> {
    await ensureProductsTable();
    const db = DatabaseConnection.getInstance();
    const updateQuery =
      "UPDATE products SET name = $1, price = $2 WHERE id = $3";
    const values = [entity.name, entity.price, entity.id];
    await db.query(updateQuery, values);
  }

  async findAll(): Promise<Product[]> {
    await ensureProductsTable();
    const db = DatabaseConnection.getInstance();
    const selectAllQuery = "SELECT * FROM products";
    const result = await db.query(selectAllQuery);
    return result.rows.map(
      (row: { id: string; name: string; price: number }) =>
        new Product(row.id, row.name, row.price)
    );
  }

  async find(id: string): Promise<Product> {
    await ensureProductsTable();
    const db = DatabaseConnection.getInstance();
    const selectQuery = "SELECT * FROM products WHERE id = $1";
    const values = [id];
    const result = await db.query(selectQuery, values);
    const row = result.rows[0];
    if (row) {
      return new Product(row.id, row.name, row.price);
    }
    throw new Error("Product not found");
  }

  async delete(entity: Product): Promise<void> {
    await ensureProductsTable();
    const db = DatabaseConnection.getInstance();
    const deleteQuery = "DELETE FROM products WHERE id = $1";
    const values = [entity.id];
    await db.query(deleteQuery, values);
  }
}
