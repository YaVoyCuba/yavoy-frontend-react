import React from "react";
import Restaurants from "../Landing/Restaurants";
import apiManager from "../../api/apiManager";
import { Link } from "react-router-dom";

const HouseCard = (props) => {
  const house = props.house;

  return (
    <div>
      <Link className="cursor-pointer hover:opacity-95" to={"/alojamiento/" + house.slug} >
        <div className="grid grid-cols-3 rounded-lgmy-3 lg:my-2   mx-0 lg:mx-2 bg-white shadow-lg cursor-pointer hover:opacity-80">
          <img
            className="h-full w-full text-gray-300 "
            src={`${apiManager.UrlBase + house.photos?.[0].path_image}`}
            style={{
              borderTopLeftRadius: "7px",
              borderBottomLeftRadius: "7px",
            }}
          />
          <div className="col-span-2  h-28 ml-3 lg:ml-0">
            <div className="flex justify-between p-1">
             
              {house.valoration > 0 && (
                <span className="text-lg px-3 flex color">
                  {house.valoration}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 pt-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              )}
            </div>
            <div>
              <div className="flex justify-between flex-col">
                <span className="text-md pl-3 pr-1 pb-0 color uppercase font-bold ">
                  {house.title}
                </span>
                <span className="text-md line-clamp-3 text-gray-700  pl-3 pr-1 pb-0       ">
                  {house.resume }
                </span>
                <span className="text-md text-color pl-3 pr-1 pb-0 color uppercase font-bold ">
                 $ {house.price} USD
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HouseCard;
