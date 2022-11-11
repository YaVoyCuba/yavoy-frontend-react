import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import apiManager from "../../api/apiManager";
import RestaurantCard from "../Misc/RestaurantCard";
import { Loading } from "../../common/Landing";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import { useLocation } from "react-router";

const Restaurants = () => {
  //Get path for this route
  const locationRouter = useLocation();
  const path = locationRouter.pathname;
  
  const [restaurants, setRestaurants] = useState([]);
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

    let type = "restaurant" 

    if(path == '/dulcerias'){
        type = "dulceria";
    }

    if(path == '/mercados'){
        type = "market";
    }

    if(path == '/regalitos'){
        type = "regalos";
    }

    let json = await apiManager.getRestaurants(locationFinal,type);
    if (json != 500) {
      setRestaurants(json.restaurants);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
     location.locationId != 0 && getRestaurants();
  
  }, [location,path]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {/* <span className="text-lg font-bold text-gray-700">Restaurantes</span> */}
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

          {/* <div className="mt-3 ">
            <span className="text-lg font-bold text-gray-700">
              Ofertas especiales
            </span>
            <div className="swiper mySwiper  z-0">
              <div className="swiper-wrapper"></div>
              <div className="swiper-pagination"></div>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Restaurants;
