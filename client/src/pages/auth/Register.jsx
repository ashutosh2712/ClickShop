import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="authContainer">
      <h2>Register</h2>
      <form className="authFormContainer">
        <label htmlFor="name">
          <b>Your Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter your Name"
          className="formInput"
        />

        <label htmlFor="email">
          <b>Email Address</b>
        </label>
        <input
          type="email"
          placeholder="Enter your Email"
          className="formInput"
        />
        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter your Password"
          className="formInput"
        />

        <label htmlFor="confirmPassword">
          <b>Confirm Password</b>
        </label>
        <input
          type="password"
          placeholder="Confirm your Password"
          className="formInput"
        />
        <button type="submit" className="btn-cart">
          Register
        </button>
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

export default Register;
