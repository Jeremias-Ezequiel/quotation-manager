import { Router } from "express";
import controller from "../controllers/product.controller.js";
import { clearQueryParams } from "../middlewares/CleanQueryParams.js";

const router = Router();

router.get("/products", clearQueryParams, controller.getAll);

export default router;
