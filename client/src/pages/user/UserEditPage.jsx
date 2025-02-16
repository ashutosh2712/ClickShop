import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../../actions/userAction";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { USER_UPDATE_RESET } from "../../constants/userConstants";

const UserEditPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { id: userId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.username || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.username);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId]);

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("isAdmin", isAdmin);
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <div className="userEditContainer">
      <Link to="/admin/userlist" className="returnLink">
        <button className="btn-cart">GO BACK</button>
      </Link>
      <div className="userProfileUpdate">
        <h2>Edit User</h2>
        {loadingUpdate && <Loading />}{" "}
        {errorUpdate && (
          <Message className="errorMessage">{errorUpdate}</Message>
        )}{" "}
        {/* {successUpdate && (
          <Message className="successMessage">
            {"User Updated Successfully!"}
          </Message>
        )} */}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message className="errorMessage">{error}</Message>
        ) : (
          <form className="authFormContainer" onSubmit={handlesubmit}>
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="formInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">
              <b>Email Address</b>
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="formInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="isAdmin" className="isAdminCheck">
              <input
                type="checkbox"
                name="isAdmin"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              IsAdmin
            </label>
            <button type="submit" className="btn-cart">
              update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEditPage;
