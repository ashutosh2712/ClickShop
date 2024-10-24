import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartAction";
const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <div className="authContainer">
      <h2>Shipping</h2>
      <form className="authFormContainer" onSubmit={handleSubmit}>
        <label htmlFor="address">
          <b>Address</b>
        </label>
        <input
          type="text"
          placeholder="Your Address"
          value={address ? address : ""}
          className="formInput shippingInput"
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="city">
          <b>City</b>
        </label>
        <input
          type="text"
          placeholder="Your City"
          value={city ? city : ""}
          className="formInput shippingInput"
          onChange={(e) => setCity(e.target.value)}
        />

        <label htmlFor="postalcode">
          <b>Postal Code</b>
        </label>
        <input
          type="text"
          placeholder="Your Postal Code"
          value={postalCode ? postalCode : ""}
          className="formInput shippingInput"
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <label htmlFor="country">
          <b>Country</b>
        </label>
        <input
          type="text"
          placeholder="Your Country"
          value={country ? country : ""}
          className="formInput shippingInput"
          onChange={(e) => setCountry(e.target.value)}
        />

        <button type="submit" className="btn-cart">
          Continue
        </button>
      </form>
    </div>
  );
};

export default ShippingPage;
