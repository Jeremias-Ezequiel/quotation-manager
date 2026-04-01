// Require the service and repository
import ProductJsonRepository from "../repositories/productJsonRepository.js";
import ProductService from "../services/productService.js";

const service = new ProductService(new ProductJsonRepository());

class ProductController {
  getAll = async (req, res) => {
    try {
      const result = await service.getAll();
      res.status(200).json({ statusCode: 200, data: result });
    } catch (err) {
      res.status(404).json({ statusCode: 404, message: err });
    }
  };
}

export default new ProductController();
