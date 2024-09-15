import React, { useEffect, useState } from "react";
// import products from "../data/products";
import Rating from "../components/Rating";
import axios from "axios";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.log("Error Fetching Products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="homeContainer">
      <h1>Latest Products</h1>
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
    </div>
  );
};

export default HomePage;
