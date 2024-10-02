import React, { useEffect } from "react";

import delteIcon from "../assets/delete.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartAction";
import Message from "../components/Message";
const CartPage = () => {
  const { id } = useParams();
  const productId = id;
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const decreaseQty = (product, qty) => {
    if (qty > 1) {
      dispatch(addToCart(product, qty - 1));
    }
  };

  const increaseQty = (product, qty, countInstock) => {
    if (qty < countInstock) {
      dispatch(addToCart(product, qty + 1));
    }
  };
  return (
    <div className="cartContainer">
      <h1>Shopping Cart</h1>
      <div className="cartDetails">
        {cartItems.length === 0 ? (
          <Message className="warningMessage">
            <p>{"*Your Cart is empty"}</p>
            <Link to="/" className="returnLink goBackCart">
              <button className="btn-cart">GO BACK</button>
            </Link>
          </Message>
        ) : (
          <div className="cartProductsContent">
            {cartItems.map((item) => (
              <div className="prductCartDetails" key={item.product}>
                <img
                  src={`http://localhost:3000/uploads/` + item.image}
                  alt={item.name}
                  className="cartProductImg"
                />

                <p className="cartProductName">{item.name}</p>

                <p>${item.price}</p>

                <div className="productQty">
                  <button
                    className="decreaseQty cartUpdateQty"
                    onClick={() => decreaseQty(item.product, item.qty)}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    className="increaseQty cartUpdateQty"
                    onClick={() =>
                      increaseQty(item.product, item.qty, item.countInstock)
                    }
                  >
                    +
                  </button>
                </div>

                <img
                  src={delteIcon}
                  alt="delete"
                  onClick={() => removeItemFromCart(item.product)}
                  className="deleteImgbtn"
                />
              </div>
            ))}
          </div>
        )}
        <div className="productCartPrice">
          <div className="cartTotal">
            <h4>
              subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h4>
            <p>
              ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}
            </p>
          </div>
          {cartItems.length > 0 && (
            <div className="cartCheckout">
              <Link to="/shipping">
                <button type="submit" className="btn-cart">
                  Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
