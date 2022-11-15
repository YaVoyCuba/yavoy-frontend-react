import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import apiManager from "../../api/apiManager";
import RestaurantCard from "../Misc/RestaurantCard";
import { Loading } from "../../common/Landing";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import { useLocation } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
 

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
          {promoRestaurants.length > 0 &&  <span className="text-lg  font-bold text-gray-700 mt-3">Ofertas especiales</span>}
          <div className="my-3">
            <Swiper 
            
              spaceBetween={50}
              slidesPerView={1}
            >
              {promoRestaurants?.map((photo) => (
                <SwiperSlide>
                  <a href={photo.link}>
                    <img src={apiManager.UrlBase + photo.image ?? apiManager.UrlBase + photo.image_movil} />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <span className="text-lg font-bold text-gray-700 mt-3">Restaurantes</span>
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
          </div>
 
        </div>
      )}
    </>
  );
};

export default Restaurants;
