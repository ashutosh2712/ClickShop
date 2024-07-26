import { Router } from "express";
import { Products } from "../../schemas/Products.mjs";
import mongoose from "mongoose";
import adminAuthenticated from "../../middlewares/adminAuthenticated.mjs";
const router = Router();

router.get("/products", async (request, response) => {
  try {
    const products = await Products.find();
    response.status(200).json(products);
  } catch (err) {
    console.log("Error finding products", err);
    response.status(401);
  }
});

router.get("/top/products", async (request, response) => {
  try {
    const topProducts = await Products.find({ rating: { $gt: 4 } })
      .sort({ rating: -1 })
      .limit(5);
    response.status(200).json(topProducts);
  } catch (err) {
    console.log("Error finding products", err);
    response.status(401);
  }
});

router.get("/products/:id", async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: "Invalid Id!" });
  }

  try {
    const product = await Products.findById(id);
    if (!product) {
      response.status(404).json({ error: "Product Not found" });
    }
    response.status(200).json(product);
  } catch (err) {
    console.log("Error finding the product by the id", err);
    response.status(401);
  }
});

//authentication required
router.post(
  "/create/product",
  adminAuthenticated,
  async (request, response) => {
    const { image, brand, category, description, rating, price, countInStock } =
      request.body;

    const newProduct = new Products({
      image,
      brand,
      category,
      description,
      rating,
      price,
      countInStock,
    });

    try {
      const savedProduct = await newProduct.save();
      response.status(201).json(savedProduct);
    } catch (error) {
      console.log("Error while creating products:", error);
      response.status(500);
    }
  }
);

router.put(
  "/update/product/:id",
  adminAuthenticated,
  async (request, response) => {
    const { image, brand, category, description, rating, price, countInStock } =
      request.body;
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ error: "Invalid Id!" });
    }

    try {
      const product = await Products.findById(id);

      if (!product) {
        response.status(404).json({ error: "Product Not found" });
      }

      product.image = image;
      product.brand = brand;
      product.category = category;
      product.description = description;
      product.rating = rating;
      product.price = price;
      product.countInStock = countInStock;

      const savedProduct = await product.save();
      response.status(201).json(savedProduct);
    } catch (error) {
      console.log("Error while updating products:", error);
      response.status(500);
    }
  }
);

router.delete(
  "/delete/product/:id",
  adminAuthenticated,
  async (request, response) => {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ error: "Invalid Id!" });
    }
    try {
      const deletedProduct = await Products.findByIdAndDelete(id);

      if (!deletedProduct) {
        response.status(404).json({ error: "Product Not found" });
      }

      response.status(200).json({ message: "Product Deleted!" });
    } catch (error) {
      console.log("Error while Deleting products:", error);
      response.status(500);
    }
  }
);

export default router;
