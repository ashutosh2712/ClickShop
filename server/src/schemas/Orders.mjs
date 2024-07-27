import mongoose from "mongoose";
const { Schema, model } = mongoose;
import { orderItemSchema } from "./OrderItems.mjs";

const orderSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", require: true },
  shippingAddressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShippingAddress",
    require: true,
  },
  orderItems: { type: [orderItemSchema], require: true },
  paymentMethod: String,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  delideredAt: Date,
  createdAt: { type: Date, default: Date.now },
});

export const Orders = model("Orders", orderSchema);
