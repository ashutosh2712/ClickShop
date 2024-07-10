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
  paidAt: timestamp,
  isDelivered: { type: Boolean, default: false },
  delideredAt: Date,
  createdAt: { type: Date, default: Date.now },
});

export const Orders = model("Orders", orderSchema);
