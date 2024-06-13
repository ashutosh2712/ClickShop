import React from "react";
import { Link } from "react-router-dom";

const ShippingPage = () => {
  return (
    <div className="authContainer">
      <h2>Shipping</h2>
      <form className="authFormContainer">
        <label htmlFor="address">
          <b>Address</b>
        </label>
        <input
          type="text"
          placeholder="Your Address"
          className="formInput shippingInput"
        />

        <label htmlFor="city">
          <b>City</b>
        </label>
        <input
          type="text"
          placeholder="Your City"
          className="formInput shippingInput"
        />

        <label htmlFor="postalcode">
          <b>Postal Code</b>
        </label>
        <input
          type="text"
          placeholder="Your Postal Code"
          className="formInput shippingInput"
        />

        <label htmlFor="country">
          <b>Country</b>
        </label>
        <input
          type="text"
          placeholder="Your Country"
          className="formInput shippingInput"
        />
        <Link to="/payment">
          <button type="submit" className="btn-cart">
            Continue
          </button>
        </Link>
      </form>
      <p>
        Already have an account ?{" "}
        <Link to="/login" className="ToogleLink">
          Login
        </Link>
      </p>
    </div>
  );
};

export default ShippingPage;
