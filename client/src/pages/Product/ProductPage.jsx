import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../components/Rating";
import reviews from "../../data/reviews";
import { listProductDetails } from "../../actions/productAction";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
const ProductPage = () => {
  const { id } = useParams();
  const productId = id;

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch]);

  return (
    <div className="productPageContainer">
      <Link to="/" className="returnLink">
        <button className="btn-cart">GO BACK</button>
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message className="errorMessage">{"Something went Wrong!"}</Message>
      ) : (
        <div className="productPageDetails">
          <div className="productPageImgContainer">
            <img
              src={`http://localhost:3000/uploads/` + product.image}
              alt={product.name}
              className="productPageImg"
            />
          </div>

          <div className="aboutProduct">
            <p className="aboutProductContent">{product.name}</p>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              className={"aboutProductContent"}
            />
            <p className="aboutProductContent">Price: ${product.price}</p>
            <p className="aboutProductContent">
              Descriptions: {product.description}
            </p>
          </div>

          <div className="productPriceDetails">
            <p className="aboutProductQty">
              <b>Price: ${product.price}</b>
            </p>

            <p className="aboutProductQty productStock">
              Stock :{" "}
              {product.countInStock > 0 ? (
                <p
                  style={{
                    color: "green",
                    fontWeight: 600,
                    marginLeft: "0.5rem",
                  }}
                >
                  {" "}
                  In Stock
                </p>
              ) : (
                <p
                  style={{
                    color: "red",
                    fontWeight: 600,
                    marginLeft: "0.5rem",
                  }}
                >
                  {" "}
                  Out of Stock
                </p>
              )}
            </p>
            <div className="productQty aboutProductQty">
              <button className="decreaseQty">-</button>
              <span>{product.countInStock}</span>
              <button className="increaseQty">+</button>
            </div>
            <div className="aboutProductQty">
              <button
                type="submit"
                className={
                  product.countInStock > 0 ? "btn-cart" : "btn-cart disabled"
                }
              >
                ADD TO CART
              </button>
            </div>
          </div>
          <div className="productReviews">
            <h2>Reviews</h2>
            {reviews.map((review) => (
              <div className="productReviewContent">
                <h4 className="reviewCell">{review.user}</h4>
                <Rating value={review.rating} className="reviewCell" />
                <p className="reviewCell">{review.date}</p>
                <p className="reviewCell">{review.comment}</p>
              </div>
            ))}

            <div className="writeReviewContainer">
              <h3>Write your Review</h3>
              <div className="ratingSelect">
                <p>Rating: </p>
                <select name="rating" id="rating">
                  <option value="rating" selected>
                    SELECT
                  </option>
                  <option value="rating">1 - Poor</option>
                  <option value="rating">2 - Good</option>
                  <option value="rating">3 - Very Good</option>
                  <option value="rating">4 - Recommended</option>
                  <option value="rating">5 - Awesome</option>
                </select>
              </div>
              <textarea
                name="comment"
                id="comment"
                rows={10}
                placeholder="Write Your Review"
                className="reviewText"
              ></textarea>
              <button type="submit" className="btn-cart">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
