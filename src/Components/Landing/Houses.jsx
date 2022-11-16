import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import apiManager from "../../api/apiManager";
import { Loading } from "../../common/Landing";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import { useLocation } from "react-router";
import HouseCard from "../Misc/HouseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Houses = () => {
  const locationRouter = useLocation();
  const path = locationRouter.pathname;
  const [promoHouses, setPromoHouses] = useState([]);
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

    let type = "house";

    if (path == "/dulcerias") {
      type = "dulceria";
    }

    if (path == "/mercados") {
      type = "market";
    }

    if (path == "/regalitos") {
      type = "regalos";
    }

    let json = await apiManager.getHouses(locationFinal, type);

    if (json != 500) {
      setHouses(json.houses);
      setLoading(false);
    }

    let json2 = await apiManager.getPromosHouses();
    if (json2 != 500) {
      {
        setPromoHouses(json2.promos);
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    location.locationId != 0 && getHouses();
  }, [location, path]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {promoHouses.length > 0 && (
            <span className="text-lg  font-bold text-gray-700 mt-3">
              Ofertas especiales
            </span>
          )}
          <div className="my-3">
            <Swiper spaceBetween={50} slidesPerView={1}>
              {promoHouses?.map((photo) => (
                <SwiperSlide>
                  <a href={photo.link}>
                    <img
                      src={
                        apiManager.UrlBase + photo.image ??
                        apiManager.UrlBase + photo.image_movil
                      }
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <span className="text-lg font-bold text-gray-700"> Alojamientos</span>
          <div className="grid grid-cols-3 mb-20">
            {houses.map((house) => {
              return (
                <div
                  key={`house-${house.id}`}
                  className="col-span-3 my-2 lg:col-span-1"
                >
                  <HouseCard house={house} />
                </div>
              );
            })}

            {houses.length == 0 && (
              <div className="col-span-3 my-2 lg:col-span-1">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      No hay alojamientos disponibles en esta ubicación
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

export default Houses;
