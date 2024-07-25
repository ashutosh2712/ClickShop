import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  first_name: String,
  last_name: String,
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Users = model("Users", userSchema);
