import React from "react";

import edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";
import { Link } from "react-router-dom";
const ProductListPage = () => {
  return (
    <div className="userListPageContainer">
      <div className="userProfileOrder">
        <div className="productListEdit">
          <h2>Products</h2>
          <Link to={`/admin/product/:id/edit`}>
            <button className="btn-cart">+ Create Product</button>
          </Link>
        </div>
        <table className="userTable">
          <thead>
            <tr>
              <th className="userTableTh">ID</th>
              <th className="userTableTh">NAME</th>
              <th className="userTableTh">PRICE</th>
              <th className="userTableTh">CATEGORY</th>
              <th className="userTableTh">BRAND</th>
              <th className="userTableTh">MODIFY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="userTableTd">1</td>
              <td className="userTableTd">LAPTOP</td>
              <td className="userTableTd">$100.50</td>
              <td className="userTableTd">Electronic</td>
              <td className="userTableTd">samsung</td>
              <td className="userTableTd">
                <Link to={`/admin/product/:id/edit`}>
                  <img src={edit} alt="cross" />
                </Link>
                <img src={Delete} alt="cross" />
              </td>
            </tr>
            <tr>
              <td className="userTableTd">2</td>
              <td className="userTableTd">LAPTOP</td>
              <td className="userTableTd">$102.50</td>
              <td className="userTableTd">Electronic</td>
              <td className="userTableTd">samsung</td>
              <td className="userTableTd">
                <Link to={`/admin/product/:id/edit`}>
                  <img src={edit} alt="cross" />
                </Link>
                <img src={Delete} alt="cross" />
              </td>
            </tr>
            <tr>
              <td className="userTableTd">3</td>
              <td className="userTableTd">MOUSE</td>
              <td className="userTableTd">$100.50</td>
              <td className="userTableTd">Electronic</td>
              <td className="userTableTd">samsung</td>
              <td className="userTableTd">
                <Link to={`/admin/product/:id/edit`}>
                  <img src={edit} alt="cross" />
                </Link>
                <img src={Delete} alt="cross" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListPage;
