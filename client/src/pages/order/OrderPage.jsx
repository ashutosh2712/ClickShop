import React, { useEffect, useState } from "react";

import PaypalImg from "../../assets/StandardCheckout.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getOrderDetails, payOrder } from "../../actions/orderAction";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import { PayPalButtons } from "@paypal/react-paypal-js";
const OrderPage = () => {
  const { id: orderId } = useParams();
  // const orderId = id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order, success } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const [sdkReady, setSdkReady] = useState(false);

  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  const onCreateOrder = (data, actions) => {
    if (!order) {
      console.log("Order details not available");
      return;
    }
    const setOrderCurVal = {
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: order.totalPrice,
          },
        },
      ],
    };

    return actions.order.create(setOrderCurVal);
  };

  const onApprove = (data, actions) => {
    console.log("data :", data);
    dispatch(payOrder(orderId, data));
  };

  useEffect(() => {
    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: "ORDER_PAY_RESET" });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      setSdkReady(true);
    }
  }, [dispatch, order, orderId, sdkReady, successPay, success]);
  return loading ? (
    <Loading />
  ) : error ? (
    <Message className="errorMessage">{`Your Error: ${error}`}</Message>
  ) : (
    <div className="orderPageContainer">
      {/* <h1>Order : 1</h1> */}
      <div className="leftPlaceOrderDetails">
        <h1 className="orderNo">Order no {order._id}</h1>
        <div className="orderDetails">
          <h2>Shipping</h2>
          <p className="shippingDetailsInfo">
            <b>Name: </b> {order.userId.username}
          </p>
          <p className="shippingDetailsInfo">
            <b>Email: </b>
            {order.userId.email}
          </p>
          <p className="shippingDetailsInfo">
            <b>Shipping: </b>
            {order.shippingAddressId.address}, {order.shippingAddressId.city},{" "}
            {order.shippingAddressId.country},{" "}
            {order.shippingAddressId.postalCode}
          </p>
          <button className="warningMessage">Not Delivered</button>
        </div>
        <div className="placeOrderDetails">
          <h2>Payment Method</h2>
          <p className="shippingDetailsInfo">
            <b>Method: </b> {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <button className="successMessage">
              Paid at : {order.paidAt.substring(0, 10)}
            </button>
          ) : (
            <button className="warningMessage">Not Paid</button>
          )}
        </div>
        <div className="placeOrderDetails">
          <h2 style={{ marginBottom: "1rem" }}>Order Items</h2>
          {order.orderItems.length === 0 ? (
            <Message className="warningMessage">
              <p>{"*Your Cart is empty"}</p>
              <Link to="/" className="returnLink goBackCart">
                <button className="btn-cart">GO BACK</button>
              </Link>
            </Message>
          ) : (
            <>
              {" "}
              {order.orderItems.map((product) => (
                <Link
                  to={`/products/${product.productId}`}
                  className="placeOrderProductDetails"
                  key={product.product}
                >
                  <img
                    src={`http://localhost:3000/uploads/` + product.image}
                    alt={product.name}
                    className="placeOrderProductImg"
                  />
                  <p>{product.name}</p>
                  <p>
                    {product.qty} X ${product.price}
                  </p>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="orderSummary">
        <div className="orderSummaryHeading">
          <h2>Order Summary</h2>
        </div>
        <div className="orderSummaryDetails">
          <p>
            <b>Items:</b>
          </p>
          <p>${order.itemsPrice}</p>
        </div>
        <div className="orderSummaryDetails">
          <p>
            <b>Shipping:</b>
          </p>
          <p>${order.shippingPrice}</p>
        </div>
        <div className="orderSummaryDetails">
          <p>
            <b>Taxes:</b>
          </p>
          <p>${order.taxPrice}</p>
        </div>
        <div className="orderSummaryDetails">
          <p>
            <b>Total:</b>
          </p>
          <p>${order.totalPrice}</p>
        </div>
        {!order.isPaid && (
          <div className="orderSummaryDetails">
            {loadingPay && <Loading />}
            {!sdkReady ? (
              <Loading />
            ) : (
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => onCreateOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
                className="paypalImg"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
