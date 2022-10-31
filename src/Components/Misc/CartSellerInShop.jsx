import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

function CardSellerInShop() {
  return (
    <div>
      <div className="group    relative">
        <div className=" bg-cover  z-0  rounded-lg p-4 h-48 bg-[url('/assets/img/background.png')]"></div>
        <div className="absolute z-10 cursor-pointer top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-main opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
          <h1 className="text-lg text-white">800 productos</h1>
          <Link to={"/tienda/" + "mi-tienda"}
              className="mt-5 cursor-pointer px-8 py-3 rounded-full bg-green hover:bg-green-100 duration-300"
              href="#">
              Ir a Vitra
          </Link>
        </div>
        <div className="absolute z-0 top-0 left-0 cursor-pointer h-full bg-black bg-opacity-40 w-full"></div>
        <div className="absolute z-0 top-3 left-3 flex flex-col">
          <span className="text-white    text-3xl font-bold">Vitra</span>
          <span className="text-white font-bold">La Habana, Cuba</span>
          <StarRatings
            rating={5}
            starRatedColor="#4eba6f"
            starEmptyColor="#6b9ac6"
            starHoverColor="#2abc57"
            starSpacing="3px"
            starDimension="20"
            numberOfStars={5}
            name="rating"
          />
        </div>
        <div className="absolute  z-50 -mt-7 right-0  flex mr-4 justify-end">
          <img
            className="h-24 rounded-full w-24 shadow-xl"
            src="/assets/img/seller.png"
            alt=""
          />
        </div>
        <div className="shadow-lg w-full h-20 absolute"></div>
      </div>
    </div>
  );
}

export default CardSellerInShop;
