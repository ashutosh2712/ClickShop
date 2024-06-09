import React from "react";
import products from "../data/products";
import Rating from "../components/Rating";
const HomePage = () => {
  return (
    <div className="homeContainer">
      <h1>Latest Products</h1>
      <div className="productLists">
        {products.map((product) => (
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
        ))}
      </div>
    </div>
  );
};

export default HomePage;
