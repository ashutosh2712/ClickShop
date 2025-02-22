import React, { useEffect, useState } from "react";

import edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProducts } from "../../actions/productAction";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import ConfirmationPopup from "../../components/ConfirmationPopup";

const ProductListPage = () => {
  const [showConfirmation, setShowConfirmation] = useState({
    isloading: false,
  });
  const [productIdToDelete, SetProductIdToDelete] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, successDelete, userInfo]);

  const deleteHandler = (id) => {
    setShowConfirmation({ isloading: true });
    SetProductIdToDelete(id);
  };

  const confirmDeleteHandler = () => {
    dispatch(deleteProduct(productIdToDelete));
    setShowConfirmation({ isloading: false });
    SetProductIdToDelete(null);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmation({ isloading: false });
    SetProductIdToDelete(null);
  };

  return (
    <div className="userListPageContainer">
      <div className="userProfileOrder">
        <div className="productListEdit">
          <h2>Products</h2>
          <Link to={`/admin/create/product`}>
            <button className="btn-cart">+ Create Product</button>
          </Link>
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message className="errorMessage">{error}</Message>
        ) : (
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
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="userTableTd">{product._id}</td>
                  <td className="userTableTd">{product.name}</td>
                  <td className="userTableTd">${product.price}</td>
                  <td className="userTableTd">{product.category}</td>
                  <td className="userTableTd">{product.brand}</td>
                  <td className="userTableTd">
                    <Link to={`/admin/product/:id/edit`}>
                      <img src={edit} alt="cross" />
                    </Link>
                    <img
                      src={Delete}
                      alt="cross"
                      onClick={() => deleteHandler(product._id)}
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

export default ProductListPage;
