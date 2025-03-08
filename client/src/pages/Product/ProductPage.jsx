import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../components/Rating";
import reviews from "../../data/reviews";
import {
  createProductReview,
  listProductDetails,
  listProductReviews,
} from "../../actions/productAction";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstant";

const ProductPage = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
    loading: loadingProductReview,
  } = productReviewCreate;

  const productReviews = useSelector((state) => state.productReviews);
  const {
    loading: loadingReviews,
    reviews,
    error: errrorReviews,
  } = productReviews;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      setTimeout(() => {
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      }, 2000);
    }
    dispatch(listProductDetails(productId));
    dispatch(listProductReviews(productId));
  }, [dispatch, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  const reviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };
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
            {product.countInStock > 0 && (
              <div className="productQty aboutProductQty">
                <button
                  className="decreaseQty"
                  onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}
                >
                  -
                </button>
                <span>{qty}</span>
                <button
                  className="increaseQty"
                  onClick={() =>
                    setQty((prev) =>
                      prev < product.countInStock
                        ? prev + 1
                        : product.countInStock
                    )
                  }
                >
                  +
                </button>
              </div>
            )}
            <div className="aboutProductQty">
              <button
                type="submit"
                className={
                  product.countInStock > 0 ? "btn-cart" : "btn-cart disabled"
                }
                onClick={() => addToCartHandler()}
              >
                ADD TO CART
              </button>
            </div>
          </div>
          <div className="productReviews">
            <h2>Reviews</h2>
            {loadingReviews ? (
              <Loading />
            ) : errrorReviews ? (
              <Message className="errorMessage">{errrorReviews}</Message>
            ) : reviews.length >= 0 ? (
              reviews.map((review) => (
                <div className="productReviewContent" key={review._id}>
                  <h4 className="reviewCell">{review.userId.username}</h4>
                  <Rating value={review.rating} className="reviewCell" />
                  <p className="reviewCell">
                    {review.createdAt.substring(0, 10)}
                  </p>
                  <p className="reviewCell">{review.comment}</p>
                </div>
              ))
            ) : (
              <Message className="warningMessage">No Reviews</Message>
            )}

            <div className="writeReviewContainer">
              <h3>Write your Review</h3>
              {loadingProductReview && <Loading />}
              {errorProductReview && (
                <Message className="errorMessage">{errorProductReview}</Message>
              )}
              {successProductReview && (
                <Message className="successMessage">
                  Review Submitted Successfully!
                </Message>
              )}
              {userInfo ? (
                <form className="authFormContainer" onSubmit={reviewHandler}>
                  <div className="ratingSelect">
                    <p>Rating: </p>
                    <select
                      name="rating"
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="0" disabled>
                        SELECT
                      </option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Good</option>
                      <option value="3">3 - Very Good</option>
                      <option value="4">4 - Recommended</option>
                      <option value="5">5 - Awesome</option>
                    </select>
                  </div>
                  <textarea
                    name="comment"
                    id="comment"
                    rows={10}
                    placeholder="Write Your Review"
                    value={comment}
                    className="reviewText"
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button type="submit" className="btn-cart">
                    SUBMIT
                  </button>
                </form>
              ) : (
                <Message className="warningMessage">
                  Please
                  <Link to={`/login`} className="btn-cart">
                    Login
                  </Link>
                  to write a Review
                </Message>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
