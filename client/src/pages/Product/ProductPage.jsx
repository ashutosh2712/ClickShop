import React from "react";
import { Link, useParams } from "react-router-dom";
import products from "../../data/products";
import Rating from "../../components/Rating";
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
      </div>
    </div>
  );
};

export default ProductPage;
