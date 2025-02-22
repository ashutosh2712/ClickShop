import React, { useEffect, useState } from "react";
import cross from "../../assets/delete-button.png";
import check from "../../assets/check.png";
import edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../../actions/userAction";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import ConfirmationPopup from "../../components/ConfirmationPopup";

const UserListPage = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const navigate = useNavigate();

  const [showConfirmation, setShowConfirmation] = useState({
    isloading: false,
  });
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
    // dispatch(listUsers());
  }, [dispatch, successDelete, userInfo]);

  const deleteHandler = (id) => {
    setShowConfirmation({ isloading: true });
    setUserIdToDelete(id);
  };

  const confirmDeleteHandler = () => {
    dispatch(deleteUser(userIdToDelete));
    setShowConfirmation({ isloading: false });
    setUserIdToDelete(null);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmation({ isloading: false });
    setUserIdToDelete(null);
  };

  return (
    <div className="userListPageContainer">
      <div className="userProfileOrder">
        <h2>Users</h2>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message className="errorMessage">{`Something went Wrong:${error}`}</Message>
        ) : (
          <table className="userTable">
            <thead>
              <tr>
                <th className="userTableTh">ID</th>
                <th className="userTableTh">NAME</th>
                <th className="userTableTh">EMAIL</th>
                <th className="userTableTh">ADMIN</th>
                <th className="userTableTh">modify</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="userTableTd">{user._id}</td>
                  <td className="userTableTd">{user.username}</td>
                  <td className="userTableTd">{user.email}</td>
                  <td className="userTableTd">
                    {user.isAdmin ? (
                      <img src={check} alt="cross" />
                    ) : (
                      <img src={cross} alt="cross" />
                    )}
                  </td>
                  <td className="userTableTd">
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <img src={edit} alt="cross" />
                    </Link>

                    <img
                      src={Delete}
                      alt="cross"
                      onClick={() => deleteHandler(user._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showConfirmation.isloading && (
          <ConfirmationPopup
            onConfirm={confirmDeleteHandler}
            onCancel={cancelDeleteHandler}
          />
        )}
      </div>
    </div>
  );
};

export default UserListPage;
