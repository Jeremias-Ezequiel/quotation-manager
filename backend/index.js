import express from "express";
import "dotenv/config";

const app = express();

app.use((req, res) => {
  res.json("Hello world");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server on: http://localhost:${PORT}`);
});
