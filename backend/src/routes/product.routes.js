import { Router } from "express";
import controller from "../controllers/product.controller.js";
import { cleanQueryParams } from "../middlewares/CleanQueryParams.js";
import { skuHandler } from "../middlewares/SkuHandler.js";

const router = Router();

router.get("/products", cleanQueryParams, controller.getAll);
router.get("/products/:sku", skuHandler, controller.getBySku);

export default router;
