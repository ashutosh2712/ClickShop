import React, { useEffect } from "react";
import cross from "../../assets/delete-button.png";
import check from "../../assets/check.png";
import edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../actions/userAction";
import Loading from "../../components/Loading";
import Message from "../../components/Message";

const UserListPage = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
    // dispatch(listUsers());
  }, [dispatch, userInfo]);

  return (
    <div className="userListPageContainer">
      <div className="userProfileOrder">
        <h2>My Orders</h2>
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
                    <Link to={`/admin/user/1/edit`}>
                      <img src={edit} alt="cross" />
                    </Link>
                    <img src={Delete} alt="cross" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserListPage;
