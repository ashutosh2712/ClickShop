import { Router } from "express";
import { Products } from "../../schemas/Products.mjs";
import mongoose from "mongoose";
import adminAuthenticated from "../../middlewares/adminAuthenticated.mjs";
import authenticatedUser from "../../middlewares/authenticatedUser.mjs";
import multer from "multer";
import { Reviews } from "../../schemas/Reviews.mjs";
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

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
  authenticatedUser,
  adminAuthenticated,
  upload.single("image"),
  async (request, response) => {
    const { name, brand, category, description, rating, price, countInStock } =
      request.body;
    let image = null;
    if (request.file) {
      image = request.file.filename;
    } else {
      image = "sample.jpg";
    }

    const newProduct = new Products({
      name,
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
    const {
      name,
      image,
      brand,
      category,
      description,
      rating,
      price,
      countInStock,
    } = request.body;
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ error: "Invalid Id!" });
    }

    try {
      const product = await Products.findById(id);

      if (!product) {
        response.status(404).json({ error: "Product Not found" });
      }
      product.name = name;
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
  authenticatedUser,
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

//authentication required
router.post(
  "/products/:id/review",
  authenticatedUser,
  authenticatedUser,
  async (request, response) => {
    const user = request.user;
    const { id } = request.params;
    const { rating, comment } = request.body;

    try {
      const product = await Products.findById(id);

      if (!product) {
        return response.status(404).json({ error: "Product not found" });
      }

      //Check if product already reviewed by user
      const alreadyReviewed = await Reviews.findOne({
        userId: user._id,
        productId: id,
      });

      if (alreadyReviewed) {
        return response
          .status(400)
          .json({ error: "Product already reviewed by you!" });
      }

      //check if rating is not provided
      if (parseFloat(rating) === 0) {
        return response.status(400).json({ error: "Rating can't be zero" });
      }
      //create review
      const review = new Reviews({
        userId: user._id,
        productId: id,
        name: user.username,
        rating,
        comment,
      });

      await review.save();

      //update numer of reviews for product
      const reviews = await Reviews.find({ productId: id });

      const toatalRating = reviews.reduce(
        (acc, item) => acc + parseFloat(item.rating),
        0
      );

      const avgRating = toatalRating / reviews.length;

      product.rating = avgRating;
      product.numReviews = reviews.length;

      await product.save();

      response.status(201).json({ message: "Product reviewed!", review });
    } catch (error) {
      console.log("Error while creating reviews:", error);
      response.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
