import React from "react";
import { Link } from "react-router-dom";

const PaymentPage = () => {
  return (
    <div className="paymentContainer">
      <h2>Select Option</h2>

      <label htmlFor="paymentOption" className="selectPayment">
        <input type="radio" name="paymentOption" id="paymentOption" checked />
        <small>Select Paypal or Credit Card</small>
      </label>
      <Link to="/placeorder">
        <button type="submit" className="btn-cart">
          Continue
        </button>
      </Link>
    </div>
  );
};

export default PaymentPage;
