import React from "react";
import products from "../../data/products";
import PaypalImg from "../../assets/StandardCheckout.png";
const OrderPage = () => {
  return (
    <div className="orderPageContainer">
      {/* <h1>Order : 1</h1> */}
      <div className="leftPlaceOrderDetails">
        <h1 className="orderNo">Order : 1</h1>
        <div className="orderDetails">
          <h2>Shipping</h2>
          <p className="shippingDetailsInfo">
            <b>Name: </b> Fitness Freak Computer Geek
          </p>
          <p className="shippingDetailsInfo">
            <b>Email: </b>fitness@gmail.com
          </p>
          <p className="shippingDetailsInfo">
            <b>Shipping: </b> Las Veags Navada,USA,100001
          </p>
          <button className="warningMessage">Not Delivered</button>
        </div>
        <div className="placeOrderDetails">
          <h2>Payment Method</h2>
          <p className="shippingDetailsInfo">
            <b>Method: </b> PayPal
          </p>
          <button className="warningMessage">Not Paid</button>
        </div>
        <div className="placeOrderDetails">
          <h2 style={{ marginBottom: "1rem" }}>Order Items</h2>
          {products.map((product) => (
            <div className="placeOrderProductDetails">
              <img
                src={product.image}
                alt={product.name}
                className="placeOrderProductImg"
              />
              <p>{product.name}</p>
              <p>
                1 X ${product.price} = ${product.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="orderSummary">
        <div className="orderSummaryHeading">
          <h2>Order Summary</h2>
        </div>
        <div className="orderSummaryDetails">
          <p>
            <b>Items:</b>
          </p>
          <p>$1200</p>
        </div>
        <div className="orderSummaryDetails">
          <p>
            <b>Shipping:</b>
          </p>
          <p>$120</p>
        </div>
        <div className="orderSummaryDetails">
          <p>
            <b>Taxes:</b>
          </p>
          <p>$20</p>
        </div>
        <div className="orderSummaryDetails">
          <p>
            <b>Total:</b>
          </p>
          <p>$3700</p>
        </div>
        <div className="orderSummaryDetails">
          <img src={PaypalImg} alt="paypalImg" className="paypalImg" />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
