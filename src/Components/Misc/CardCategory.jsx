import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import {toast} from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";


const CardCategory = (props) => {
  const dispatch = useDispatch();
  const { img, title, price, id } = props;
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
  }
  return (
      <Link to={"productos/este-producto"}>
    <div className="flex flex-col m-2 lg:m-3">
        <div className="relative flex flex-col justify-center bg-[#F3F4F8]">
          <div className="flex flex-col">
            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    id,
                    title,
                    img,
                    price,
                    quantity: 1,
                  })
                ) ;   productAdd(); }
              }
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
          <img
            className="self-center  h-36 w-auto object-contain p-3"
            src={img}
            alt={title}
          />
        </div>
        <span className="truncate my-4 px-1 subtitle-2 text-center">
          {title}
        </span>
        <span className="truncate my-4 px-1  font-medium text-lg text-center color-green">
          {price}
        </span>
    </div>
      </Link>
  );
};

export default CardCategory;
