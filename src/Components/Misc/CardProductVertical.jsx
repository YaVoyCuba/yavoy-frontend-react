import React from "react";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import apiManager from "../../api/apiManager";

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
    toast.warning(
      "No puedes comprar productos de diferentes restaurantes en un mismo pedido!",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const dispatch = useDispatch();
  
  const { id, name, price, img, rating, slug, restaurantId } = props;

  const addToCartHandler = () => {
    //check if not exist another product with same restaurantId
    let exist = cart.find((item) => item.restaurantId != restaurantId);
    if (exist) {
      productExisted();
    } else {
      dispatch(
        addToCart({
          id,
          name,
          price,
          img : apiManager.UrlBase + img,
          rating,
          slug,
          restaurantId,
          quantity: 1,
        })
      );
      productAdd();
    }
  };

  return (
    <div className="bg-gray-100  rounded-lg m-2   mt-3  shadow-xl">
      <div className="flex text-left flex-col ">
        <div className="flex ">
          <div className="flex relative">
         
            <img onClick={() => props.onClickFunction(slug)}
              className="h-auto object-cover w-32 cursor-pointer  object-center "
              src={apiManager.UrlBase + img}
              alt={name}
              />
         
        
            {props.experience && (            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 bg-main text-white p-1 shadow-xl absolute   left-2 -mt-0.1"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            )}
          </div>

          <div className={`flex w-full  ${props.experience && 'bg-color-100' } flex-col`}>
           
            
              <button onClick={() => props.onClickFunction(slug)} className="text-xl cursor-poiner pt-3 px-3 text-left  font-medium  text-gray-800  ">
                {name}
              </button>
             
            <div className="flex justify-between  ">
              <span className="text-xl font-bold pt-3 px-3 text-gray-700  ">
                ${Number(price).toFixed(2)}
              </span>{" "}
              <div className="flex p-1  ">
                <button
                  onClick={() => addToCartHandler()}
                  className="bg-main  p-2 m-2
            
                    rounded-full    "
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
                {/* <button
                  className="bg-main ml-1 p-1
            
            rounded-full  "
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
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductVertical;
