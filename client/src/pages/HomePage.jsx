import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";

import { Link } from "react-router-dom";
import { listProducts } from "../actions/productAction";
const HomePage = () => {
  const dispatch = useDispatch();

  const productlist = useSelector((state) => state.productList);

  const { error, loading, products } = productlist;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="homeContainer">
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading..</h2>
      ) : error ? (
        <p>Something went wrong!</p>
      ) : (
        <div className="productLists">
          {products.map((product) => (
            <Link to={`products/${product._id}`} key={product._id}>
              <div className="productDetailsContainer">
                <div className="productImageContainer">
                  <img
                    src={`http://localhost:3000/uploads/` + product.image}
                    alt={product.name}
                    className="productImage"
                  />
                </div>
                <div className="productDetails">
                  <h4>{product.name}</h4>
                  <p className="productRatingReviews">
                    {product.rating} from {product.numReviews} reviews
                  </p>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                  <p>
                    <b>${product.price}</b>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
