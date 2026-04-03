// Require the service and repository
import ProductJsonRepository from "../repositories/productJsonRepository.js";
import ProductService from "../services/productService.js";

const service = new ProductService(new ProductJsonRepository());

class ProductController {
  getAll = async (req, res) => {
    try {
      const result = await service.getAll(req.query);

      res.status(200).json({
        success: true,
        message: "products obtained correctly",
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
        data: null,
      });
    }
  };

  getBySku = async (req, res) => {
    try {
      const result = await service.getProductBySku(req.params);

      res.status(200).json({
        success: true,
        message: "Product obtained correctly",
        data: result,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message,
        data: null,
      });
    }
  };
}

export default new ProductController();
