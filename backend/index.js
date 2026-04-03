import express from "express";
import "dotenv/config";
import cors from "cors";

// Routes
import notFound from "./src/middlewares/NotFound.js";
import productRoute from "./src/routes/product.routes.js";
import exchangeRoute from "./src/routes/exchange-rates.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use("/api", productRoute);
app.use("/api", exchangeRoute);

// Show a message when the endpoint is incorrect
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server on: http://localhost:${PORT}`);
});
