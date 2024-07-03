import React from "react";
import cross from "../../assets/delete-button.png";
import edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";
const UserListPage = () => {
  return (
    <div className="userListPageContainer">
      <div className="userProfileOrder">
        <h2>My Orders</h2>
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
            <tr>
              <td className="userTableTd">1</td>
              <td className="userTableTd">Super Admin</td>
              <td className="userTableTd">admin@gmail.com</td>
              <td className="userTableTd">
                <img src={cross} alt="cross" />
              </td>
              <td className="userTableTd">
                <img src={edit} alt="cross" />
                <img src={Delete} alt="cross" />
              </td>
            </tr>
            <tr>
              <td className="userTableTd">2</td>
              <td className="userTableTd">Super Admin</td>
              <td className="userTableTd">admin@gmail.com</td>
              <td className="userTableTd">
                <img src={cross} alt="cross" />
              </td>
              <td className="userTableTd">
                <img src={edit} alt="cross" />
                <img src={Delete} alt="cross" />
              </td>
            </tr>
            <tr>
              <td className="userTableTd">3</td>
              <td className="userTableTd">main Admin</td>
              <td className="userTableTd">admin@gmail.com</td>
              <td className="userTableTd">
                <img src={cross} alt="cross" />
              </td>
              <td className="userTableTd">
                <img src={edit} alt="cross" />
                <img src={Delete} alt="cross" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListPage;
