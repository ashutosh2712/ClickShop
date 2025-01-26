import React from "react";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector } from "react-redux";
const PlaceOrderPage = () => {
  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 25;
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrderHandler = () => {
    console.log("object");
  };
  return (
    <div style={{ marginTop: "2rem" }}>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeOrderContainer">
        <div className="leftPlaceOrderDetails">
          <div className="placeOrderDetails">
            <h2>Shipping</h2>
            <p>
              <b>Shipping:</b> {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.city}, {cart.shippingAddress.country},{" "}
              {cart.shippingAddress.postalCode}
            </p>
          </div>
          <div className="placeOrderDetails">
            <h2>Payment Method</h2>
            <p>
              <b>Method:</b> {cart.paymentMethod}
            </p>
          </div>
          <div className="placeOrderDetails">
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message className="warningMessage">
                <p>{"*Your Cart is empty"}</p>
                <Link to="/" className="returnLink goBackCart">
                  <button className="btn-cart">GO BACK</button>
                </Link>
              </Message>
            ) : (
              <>
                {" "}
                {cart.cartItems.map((product) => (
                  <Link
                    to={`/products/${product.product}`}
                    className="placeOrderProductDetails"
                    key={product.product}
                  >
                    <img
                      src={`http://localhost:3000/uploads/` + product.image}
                      alt={product.name}
                      className="placeOrderProductImg"
                    />
                    <p>{product.name}</p>
                    <p>
                      {product.qty} X ${product.price}
                    </p>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="placeOrderSummary">
          <div className="orderSummaryDetails">
            <h2>Order Summary</h2>
          </div>
          <div className="orderSummaryDetails">
            <p>
              <b>Items:</b>
            </p>
            <p>${cart.itemsPrice}</p>
          </div>
          <div className="orderSummaryDetails">
            <p>
              <b>Shipping:</b>
            </p>
            <p>${cart.shippingPrice}</p>
          </div>
          <div className="orderSummaryDetails">
            <p>
              <b>Taxes:</b>
            </p>
            <p>${cart.taxPrice}</p>
          </div>
          <div className="orderSummaryDetails">
            <p>
              <b>Total:</b>
            </p>
            <p>${cart.totalPrice}</p>
          </div>
          <div className="orderSummaryDetails">
            <button
              type="submit"
              className="btn-cart"
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
