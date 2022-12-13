import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import apiManager from "../../api/apiManager";
import { Loading } from "../../common/Loading";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import { useLocation } from "react-router";
import HouseCard from "../Misc/HouseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import FilterInHouse from "../Houses/FilterInHouse";

const Houses = () => {
  const locationRouter = useLocation();
  const path = locationRouter.pathname;
  const [promoHouses, setPromoHouses] = useState([]);
  const [houses, setHouses] = useState([]);
  const [housesFilteres, setHousesFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [housesTypes, setHousesTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [prices , setPrices] = useState({
    min: 0,
    max: 1000000
  });

 
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

    let filters = 'filter';


    let json = await apiManager.getHouses(locationFinal, type, filters);

    if (json != 500) {
      setHouses(json.houses);
      setHousesFilter(json.houses);
      setLoading(false);
    }

    let json2 = await apiManager.getPromosHouses();
    if (json2 != 500) {
      {
        setPromoHouses(json2.promos);
      }
    }
  }

  async function getHousesType() {
    let json = await apiManager.getHousesTypes();
    if (json != 500) {
      setHousesTypes(json.types);
    }
  }

  useEffect(() => {
    setLoading(true);
    getHousesType();
    location.locationId != 0 && getHouses();
  }, [location, path]);

  
  const filterHouses = () => {

    //copy houses
    let housesCopy = [...houses];

    //filter houses
    let housesFiltered;

 
    if(prices.min == 0 && prices.max == 0 && selectedTypes.length == 0){
      return housesCopy;
    }
    else if(prices.min == 0 && prices.max !== 0){

      housesFiltered = housesCopy.filter((house) => {
        let houseType = house.type_id;
        let price = house.price;
        if(selectedTypes.length == 0){
          return price <= prices.max;
        }
        let typeSelected = selectedTypes.includes(houseType);
  
        return (price <= prices.max ) && typeSelected ;
      });

    }
    else if(prices.min !== 0 && prices.max == 0){
      housesFiltered = housesCopy.filter((house) => {
        let houseType = house.type_id;
        let price = house.price;
        if(selectedTypes.length == 0){
          return price >= prices.min;
        }
        let typeSelected = selectedTypes.includes(houseType);
  
        return (price >= prices.min ) && typeSelected ;
      });
    }
    else if(prices.min == 0 && prices.max == 0){
      housesFiltered = housesCopy.filter((house) => {
        let houseType = house.type_id;
        console.log('selectedTypes.length',selectedTypes.length);
        if(selectedTypes.length !== 0){
          return selectedTypes.includes(houseType);
        }
      });
    }
    else if(prices.min !== 0 && prices.max !== 0){
      housesFiltered = housesCopy.filter((house) => {
        let houseType = house.type_id;
        let price = house.price;
        if(selectedTypes.length == 0){
          return price <= prices.max;
        }
        let typeSelected = selectedTypes.includes(houseType);
  
        return (price >= prices.min && price <= prices.max ) && typeSelected ;
      });
    }

    setHousesFilter(housesFiltered);

  }



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
              {promoHouses?.map((photo, index) => (
                <SwiperSlide key={`awiper-${index}`}>
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
          <div className="flex justify-between">
            <span className="text-lg font-bold text-gray-700">
              {" "}
              Alojamientos
            </span>

            <FilterInHouse
              setSelectedTypes={setSelectedTypes}
              housesTypes={housesTypes}
              selectedTypes={selectedTypes}
              prices = {prices}
              setPrices={setPrices}
              filterHouses={filterHouses}

            />
          </div>
          <div className="grid grid-cols-3 mb-20">
            {housesFilteres.map((house, index) => {
              return (
                <div
                  key={`house-${index}`}
                  className="col-span-3 my-2 lg:col-span-1"
                >
                  <HouseCard house={house} />
                </div>
              );
            })}

            {housesFilteres.length == 0 && (
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
