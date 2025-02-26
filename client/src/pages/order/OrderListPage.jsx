import React, { useEffect } from "react";
import cross from "../../assets/delete-button.png";
import info from "../../assets/info.png";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../actions/orderAction";
const OrderListPage = () => {
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo]);

  return (
    <div className="userListPageContainer">
      <div className="userProfileOrder">
        <h2>Orders</h2>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message className="errorMessage">{error}</Message>
        ) : (
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
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="userTableTd">{order._id}</td>
                  <td className="userTableTd">{order.userId.username}</td>
                  <td className="userTableTd">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="userTableTd">${order.totalPrice}</td>
                  <td className="userTableTd">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <img src={cross} alt="cross" />
                    )}
                  </td>
                  <td className="userTableTd">
                    {order.isDelivered ? (
                      order.delideredAt.substring(0, 10)
                    ) : (
                      <img src={cross} alt="cross" />
                    )}
                  </td>
                  <td className="userTableTd">
                    <Link to={`/order/${order._id}`}>
                      <img src={info} alt="magnifier" />
                    </Link>
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

export default OrderListPage;
