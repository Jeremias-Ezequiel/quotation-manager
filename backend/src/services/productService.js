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
}

export default ProductService;
