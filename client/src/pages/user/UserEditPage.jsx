import React from "react";
import { Link } from "react-router-dom";

const UserEditPage = () => {
  return (
    <div className="userEditContainer">
      <Link to="/admin/userlist" className="returnLink">
        <button className="btn-cart">GO BACK</button>
      </Link>
      <div className="userProfileUpdate">
        <h2>Edit User</h2>
        <form className="authFormContainer">
          <label htmlFor="name">
            <b>Name</b>
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
          <label htmlFor="isAdmin" className="isAdminCheck">
            <input type="checkbox" name="isAdmin" id="isAdmin" />
            IsAdmin
          </label>
          <button type="submit" className="btn-cart">
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEditPage;
