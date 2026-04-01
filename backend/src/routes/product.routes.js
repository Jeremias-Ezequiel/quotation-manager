import { Router } from "express";
import controller from "../controllers/product.controller.js";

const router = Router();

router.get("/products", controller.getAll);
// router.post("/api/products");

export default router;
