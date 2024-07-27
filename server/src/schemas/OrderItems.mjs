import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    require: true,
  },
  name: String,
  qty: Number,
  price: Number,
  image: String,
});

export const OrderItems = model("OrderItems", orderItemSchema);
export { orderItemSchema };
