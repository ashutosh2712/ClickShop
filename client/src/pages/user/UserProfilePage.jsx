import React, { useEffect, useState } from "react";
import cross from "../../assets/delete-button.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../../actions/userAction";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
const UserProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(userInfo.username);
        setEmail(userInfo.email);
      }
    }
  }, [userInfo, user, success]);

  const handlesubmit = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage("*Password Does not Match!");
    } else {
      dispatch(
        updateUserProfile({
          _id: user._id,
          username: name,
          // name: user.first_name + " " + user.last_name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        })
      );
      setMessage("");
    }
  };

  return (
    <div className="userProfileContainer">
      <div className="userProfileUpdate">
        <h2>My Profile</h2>
        {loading && <Loading />}
        {message && <Message className="errorMessage">{message}</Message>}
        {error && <Message className="errorMessage">{error}</Message>}
        {success && (
          <Message className="successMessage">
            {"User Details Updated successfully!"}
          </Message>
        )}
        <form className="authFormContainer" onSubmit={handlesubmit}>
          <label htmlFor="name">
            <b>Your Name</b>
          </label>
          <input
            type="text"
            value={name}
            placeholder="Enter your Name"
            className="formInput"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">
            <b>Email Address</b>
          </label>
          <input
            type="email"
            value={email}
            placeholder="Enter your Email"
            className="formInput"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            value={password}
            placeholder="Enter your Password"
            className="formInput"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">
            <b>Confirm Password</b>
          </label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm your Password"
            className="formInput"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
