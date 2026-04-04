import IProductInterface from "../interfaces/IProductInterface.js";
import fs from "node:fs";
import path from "node:path";

class ProductJsonRepository extends IProductInterface {
  async getAll(queries = {}) {
    const jsonPath = path.join(process.cwd(), "/src/data/products.json");
    const data = fs.readFileSync(jsonPath, "utf-8");
    let products = JSON.parse(data);

    const { category, sort, search } = queries;
    console.log(category);
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
  async create(data) {}
  async update() {}

  async getBySku(sku) {
    const products = await this.getAll();
    const product = products.filter((p) => p.sku === sku);
    return product;
  }
}

export default ProductJsonRepository;
