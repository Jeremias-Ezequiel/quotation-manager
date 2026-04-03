class ProductService {
  #repository;

  constructor(repository) {
    // Inject the repository
    this.#repository = repository;
  }

  async create() {}

  async getAll(queries) {
    const { category, sort, search } = queries;

    let products = await this.#repository.getAll();

    // ByCategories
    if (category && category !== "all") {
      products = products.filter((p) => p.category === category);
      if (!products.length) {
        throw new Error(`The category ${category} is not a valid category.`);
      }
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

  async getProductBySku({ sku }) {
    const regexPattern = /^[A-Z0-9]{3,}-[A-Z0-9]{3,}-[A-Z0-9]{3,}$/;

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
