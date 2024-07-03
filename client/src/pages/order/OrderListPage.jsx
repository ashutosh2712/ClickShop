import React from "react";
import cross from "../../assets/delete-button.png";
import info from "../../assets/info.png";
import check from "../../assets/check.png";
const OrderListPage = () => {
  return (
    <div className="userListPageContainer">
      <div className="userProfileOrder">
        <h2>Orders</h2>

        <table className="userTable">
          <thead>
            <tr>
              <th className="userTableTh">ID</th>
              <th className="userTableTh">USER</th>
              <th className="userTableTh">DATE</th>
              <th className="userTableTh">TOTAL</th>
              <th className="userTableTh">PAID</th>
              <th className="userTableTh">DELIVERED</th>
              <th className="userTableTh">DETAILS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="userTableTd">1</td>
              <td className="userTableTd">Brock</td>
              <td className="userTableTd">2024-03-11</td>
              <td className="userTableTd">$350.00</td>
              <td className="userTableTd">
                <img src={cross} alt="cross" />
              </td>
              <td className="userTableTd">
                <img src={cross} alt="cross" />
              </td>
              <td className="userTableTd">
                <img src={info} alt="magnifier" />
              </td>
            </tr>
            <tr>
              <td className="userTableTd">1</td>
              <td className="userTableTd">Brock</td>
              <td className="userTableTd">2024-03-11</td>
              <td className="userTableTd">$350.00</td>
              <td className="userTableTd">
                <img src={check} alt="cross" />
              </td>
              <td className="userTableTd">
                <img src={cross} alt="cross" />
              </td>
              <td className="userTableTd">
                <img src={info} alt="magnifier" />
              </td>
            </tr>
            <tr>
              <td className="userTableTd">1</td>
              <td className="userTableTd">Brock</td>
              <td className="userTableTd">2024-03-11</td>
              <td className="userTableTd">$350.00</td>
              <td className="userTableTd">
                <img src={check} alt="cross" />
              </td>
              <td className="userTableTd">
                <img src={check} alt="cross" />
              </td>
              <td className="userTableTd">
                <img src={info} alt="magnifier" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListPage;
