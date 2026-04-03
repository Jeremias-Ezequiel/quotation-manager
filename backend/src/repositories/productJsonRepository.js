import IProductInterface from "../interfaces/IProductInterface.js";
import fs from "node:fs";
import path from "node:path";

class ProductJsonRepository extends IProductInterface {
  async getAll() {
    const jsonPath = path.join(process.cwd(), "/src/data/products.json");
    const data = fs.readFileSync(jsonPath, "utf-8");
    return JSON.parse(data);
  }

  async getById(id) {}
  async create(data) {}
  async update() {}

  async getBySku(sku) {
    const products = await this.getAll();
    const product = products.filter((p) => p.sku === sku);
    return product;
  }
}

export default ProductJsonRepository;
