import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../actions/userAction";
import Loading from "../../components/Loading";
import Message from "../../components/Message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo]);

  const handlesubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div className="authContainer">
      <h2>Login</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message className="errorMessage">{error}</Message>
      ) : (
        <form className="authFormContainer" onSubmit={handlesubmit}>
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
          <button type="submit" className="btn-cart">
            Login
          </button>
        </form>
      )}
      <p>
        New User ?{" "}
        <Link
          to={redirect ? `/register?redirect=${redirect}` : "/register"}
          className="ToogleLink"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
