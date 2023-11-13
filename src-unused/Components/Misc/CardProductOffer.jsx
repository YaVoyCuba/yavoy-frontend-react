import React from "react";
import StarRatings from "react-star-ratings";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";

const CardProductOffer = (props) => {
  const dispatch = useDispatch();
  const { name, price, img, rating,slug } = props;

  return (
    <div className="cursor-pointer  rounded-lg p-1 mt-3  shadow-xl">
      <Link to={'productos/'+slug}>
        <div className="flex">
          <div className="w-5/12 bg-[#F3F4F8]">
            <div className="relative flex flex-col justify-center">
              <img
                className="aspect-auto self-center  h-32 w-32 object-contain p-3"
                src={img}
                alt={name}
              />
              <span className="absolute m-1.5 px-2 bg-[#3498DB] text-white uppercase p-1 rounded-md top-0 left-0">
                5% OFF
              </span>
            </div>
          </div>
          <div className="flex w-7/12 flex-col">
            <span className="text-xl truncate font-medium pt-3 px-3 text-gray-800">
              {name}
            </span>
            <span className="text-2xl font-medium px-3 color-green">
              ${price}
            </span>
            <div className="pl-3 pt-2">
              <StarRatings
                rating={rating}
                starRatedColor="#4eba6f"
                starEmptyColor="#6b9ac6"
                starHoverColor="#2abc57"
                starSpacing="3px"
                starDimension="15"
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

export default CardProductOffer;
