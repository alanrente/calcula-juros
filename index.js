import dotenv from "dotenv";
import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import route from "./app/routes/index.route.js";
import middleDebugMiddleware from "./app/middlewares/middleDebug.middleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(middleDebugMiddleware);
app.use("/", route);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Running on PORT: ${PORT}`);
});
