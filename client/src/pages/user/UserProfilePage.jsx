import React from "react";
import cross from "../../assets/delete-button.png";
const UserProfilePage = () => {
  return (
    <div className="userProfileContainer">
      <div className="userProfileUpdate">
        <h2>My Profile</h2>
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
            update
          </button>
        </form>
      </div>
      <div className="userProfileOrder">
        <h2>My Orders</h2>
        <table className="userTable">
          <thead>
            <tr>
              <th className="userTableTh">ID</th>
              <th className="userTableTh">DATE</th>
              <th className="userTableTh">TOTAL</th>
              <th className="userTableTh">PAID</th>
              <th className="userTableTh"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="userTableTd">1</td>
              <td className="userTableTd">2024-03-31</td>
              <td className="userTableTd">$302.95</td>
              <td className="userTableTd">2024-06-08</td>
              <td className="userTableTd">
                <button className="btn-cart">Details</button>
              </td>
            </tr>
            <tr>
              <td className="userTableTd">2</td>
              <td className="userTableTd">2024-03-31</td>
              <td className="userTableTd">$33.95</td>
              <td className="userTableTd">2024-06-08</td>
              <td className="userTableTd">
                <button className="btn-cart">Details</button>
              </td>
            </tr>
            <tr>
              <td className="userTableTd">3</td>
              <td className="userTableTd">2024-03-31</td>
              <td className="userTableTd">$32.95</td>
              <td className="userTableTd">
                <img src={cross} alt="cross" />
              </td>
              <td className="userTableTd">
                <button className="btn-cart">Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfilePage;
