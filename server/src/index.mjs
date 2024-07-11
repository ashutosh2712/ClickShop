import express from "express";
import mongoose from "mongoose";
import testRouter from "./routes/test.mjs";
import productRouter from "./routes/products/products.mjs";
const app = express();
app.use(express.json());
app.use("/api", testRouter);
app.use("/api", productRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express Server started and Listening at ${PORT}`);
  console.log("http://localhost:3000");
});

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(console.log("MongoDB Connection successful!"))
  .catch((err) => console.log(`Error While Connecting to MDB ${err}`));
