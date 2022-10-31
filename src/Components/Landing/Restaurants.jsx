import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import apiManager from "../../api/apiManager";
import RestaurantCard from "../Misc/RestaurantCard";
import { Loading } from "../../common/Landing";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getRestaurants() {
      let json = await apiManager.getRestaurants();
      if (json != 500) {
        setRestaurants(json.restaurants);
      }
      setLoading(false);
    }

    getRestaurants();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <span className="text-lg font-bold text-gray-700">
            Restaurantes 
          </span>
          <div className="grid grid-cols-3">
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

          <div className="mt-3 ">
            <span className="text-lg font-bold text-gray-700">
              Ofertas especiales
            </span>
            <div className="swiper mySwiper  z-0">
              <div className="swiper-wrapper"></div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Restaurants;
