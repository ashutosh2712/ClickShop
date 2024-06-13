import React from "react";

const PaymentPage = () => {
  return (
    <div className="paymentContainer">
      <h2>Select Option</h2>

      <label htmlFor="paymentOption" className="selectPayment">
        <input type="radio" name="paymentOption" id="paymentOption" checked />
        <small>Select Paypal or Credit Card</small>
      </label>
      <button type="submit" className="btn-cart">
        Continue
      </button>
    </div>
  );
};

export default PaymentPage;
