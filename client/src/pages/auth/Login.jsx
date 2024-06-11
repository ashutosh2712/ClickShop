import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="authContainer">
      <h2>Login</h2>
      <form className="authFormContainer">
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
        <button type="submit" className="btn-cart">
          Login
        </button>
      </form>
      <p>
        New User ?{" "}
        <Link to="/register" className="ToogleLink">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
