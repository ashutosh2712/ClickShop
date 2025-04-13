import express from "express";
import mongoose from "mongoose";
import testRouter from "./routes/test.mjs";
import productRouter from "./routes/products/products.mjs";
import userRouter from "./routes/auth/users.mjs";
import orderRouter from "./routes/orders/orders.mjs";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// import path from "path";
// import { fileURLToPath } from "url";

// // This resolves __dirname since it's not available in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
app.use(express.json());
app.use(express.static("src"));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);
app.use("/api", testRouter);
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express Server started and Listening at ${PORT}`);
  console.log("http://localhost:3000");
});

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  //.connect("mongodb://root:Mongo12345@db:27017/ecommerce?authSource=admin")
  .then(console.log("MongoDB Connection successful!"))
  .catch((err) => console.log(`Error While Connecting to MDB ${err}`));
