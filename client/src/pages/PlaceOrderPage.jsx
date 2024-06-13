import React from "react";
import products from "../data/products";
const PlaceOrderPage = () => {
  return (
    <div className="placeOrderContainer">
      <div className="leftPlaceOrderDetails">
        <div className="placeOrderDetails">
          <h2>Shipping</h2>
          <p>
            <b>Shipping:</b> Las Veags Navada,USA,100001
          </p>
        </div>
        <div className="placeOrderDetails">
          <h2>Payment Method</h2>
          <p>
            <b>Method:</b> Paytm
          </p>
        </div>
        <div className="placeOrderDetails">
          <h2>Order Items</h2>
          {products.map((product) => (
            <div className="placeOrderProductDetails">
              <img
                src={product.image}
                alt={product.name}
                className="placeOrderProductImg"
              />
              <p>{product.name}</p>
              <p>1 X ${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="placeOrderSummary">
        <div className="orderSummaryDetails">
          <h2>Order Summary</h2>
        </div>
        <div className="orderSummaryDetails">
          <p>Items:</p>
          <p>$1200</p>
        </div>
        <div className="orderSummaryDetails">
          <p>Shipping:</p>
          <p>$120</p>
        </div>
        <div className="orderSummaryDetails">
          <p>Taxes:</p>
          <p>$20</p>
        </div>
        <div className="orderSummaryDetails">
          <p>Total:</p>
          <p>$3700</p>
        </div>
        <div className="orderSummaryDetails">
          <button type="submit" className="btn-cart">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
