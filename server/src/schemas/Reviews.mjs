import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", require: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    require: true,
  },
  name: String,
  rating: { type: String, require: true },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

export const Reviews = model("Reviews", reviewSchema);
