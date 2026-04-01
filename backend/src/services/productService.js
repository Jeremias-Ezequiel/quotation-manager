class ProductService {
  #repository;

  constructor(repository) {
    // Inject the repository
    this.#repository = repository;
  }

  async create() {}

  async getAll() {
    const products = await this.#repository.getAll();
    return products;
  }

  async getById(id) {}
}

export default ProductService;
