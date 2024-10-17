import { Router } from "express";
import { Users } from "../../schemas/Users.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authenticatedUser from "../../middlewares/authenticatedUser.mjs";
import adminAuthenticated from "../../middlewares/adminAuthenticated.mjs";
dotenv.config();

const router = Router();

router.post("/auth/register", async (request, response) => {
  const { username, email, password, confirmPassword } = request.body;

  const jwtSecret =
    "20741f1747b01f13a45dfcac48dcf33a96d242a8a365b0edc20c92d3a4936c21";

  try {
    const existUser = await Users.findOne({ email });

    //Check if the user exist
    if (existUser) {
      response.status(400).json({ error: "User Already Exist!" });
    }

    //Check if the password match
    if (password !== confirmPassword) {
      return response.status(200).json({ error: "Password do not matched!" });
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user in mongoDb
    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: savedUser._id, username: savedUser.username },
      jwtSecret,
      { expiresIn: "1hr" }
    );

    console.log("User Token:", token);
    response
      .status(201)
      .json({ username: savedUser.username, email: savedUser.email, token });
  } catch (error) {
    console.log("Error while creating registering users:", error);
    response.status(500);
  }
});

router.post("/auth/login", async (request, response) => {
  const { email, password } = request.body;
  const jwtSecret =
    "20741f1747b01f13a45dfcac48dcf33a96d242a8a365b0edc20c92d3a4936c21";

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      response.status(400).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return response.status(400).json({ error: "Password does not match!" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      jwtSecret,
      { expiresIn: "1hr" }
    );

    console.log("token:", token);

    response.json({ username: user.username, email: user.email, token });
  } catch (err) {
    console.log("Error while login users:", err);
    response.status(500);
  }
});

router.post("/auth/logout", (request, response) => {
  response.status(200).json({ message: "Logout successfully" });
});

//admin
router.get(
  "/users",
  authenticatedUser,
  adminAuthenticated,
  async (request, response) => {
    try {
      const users = await Users.find();
      response.status(200).json(users);
    } catch (err) {
      console.log("Error finding users", err);
      response.status(401);
    }
  }
);

//authenticated user
router.get("/user/profile", authenticatedUser, async (request, response) => {
  const authenticatedUser = request.user;

  try {
    const user = await Users.findById(authenticatedUser._id);

    const userResponse = {
      _id: user._id,
      username: user.username,
      name: user.first_name + " " + user.last_name,
      email: user.email,
    };
    response.status(200).json(userResponse);
  } catch (err) {
    console.log("Error finding user!", err);
    response.status(401).json({ error: "User Does not exist!" });
  }
});

//Admin user
router.get(
  "/user/:id",
  authenticatedUser,
  adminAuthenticated,
  async (request, response) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ error: "Invalid Id!" });
    }

    try {
      const user = await Users.findById(id);
      if (!user) {
        response.status(404).json({ error: "User Not found" });
      }
      response.status(200).json(user);
    } catch (err) {
      console.log("Error finding the user by its id", err);
      response.status(401);
    }
  }
);

// Authenticated Uaser
router.put("/update/profile/", authenticatedUser, async (request, response) => {
  const authenticatedUser = request.user;
  const { name, email, password, confirmPassword } = request.body;

  const [first_name, last_name] = name.split(" ");

  try {
    const user = await Users.findById(authenticatedUser._id);

    if (!user) {
      response.status(404).json({ error: "User Not found" });
    }

    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    if (password && confirmPassword) {
      if (password != confirmPassword) {
        return response.status(400).send({ message: "Passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    console.log("Error while updating User:", error);
    response.status(500);
  }
});

// Admin user
router.put(
  "/update/user/:id",
  authenticatedUser,
  adminAuthenticated,
  async (request, response) => {
    const { id } = request.params;
    const { name, email, isAdmin } = request.body;

    const [first_name, last_name] = name.split(" ");

    try {
      const user = await Users.findById(id);

      if (!user) {
        response.status(404).json({ error: "User Not found" });
      }

      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      user.isAdmin = isAdmin;

      const savedUser = await user.save();
      response.status(201).json(savedUser);
    } catch (error) {
      console.log("Error while updating User:", error);
      response.status(500);
    }
  }
);

//Admin user
router.delete(
  "/delete/user/:id",
  authenticatedUser,
  adminAuthenticated,
  async (request, response) => {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ error: "Invalid Id!" });
    }
    try {
      const deletedUser = await Users.findByIdAndDelete(id);

      if (!deletedUser) {
        response.status(404).json({ error: "User Not found" });
      }

      response.status(200).json({ message: "User Deleted!" });
    } catch (error) {
      console.log("Error while Deleting users:", error);
      response.status(500);
    }
  }
);
export default router;
