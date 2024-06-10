import React from "react";
import { Link, useParams } from "react-router-dom";
import products from "../../data/products";
import Rating from "../../components/Rating";
import reviews from "../../data/reviews";
const ProductPage = () => {
  const { id } = useParams();
  const productId = id;
  const filteredProduct = products.find((product) => product._id === productId);

  return (
    <div className="productPageContainer">
      <Link to="/" className="returnLink">
        <button className="btn-cart">GO BACK</button>
      </Link>
      <div className="productPageDetails">
        <div className="productPageImgContainer">
          <img
            src={filteredProduct.image}
            alt={filteredProduct.name}
            className="productPageImg"
          />
        </div>

        <div className="aboutProduct">
          <p className="aboutProductContent">{filteredProduct.name}</p>
          <Rating
            value={filteredProduct.rating}
            text={`${filteredProduct.numReviews} reviews`}
            className={"aboutProductContent"}
          />
          <p className="aboutProductContent">Price: ${filteredProduct.price}</p>
          <p className="aboutProductContent">
            Descriptions: {filteredProduct.description}
          </p>
        </div>

        <div className="productPriceDetails">
          <p className="aboutProductQty">
            <b>Price: ${filteredProduct.price}</b>
          </p>

          <p className="aboutProductQty productStock">
            Stock :{" "}
            {filteredProduct.countInStock > 0 ? (
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
                style={{ color: "red", fontWeight: 600, marginLeft: "0.5rem" }}
              >
                {" "}
                Out of Stock
              </p>
            )}
          </p>
          <div className="productQty aboutProductQty">
            <button className="decreaseQty">-</button>
            <span>{filteredProduct.countInStock}</span>
            <button className="increaseQty">+</button>
          </div>
          <div className="aboutProductQty">
            <button
              type="submit"
              className={
                filteredProduct.countInStock > 0
                  ? "btn-cart"
                  : "btn-cart disabled"
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
    </div>
  );
};

export default ProductPage;
