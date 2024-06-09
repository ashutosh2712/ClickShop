import React from "react";
import halfStar from "../assets/halfStar.png";
import Star from "../assets/star.png";
import emptyStar from "../assets/emptyStar.png";
const Rating = ({ value, text }) => {
  return (
    <div className="ratingContainer">
      <span>
        {value >= 1 ? (
          <img src={Star} className="ratingStarImg"></img>
        ) : value >= 0.5 ? (
          <img src={halfStar} className="ratingStarImg"></img>
        ) : (
          <img src={emptyStar} className="ratingStarImg"></img>
        )}
      </span>

      <span>
        {value >= 2 ? (
          <img src={Star} className="ratingStarImg"></img>
        ) : value >= 1.5 ? (
          <img src={halfStar} className="ratingStarImg"></img>
        ) : (
          <img src={emptyStar} className="ratingStarImg"></img>
        )}
      </span>

      <span>
        {value >= 3 ? (
          <img src={Star} className="ratingStarImg"></img>
        ) : value >= 2.5 ? (
          <img src={halfStar} className="ratingStarImg"></img>
        ) : (
          <img src={emptyStar} className="ratingStarImg"></img>
        )}
      </span>

      <span>
        {value >= 4 ? (
          <img src={Star} className="ratingStarImg"></img>
        ) : value >= 3.5 ? (
          <img src={halfStar} className="ratingStarImg"></img>
        ) : (
          <img src={emptyStar} className="ratingStarImg"></img>
        )}
      </span>

      <span>
        {value >= 5 ? (
          <img src={Star} className="ratingStarImg"></img>
        ) : value >= 4.5 ? (
          <img src={halfStar} className="ratingStarImg"></img>
        ) : (
          <img src={emptyStar} className="ratingStarImg"></img>
        )}
      </span>

      <span>{text && text}</span>
    </div>
  );
};

export default Rating;
