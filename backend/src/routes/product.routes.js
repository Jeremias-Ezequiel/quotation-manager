import { Router } from "express";
import controller from "../controllers/product.controller.js";

const router = Router();

router.get("/products", controller.getAll);

export default router;
