import React from "react";
import StarRatings from "react-star-ratings";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";

const CardProductHorizontal = (props) => {
  const dispatch = useDispatch();
  const { name, price, img, rating } = props;

  return (
    <div className="bg-gray-100 rounded-lg p-4 mt-3  shadow-xl">
      <Link to={"productos/este-producto"}>
        {" "}
        <div className="flex">
          <div>
            <img className="h-32 w-32 object-cover p-3" src={img} alt={name} />
          </div>
          <div className="flex  flex-col">
            <span className="text-xl font-medium pt-3 px-3 text-gray-800  ">
              {name}
            </span>
            <span className="text-2xl font-extrabold px-3 text-gray-700  ">
              ${price}
            </span>
            <div className="pl-3 pt-2">
              <StarRatings
                rating={rating}
                starRatedColor="#4eba6f"
                starEmptyColor="#6b9ac6"
                starHoverColor="#2abc57"
                starSpacing="3px"
                starDimension="25"
                numberOfStars={5}
                name="rating"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardProductHorizontal;
