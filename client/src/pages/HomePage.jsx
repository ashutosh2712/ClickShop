import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productAction";
import Message from "../components/Message";
import TopProductCorousel from "../components/TopProductCorousel";
const HomePage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const productlist = useSelector((state) => state.productList);

  const { error, loading, products, searchTerm, page, pages } = productlist;

  useEffect(() => {
    dispatch(listProducts(searchTerm, page));
  }, [dispatch, searchTerm, page]);

  const handleChange = (newPage) => {
    setCurrentPage(newPage);
    dispatch(listProducts(searchTerm, newPage));
  };

  return (
    <div className="homeContainer">
      <TopProductCorousel />
      <h1>Latest Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>Something went wrong!</p>
      ) : (
        <div className="productLists">
          {products.length > 0 ? (
            products.map((product) => (
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
            ))
          ) : (
            <Message className="warningMessage">{"No products found"}</Message>
          )}
        </div>
      )}
      {/* PAGINATION BUTTON */}
      <div className="pagination">
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-btn${currentPage === index + 1 ? " active" : ""}`}
            onClick={() => handleChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
