import { Router } from "express";
const router = Router();
import exchangeRatesController from "../controllers/exchange-rates.controller.js";

router.get(
  "/exchange-rates/official",
  exchangeRatesController.getOfficialChange,
);

export default router;
