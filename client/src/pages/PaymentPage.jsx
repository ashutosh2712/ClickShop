import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartAction";
const PaymentPage = () => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const handlePayment = (e) => {
    e.preventDefault();
    console.log("Payment Method", paymentMethod);
    console.log("paymentMethod value", e.target.value);
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="paymentContainer">
      <CheckoutSteps step1 step2 step3 />
      <h2>Select Option</h2>

      <form onSubmit={handlePayment} className="selectPayment">
        <label htmlFor="paymentOption" className="paymentOption">
          <input
            type="radio"
            name="paymentOption"
            id="paymentOption"
            checked
            onchange={(e) => setPaymentMethod(e.target.value)}
            value="Paypal"
          />
          <small>Select Paypal or Credit Card</small>
        </label>

        <button type="submit" className="btn-cart">
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
