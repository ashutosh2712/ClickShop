import React from "react";
import { Link } from "react-router-dom";

const ProductEditPage = () => {
  return (
    <div className="productEditContainer">
      <Link to="/admin/productlist" className="returnLink">
        <button className="btn-cart">GO BACK</button>
      </Link>
      <div className="userProfileUpdate">
        <h2>Edit Product</h2>
        <form className="authFormContainer">
          <label htmlFor="name">
            <b>Name</b>
          </label>
          <input type="text" placeholder="Name" className="formInput" />

          <label htmlFor="price">
            <b>Price</b>
          </label>
          <input type="number" placeholder="price" className="formInput" />

          <label htmlFor="image">
            <b>Image</b>
          </label>
          <input type="text" placeholder="Image" className="formInput" />

          <label htmlFor="image">
            <b>Choose Image File</b>
          </label>
          <input type="File" className="formInput" />

          <label htmlFor="brand">
            <b>brand</b>
          </label>
          <input type="text" placeholder="brand" className="formInput" />

          <label htmlFor="stock">
            <b>stock</b>
          </label>
          <input type="number" placeholder="stock" className="formInput" />

          <label htmlFor="category">
            <b>category</b>
          </label>
          <input type="text" placeholder="category" className="formInput" />

          <label htmlFor="descriptions">
            <b>descriptions</b>
          </label>
          <textarea
            type="text"
            placeholder="descriptions"
            className="formInput"
          />

          <button type="submit" className="btn-cart">
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;
