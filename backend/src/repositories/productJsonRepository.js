import IProductInterface from "../interfaces/IProductInterface.js";
import fs from "node:fs";
import path from "node:path";

class ProductJsonRepository extends IProductInterface {
  jsonPath = path.join(process.cwd(), "/src/data/products.json");

  async getAll(queries = {}) {
    const data = fs.readFileSync(this.jsonPath, "utf-8");
    let products = JSON.parse(data);

    const { category, sort, search } = queries;

    // By categories
    if (category && category !== "all") {
      products = products.filter((p) => p.category === category);
    }

    // Order By
    if (sort) {
      switch (sort) {
        case "name":
          products = products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "asc":
          products = products.sort((a, b) => a.price_usd - b.price_usd);
          break;
        case "desc":
          products = products.sort((a, b) => b.price_usd - a.price_usd);
          break;
        default:
          break;
      }
    }

    if (search) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return products;
  }

  async getById(id) {}

  async create(data) {
    const jsonProducts = await this.getAll();
    jsonProducts.push(data.toJson());
    fs.writeFileSync(this.jsonPath, JSON.stringify(jsonProducts));
    return data.toJson();
  }
  async update() {}

  async getBySku(sku) {
    const products = await this.getAll();
    const product = products.find((p) => p.sku === sku);
    return product;
  }

  async delete(sku) {
    const products = await this.getAll();
    const productEliminated = products.find((e) => e.sku === sku);

    if (!productEliminated) {
      const err = new Error(`The product with the ${sku} does not exist.`);
      err.status = 404;
      throw err;
    }

    const newProducts = products.filter((e) => e.sku !== sku);
    fs.writeFileSync(this.jsonPath, JSON.stringify(newProducts));
    return productEliminated;
  }
}

export default ProductJsonRepository;
