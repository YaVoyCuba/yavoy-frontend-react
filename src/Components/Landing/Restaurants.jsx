import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import apiManager from "../../api/apiManager";
import RestaurantCard from "../Misc/RestaurantCard";
import { Loading } from "../../common/Loading";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import { useLocation } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

const Restaurants = () => {
  //Get path for this route
  const locationRouter = useLocation();
  const path = locationRouter.pathname;

  const [restaurants, setRestaurants] = useState([]);
  const [promoRestaurants, setPromoRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useSelector((state) => state.location.location);

  async function getRestaurants() {
    let location2 = store.getState().location.location;

    let locationFinal = "";
    if (location.locationName == "") {
      locationFinal = location2.locationId;
    } else {
      locationFinal = location.locationId;
    }

    let type = "restaurant";

    if (path == "/dulcerias") {
      type = "dulceria";
    }

    if (path == "/mercados") {
      type = "market";
    }
    if (path == "/servicios") {
      type = "servicios";
    }

    if (path == "/regalitos") {
      type = "regalos";
    }

    let json = await apiManager.getRestaurants(locationFinal, type);
    if (json != 500) {
      setRestaurants(json.restaurants);
      setLoading(false);
    }

    let json2 = await apiManager.getPromosRestaurants();
    if (json2 != 500) {
      {
        setPromoRestaurants(json2.promos);
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    location.locationId != 0 && getRestaurants();
  }, [location, path]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex flex-col mx-auto">
            <div
              className="  grid grid-cols-3 mx-auto  p-4 md:grid-cols-2 lg:grid-cols-5  gap-4"
              aria-hidden="true"
            >
              <Link
                to={"/"}
                className={`col-span-1 ${
                  path == "/" || path == "/restaurantes"
                    ? "text-color"
                    : "text-gray-500"
                }`}
              >
                <button
                  onClick={() => setOpen(!open)}
                  className="flex flex-col justify-center items-center w-full h-full  text-center  hover:text-gray-700 hover:border-gray-300"
                >
                  Restaurantes
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 text-center h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                    />
                  </svg>
                </button>
              </Link>
              <Link
                to={"/mercados"}
                className={`col-span-1 ${
                  path == "/mercados" ? "text-color" : "text-gray-500"
                }`}
              >
                <button
                  onClick={() => setOpen(!open)}
                  className="flex flex-col justify-center items-center w-full h-full  text-center  hover:text-gray-700 hover:border-gray-300"
                >
                  Mercados
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                    />
                  </svg>
                </button>
              </Link>
              <Link
                to={"/dulcerias"}
                className={`col-span-1 ${
                  path == "/dulcerias" ? "text-color" : "text-gray-500"
                }`}
              >
                <button
                  onClick={() => setOpen(!open)}
                  className="flex flex-col justify-center items-center w-full h-full  text-center  hover:text-gray-700 hover:border-gray-300"
                >
                  Dulcerías
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
                    />
                  </svg>
                </button>
              </Link>
              <Link
                to={"/regalitos"}
                className={`col-span-1 ${
                  path == "/regalitos" ? "text-color" : "text-gray-500"
                }`}
              >
                <button
                  onClick={() => setOpen(!open)}
                  className="flex flex-col justify-center items-center w-full h-full  text-center  hover:text-gray-700 hover:border-gray-300"
                >
                  Regalitos
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </button>
              </Link>
              <Link
                to={"/servicios"}
                className={`col-span-1 ${
                  path == "/servicios" ? "text-color" : "text-gray-500"
                }`}
              >
                <button
                  onClick={() => setOpen(!open)}
                  className="flex flex-col justify-center items-center w-full h-full  text-center  hover:text-gray-700 hover:border-gray-300"
                >
                  Servicios
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
          {/* {promoRestaurants.length > 0 && (
            <span className="text-lg  font-bold text-gray-700 mt-3">
              Ofertas especiales
            </span>
          )} */}
          <div className="my-3 hidden lg:flex">
            <Swiper
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              spaceBetween={50}
              slidesPerView={1}
            >
              {promoRestaurants?.map(
                (photo) =>
                  photo.image && (
                    <SwiperSlide key={photo.id}>
                      <a href={photo.link}>
                        <img src={apiManager.UrlBase + photo.image} />
                      </a>
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </div>
          <div className="my-3  lg:hidden">
            <Swiper
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              spaceBetween={50}
              slidesPerView={1}
            >
              {promoRestaurants?.map(
                (photo) =>
                  photo.image_movil && (
                    <SwiperSlide key={photo.id}>
                      <a href={photo.link}>
                        <img src={apiManager.UrlBase + photo.image_movil} />
                      </a>
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </div>
          <span className="text-lg font-bold text-gray-700 mt-3">
            {(path == "/restaurantes" || path == "/") && "Restaurantes"}
            {path == "/dulcerias" && "Dulcerías"}
            {path == "/mercados" && "Mercados"}
            {path == "/regalitos" && "Regalitos"}
          </span>
          <div className="grid mb-10 grid-cols-3">
            {restaurants.map((restaurant) => {
              return (
                <div
                  key={`restaurant-${restaurant.id}`}
                  className="col-span-3 my-2 lg:col-span-1"
                >
                  <RestaurantCard restaurant={restaurant} />
                </div>
              );
            })}

            {restaurants.length == 0 && (
              <div className="col-span-3 my-2 lg:col-span-1">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      No hay restaurantes disponibles en esta zona
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Restaurants;
