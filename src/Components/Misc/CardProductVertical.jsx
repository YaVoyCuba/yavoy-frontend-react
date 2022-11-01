import React from "react";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const CardProductVertical = (props) => {
  const { cart } = useSelector((state) => state.cart);

  const productAdd = (type) => {
    toast.success("Producto agregado!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const productExisted = (type) => {
    toast.warning("No puedes comprar productos de diferentes restaurantes en un mismo pedido!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  
  const dispatch = useDispatch();
  const { id, name, price, img, rating, slug, restaurantId } = props;

  const addToCartHandler = () => {

    //check if not exist another product with same restaurantId
    let exist = cart.find((item) => item.restaurantId != restaurantId);
    if (exist) {
      productExisted();
    } else {
       
          dispatch(addToCart({ id, name, price, img, rating, slug, restaurantId,quantity:1 }));
          productAdd();
    }
  };

  return (
    <div className="bg-gray-100  rounded-lg m-2   mt-3  shadow-xl">
      <div className="flex text-left flex-col ">
        <div className="flex relative  ">
          <div className="flex">
            <img
              className="h-auto object-cover w-32  object-center "
              src={img}
              alt={name}
            />
            <div className="flex flex-col">
              <Link
                className="cursor-poiner pt-3 px-3"
                to={"/producto/" + slug}
              >
                <span className="text-xl   font-medium  text-gray-800  ">
                  {name}
                </span>
                <div className="flex  flex-col">
                  <span className="text-xl font-bold pt-3 px-3 text-gray-700  ">
                    ${price}
                  </span>
                  <div className="pl-3 pb-3 pt-2">
                    <StarRatings
                      rating={rating}
                      starRatedColor="#f3754f"
                      starEmptyColor="#fad3c7"
                      starHoverColor="#f3754f"
                      starSpacing="3px"
                      starDimension="20"
                      numberOfStars={5}
                      name="rating"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex p-4 flex-col">
            <button
              onClick={() => addToCartHandler()}
              className="bg-main p-1
          
          rounded-full absolute top-2 right-1 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
            <button
              className="bg-main p-1
          
          rounded-full absolute top-10 right-1 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 text-white h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductVertical;
