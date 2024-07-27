import mongoose from "mongoose";
const { Schema, model } = mongoose;

const shippingAddresSchema = new Schema({
  address: String,
  city: String,
  postalCode: String,
  country: String,
  shippingPrice: Number,
});

export const ShippingAddress = model("ShippingAddress", shippingAddresSchema);
