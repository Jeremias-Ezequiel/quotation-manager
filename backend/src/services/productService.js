import { Product } from "../models/Product.js";

class ProductService {
  #repository;

  constructor(repository) {
    // Inject the repository
    this.#repository = repository;
  }

  async create() {}

  async getAll(queries) {
    let products = await this.#repository.getAll(queries);

    if (queries.category && !products.length) {
      const err = new Error(
        `The category ${queries.category} is not a valid category`,
      );
      err.status = 400;
      throw err;
    }

    return products;
  }

  async getProductBySku({ sku }) {
    const product = await this.#repository.getBySku(sku);

    if (!product || product.length === 0) {
      const err = new Error("The product doesn't exist");
      err.status = 404;
      throw err;
    }

    return product;
  }

  async createProduct(body) {
    const product = await this.#repository.getBySku(body.sku);

    if (product) {
      console.log("existe");
      const err = new Error("The product already exist in the database");
      err.status = 400;
      throw err;
    }

    const {
      sku,
      name,
      brand,
      category,
      price_usd,
      stock,
      image_url,
      is_active,
    } = body;

    const allProducts = await this.#repository.getAll();
    const id = allProducts.length + 1;
    const newProduct = new Product(
      id,
      sku,
      name,
      brand,
      category,
      price_usd,
      stock,
      is_active,
      image_url,
    );

    const result = await this.#repository.create(newProduct);

    return result;
  }
}

export default ProductService;
