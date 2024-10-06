import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import { register } from "../../actions/userAction";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo]);

  const handlesubmit = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      <Message className="errorMessage">{"*Password Does not Match!"}</Message>;
    } else {
      dispatch(register(username, email, password, confirmPassword));
    }
  };
  return (
    <div className="authContainer">
      <h2>Register</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message className="errorMessage">{error}</Message>
      ) : (
        <form className="authFormContainer" onSubmit={handlesubmit}>
          <label htmlFor="name">
            <b>Your Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter your Name"
            className="formInput"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">
            <b>Email Address</b>
          </label>
          <input
            type="email"
            placeholder="Enter your Email"
            className="formInput"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter your Password"
            className="formInput"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">
            <b>Confirm Password</b>
          </label>
          <input
            type="password"
            placeholder="Confirm your Password"
            className="formInput"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="btn-cart">
            Register
          </button>
        </form>
      )}
      <p>
        Already have an account ?{" "}
        <Link
          to={redirect ? `/login?redirect=${redirect}` : "/login"}
          className="ToogleLink"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
