import React from "react";
import { Link } from "react-router-dom";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="checkoutContainer">
      <div className="checkoutStepItem">
        {step1 ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link className="checkOutStepDisabled">Login</Link>
        )}
      </div>
      <div className="checkoutStepItem">
        {step2 ? (
          <Link to="/shipping">Shipping</Link>
        ) : (
          <Link className="checkOutStepDisabled">Shipping</Link>
        )}
      </div>
      <div className="checkoutStepItem">
        {step3 ? (
          <Link to="/payment">Payment</Link>
        ) : (
          <Link className="checkOutStepDisabled">Payment</Link>
        )}
      </div>
      <div className="checkoutStepItem">
        {" "}
        {step4 ? (
          <Link to="/placeorder">Place Order</Link>
        ) : (
          <Link className="checkOutStepDisabled">Place Order</Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
