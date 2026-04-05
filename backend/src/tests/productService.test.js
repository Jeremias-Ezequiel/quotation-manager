import productService from "../services/productService.js";
import { expect, it, jest } from "@jest/globals";

describe("Service: ProductService", () => {
  let service;
  // Repositorio falso ya que no deberíamos interactuar directamnte con la base de datos
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getBySku: jest.fn(),
      getAll: jest.fn(),
    };

    service = new productService(mockRepository);
  });

  describe("Method: GetBySku", () => {
    it("Should throw a 404 error if the product does not exist in the repository", async () => {
      mockRepository.getBySku.mockResolvedValue(null);

      await expect(
        service.getProductBySku("TEST-PARA-ADISTEC"),
      ).rejects.toThrow("The product doesn't exist");
    });

    it("Should return the correc product", async () => {
      const productoFalso = { sku: "XXX-XXX-XXX", name: "Test 2" };
      mockRepository.getBySku.mockResolvedValue(productoFalso);

      const result = await service.getProductBySku("XXX-XXX-XXX");
      expect(result.name).toBe("Test 2");
    });
  });

  describe("Method: GetAll", () => {
    it("Should return an array of products", async () => {
      const queries = {};
      const products = [
        { sku: 1, name: "test1", category: "test" },
        { sku: 2, name: "test2", category: "test" },
      ];
      mockRepository.getAll.mockResolvedValue(products);

      const result = await service.getAll(queries);
      expect(result.length).toBe(2);
    });

    it("Should return an error if the category does not exist", async () => {
      const queries = { category: "noexisto" };
      const products = [
        { sku: 1, name: "test1", category: "test" },
        { sku: 2, name: "test2", category: "test" },
      ];
      mockRepository.getAll.mockResolvedValue(products);

      await expect(service.getAll(queries)).rejects.toThrow(
        `The category ${queries.category} is not a valid category`,
      );
    });
  });
});
