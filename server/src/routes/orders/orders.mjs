import { Router } from "express";
import authenticatedUser from "../../middlewares/authenticatedUser.mjs";
import adminAuthenticated from "../../middlewares/adminAuthenticated.mjs";
import { ShippingAddress } from "../../schemas/ShippingAddress.mjs";

import { Products } from "../../schemas/Products.mjs";
import { Orders } from "../../schemas/Orders.mjs";

const router = Router();

router.post("/order/create", authenticatedUser, async (request, response) => {
  const user = request.user;

  const {
    shippingAddress,
    orderItems,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = request.body;

  try {
    // # 1 Creating shipping addrress
    const newShippingAddress = new ShippingAddress(shippingAddress);
    const createdShippingAddress = await newShippingAddress.save();

    // # 2 Creating OrdersItems
    const createdOrderItems = [];
    for (let item of orderItems) {
      const product = await Products.findById(item.productId);

      if (!product) {
        return response.status(404).json({
          message: `product with given id:${item.productId} not found`,
        });
      }

      createdOrderItems.push({
        productId: product._id,
        name: product.name,
        qty: item.qty,
        price: item.price,
        image: product.image,
      });

      product.countInStock -= item.qty;
      await product.save();
    }

    // # 3 Creating Order

    const newOrder = new Orders({
      userId: user._id,
      shippingAddressId: createdShippingAddress._id,
      orderItems: createdOrderItems,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: false,
      paidAt: null,
      isDelivered: false,
      delideredAt: null,
    });

    const savedOrder = await newOrder.save();

    response.status(200).json(savedOrder);
  } catch (error) {
    console.log("Error while creating order : ", error);
    response.status(500).json({ message: "Error Creating Orders" });
  }
});

router.get(
  "/orders",
  authenticatedUser,
  adminAuthenticated,
  async (request, response) => {
    try {
      const orders = await Orders.find();
      response.status(200).json(orders);
    } catch (error) {
      console.log("Error while getting orders : ", error);
      response.status(500).json({ message: "Error getting Orders" });
    }
  }
);

router.get(
  "/myorders",
  authenticatedUser,

  async (request, response) => {
    const userId = request.user._id;
    try {
      const orders = await Orders.find({ userId });
      response.status(200).json(orders);
    } catch (error) {
      console.log("Error while getting orders : ", error);
      response.status(500).json({ message: "Error getting Orders" });
    }
  }
);

router.get(
  "/order/:id",
  authenticatedUser,

  async (request, response) => {
    const userId = request.user._id;
    const { id } = request.params;

    try {
      //Normal User
      var orders = null;
      if (request.user.isAdmin) {
        //admin user
        orders = await Orders.findById(id)
          .populate("userId", "username email")
          .populate("shippingAddressId");
      } else {
        orders = await Orders.findByOne({ _id: id, userId })
          .populate("userId", "username email")
          .populate("shippingAddressId");
      }
      if (!orders) {
        return response.status(404).json({ message: "Order not found" });
      }

      response.status(200).json(orders);
    } catch (error) {
      console.log("Error while getting orders : ", error);
      response.status(500).json({ message: "Error getting Orders" });
    }
  }
);

router.patch("/order/:id/pay", authenticatedUser, async (request, response) => {
  const { id } = request.params;

  try {
    const order = await Orders.findById(id);

    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();

    response.status(200).json(order);
  } catch (error) {
    console.log("Error while getting orders : ", error);
    response.status(500).json({ message: "Error getting Orders" });
  }
});

router.patch(
  "/order/:id/delivered",
  authenticatedUser,
  adminAuthenticated,
  async (request, response) => {
    const { id } = request.params;

    try {
      const order = await Orders.findById(id);

      order.isDelivered = true;
      order.delideredAt = Date.now();
      await order.save();

      response.status(200).json(order);
    } catch (error) {
      console.log("Error while getting orders : ", error);
      response.status(500).json({ message: "Error getting Orders" });
    }
  }
);

export default router;
