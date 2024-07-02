import React, { useState } from "react";
import ShopCart from "../assets/trolley-cart.png";
import Admin from "../assets/setting.png";
import Avatar from "../assets/office-man.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [userDiv, setUserDiv] = useState(false);

  const toggleInfoVisibility = () => {
    setUserDiv(!userDiv);
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

        <div className="navAdmin">
          <img src={Admin} alt="cart" className="cartImg" />
          <p>Admin</p>
        </div>

        <button className="navUser" onClick={toggleInfoVisibility}>
          <img src={Avatar} alt="cart" className="cartImg" />
          <p>Brock</p>
          {userDiv && (
            <div className="userProfile">
              <ul className="userDropdownContent">
                <Link to="/userprofile">
                  <li className="dropdownList">Profile</li>
                </Link>
                <li className="dropdownList">Logout</li>
              </ul>
            </div>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
