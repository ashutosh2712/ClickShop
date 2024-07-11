import { Router } from "express";
import { Products } from "../../schemas/Products.mjs";
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
router.post("/create/product", async (request, response) => {
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
});

export default router;
