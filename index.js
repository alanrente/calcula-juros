import dotenv from "dotenv";
import express from "express";
import { index } from "./app/routes/index.route.js";

dotenv.config();

const app = express();

index(app);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Running on PORT: ${PORT}`);
});
