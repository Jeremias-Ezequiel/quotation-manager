import { Router } from "express";
import controller from "../controllers/product.controller.js";
import { clearQueryParams } from "../middlewares/CleanQueryParams.js";

const router = Router();

router.get("/products", clearQueryParams, controller.getAll);
router.get("/products/:sku", controller.getBySku);

export default router;
