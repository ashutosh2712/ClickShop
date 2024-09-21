import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, require: true },
  image: String,
  brand: String,
  category: String,
  description: String,
  rating: Number,
  numReviews: Number,
  price: Number,
  countInStock: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  createdAt: { type: Date, default: Date.now },
});

export const Products = model("Products", productSchema);
