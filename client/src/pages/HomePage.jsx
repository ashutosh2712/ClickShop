import React from "react";
import products from "../data/products";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="homeContainer">
      <h1>Latest Products</h1>
      <div className="productLists">
        {products.map((product) => (
          <Link to={`products/${product._id}`}>
            <div className="productDetailsContainer">
              <div className="productImageContainer">
                <img
                  src={product.image}
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
    </div>
  );
};

export default HomePage;
