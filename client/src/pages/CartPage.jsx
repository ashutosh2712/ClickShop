import React from "react";
import products from "../data/products";
import delteIcon from "../assets/delete.png";
const CartPage = () => {
  return (
    <div className="cartContainer">
      <h1>Shopping Cart</h1>
      <div className="cartDetails">
        <div className="cartProductsContent">
          {products.map((product) => (
            <div className="prductCartDetails">
              <img
                src={product.image}
                alt={product.name}
                className="cartProductImg"
              />

              <p className="cartProductName">{product.name}</p>

              <p>${product.price}</p>

              <div className="productQty">
                <button className="decreaseQty cartUpdateQty">-</button>
                <span>{product.countInStock}</span>
                <button className="increaseQty cartUpdateQty">+</button>
              </div>

              <img src={delteIcon} alt="delete" />
            </div>
          ))}
        </div>
        <div className="productCartPrice">
          <div className="cartTotal">
            <h4>subtotal ({products.length}) items</h4>
            <p>
              ${products.reduce((total, product) => total + product.price, 0)}
            </p>
          </div>
          <div className="cartCheckout">
            <button type="submit" className="btn-cart">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
