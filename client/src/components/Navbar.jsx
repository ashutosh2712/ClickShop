import React, { useState } from "react";
import ShopCart from "../assets/trolley-cart.png";
import Admin from "../assets/setting.png";
import Avatar from "../assets/office-man.png";
import LoginImg from "../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
const Navbar = () => {
  const [userDiv, setUserDiv] = useState(false);
  const [adminDiv, setAdminDiv] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const toggleInfoVisibility = () => {
    setUserDiv(!userDiv);
  };

  const toggleAdminInfoVisibility = () => {
    setAdminDiv(!adminDiv);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="navContainer">
      <div className="navLeft">
        <Link to="/">
          <h1>Clickshop</h1>
        </Link>
      </div>

      <div className="navCenter">
        <input
          type="text"
          placeholder="Search Your Products"
          className="navSearch"
        />
        <button type="submit" className="btn">
          SEARCH
        </button>
      </div>

      <div className="navRight">
        <Link to="/cart">
          <div className="navCart">
            {/* <i className="fas fa-shopping-cart"></i> */}
            <img src={ShopCart} alt="cart" className="cartImg" />
            <p>Cart</p>
          </div>
        </Link>

        <button className="navAdmin" onClick={toggleAdminInfoVisibility}>
          <img src={Admin} alt="cart" className="cartImg" />
          <p>Admin</p>
          {adminDiv && (
            <div className="adminProfile">
              <ul className="adminDropdownContent">
                <Link to="/admin/userlist">
                  <li className="dropdownList">Users</li>
                </Link>
                <Link to="/admin/productlist">
                  <li className="dropdownList">Products</li>
                </Link>
                <Link to="/admin/orderlist">
                  <li className="dropdownList">Orders</li>
                </Link>
              </ul>
            </div>
          )}
        </button>

        {userInfo ? (
          <button className="navUser" onClick={toggleInfoVisibility}>
            <img src={Avatar} alt="cart" className="cartImg" />
            <p>{userInfo.username}</p>
            {userDiv && (
              <div className="userProfile">
                <ul className="userDropdownContent">
                  <Link to="/userprofile">
                    <li className="dropdownList">Profile</li>
                  </Link>
                  <li className="dropdownList" onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </button>
        ) : (
          <Link to="/login">
            <button className="navUser" onClick={toggleInfoVisibility}>
              <img src={LoginImg} alt="cart" className="cartImg" />
              <p>Login</p>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
