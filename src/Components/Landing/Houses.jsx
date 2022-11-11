import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import apiManager from "../../api/apiManager";
import { Loading } from "../../common/Landing";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import { useLocation } from "react-router";
import HouseCard from "../Misc/HouseCard";

const Houses = () => {
  const locationRouter = useLocation();
  const path = locationRouter.pathname;
  
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const location = useSelector((state) => state.location.locationHouse);

  async function getHouses() {
    let location2 = store.getState().location.location;
  
    let locationFinal = "";
    if (location.locationName == "") {
      locationFinal = location2.locationId;
    } else {
      locationFinal = location.locationId;
    }

    let type = "house" 

    if(path == '/dulcerias'){
        type = "dulceria";
    }

    if(path == '/mercados'){
        type = "market";
    }

    if(path == '/regalitos'){
        type = "regalos";
    }

    let json = await apiManager.getHouses(locationFinal,type);
   
    if (json != 500) {
      setHouses(json.houses);
       setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    location.locationId != 0 && getHouses();
  }, [location,path]);


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {/* <span className="text-lg font-bold text-gray-700"> alojamientos</span> */}
          <div className="grid grid-cols-3 mb-20">
            {houses.map((house) => {
              return (
                <div
                  key={`house-${house.id}`}
                  className="col-span-3 my-2 lg:col-span-1"
                >
                  <HouseCard house={house} />
                  {/* <RestaurantCard restaurant={restaurant} /> */}
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
}

export default Houses