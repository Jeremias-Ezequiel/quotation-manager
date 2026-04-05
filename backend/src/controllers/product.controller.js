// Require the service and repository
import ProductJsonRepository from "../repositories/productJsonRepository.js";
import ProductService from "../services/productService.js";

const service = new ProductService(new ProductJsonRepository());

class ProductController {
  getAll = async (req, res) => {
    try {
      const result = await service.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "products obtained correctly",
        data: result,
      });
    } catch (err) {
      const status = err.status || 500;
      return res.status(status).json({
        success: false,
        message: err.message,
        data: null,
      });
    }
  };

  getBySku = async (req, res) => {
    try {
      const result = await service.getProductBySku(req.params);

      return res.status(200).json({
        success: true,
        message: "Product obtained correctly",
        data: result,
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: err.message,
        data: null,
      });
    }
  };

  create = async (req, res) => {
    try {
      const result = await service.createProduct(req.body);

      return res.status(201).json({
        success: true,
        message: "product created successfully",
        data: result,
      });
    } catch (err) {
      const status = err.status || 500;
      return res.status(status).json({
        success: false,
        message: err.message,
        data: null,
      });
    }
  };
}

export default new ProductController();
