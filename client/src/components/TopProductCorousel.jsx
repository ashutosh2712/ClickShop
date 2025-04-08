import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTopProducts } from "../actions/productAction";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "./Loading";
import Rating from "./Rating";

const TopProductCorousel = () => {
  const dispatch = useDispatch();
  const topRatedProducts = useSelector((state) => state.topRatedProducts);
  const { loading, error, topProducts } = topRatedProducts;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Slide every 2 seconds
  };

  return (
    <div className="carouselContainer">
      <h1 className="carouselTitle">Top Rated Products</h1>
      <Slider {...settings} className="carouselSlider">
        {topProducts.map((product) => (
          <div key={product._id} className="carouselSlide">
            <img
              src={`http://localhost:3000/uploads/` + product.image}
              alt={product.name}
              className="carouselImage"
            />
            <h3 className="carouselProductName">{product.name}</h3>

            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              className="carouselProductRating"
            />

            <p className="carouselProductPrice">Price: ${product.price}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopProductCorousel;
