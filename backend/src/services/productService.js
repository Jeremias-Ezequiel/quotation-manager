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
    const regexPattern = /^([A-Z0-9]{2,}-){2}[A-Z0-9]{2,}(-[A-Z0-9]{2,})?$/;

    if (!regexPattern.test(sku)) {
      const err = new Error("Invalid SKU: xxx-xxx-xxx");
      err.status = 400;
      throw err;
    }

    const product = await this.#repository.getBySku(sku);

    if (!product || product.length === 0) {
      const err = new Error("The product doesn't exist");
      err.status = 404;
      throw err;
    }

    return product;
  }
}

export default ProductService;
