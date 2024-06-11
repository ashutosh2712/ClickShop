import React from "react";
import ShopCart from "../assets/trolley-cart.png";
import Admin from "../assets/setting.png";
import Avatar from "../assets/office-man.png";
import { Link } from "react-router-dom";
const Navbar = () => {
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
        <div className="navCart">
          {/* <i className="fas fa-shopping-cart"></i> */}
          <img src={ShopCart} alt="cart" className="cartImg" />
          <p>Cart</p>
        </div>

        <div className="navAdmin">
          <img src={Admin} alt="cart" className="cartImg" />
          <p>Admin</p>
        </div>
        <Link to="/login">
          <div className="navUser">
            <img src={Avatar} alt="cart" className="cartImg" />
            <p>Brock</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
