import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import apiManager from "../../api/apiManager";
import RestaurantCard from "../Misc/RestaurantCard";
import { Loading } from "../../common/Loading";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import SwiperCore, { Autoplay } from 'swiper';

import { Swiper, SwiperSlide  } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

const Restaurants = () => {
  SwiperCore.use([Autoplay]);
  //Get path for this route
  const locationRouter = useLocation();
  const path = locationRouter.pathname;

  const [restaurants, setRestaurants] = useState([]);
  const [promoRestaurants, setPromoRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMunicipality = useSelector( ( state ) => state.location.municipality );

  async function getRestaurants() {
    let locationFinal = "";
    if (getMunicipality.value?.id === 0) {
      locationFinal = 0;
    } else {
      locationFinal = getMunicipality.value.id;
    }

    let type = "restaurant";

    if (path === "/dulcerias") {
      type = "dulceria";
    }

    if (path === "/mercados") {
      type = "market";
    }
    if (path === "/servicios") {
      type = "servicios";
    }

    if (path === "/regalitos") {
      type = "regalos";
    }

    let json = await apiManager.getRestaurants(locationFinal, type);
    if (json !== 500) {
      setRestaurants(json.restaurants);
      setLoading(false);
    }

    let json2 = await apiManager.getPromosRestaurants();
    if (json2 !== 500) {
      {
        setPromoRestaurants(json2.promos);
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    getMunicipality.value && getMunicipality.value.id !== 0 && getRestaurants();
  }, [getMunicipality, path]);

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
                  path === "/" || path === "/restaurantes"
                    ? "text-color"
                    : "text-gray-500"
                }`}
              >
                <button

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
                  path === "/mercados" ? "text-color" : "text-gray-500"
                }`}
              >
                <button

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
                  path === "/dulcerias" ? "text-color" : "text-gray-500"
                }`}
              >
                <button

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
                  path === "/regalitos" ? "text-color" : "text-gray-500"
                }`}
              >
                <button

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
                  path === "/servicios" ? "text-color" : "text-gray-500"
                }`}
              >
                <button

                  className="flex flex-col justify-center items-center w-full h-full  text-center  hover:text-gray-700 hover:border-gray-300"
                >
                  Envío de paquetes
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                       className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
          <div className="my-3 hidden lg:block">
            <Swiper
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              spaceBetween={50}
              slidesPerView={1}
            >
              {promoRestaurants?.map(
                (photo) =>
                  photo.image && (
                    <SwiperSlide key={ `d-${photo.id}`}>
                      <a href={photo.link}>
                        <img src={apiManager.UrlBase + photo.image}  alt={photo.id}/>
                      </a>
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </div>
          <div className="my-3  lg:hidden">
            <Swiper
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              spaceBetween={50}
              slidesPerView={1}
            >
              {promoRestaurants?.map(
                (photo) =>
                  photo.image_movil && (
                    <SwiperSlide key={ `m-${photo.id}`}>
                      <a href={photo.link}>
                        <img src={apiManager.UrlBase + photo.image_movil}  alt={photo.id}/>
                      </a>
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </div>

          { path !== '/servicios' ? (
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

                {restaurants.length === 0 && (
                    <div className="col-span-3 my-2 lg:col-span-1">
                      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            No hay servicios disponibles en esta zona
                          </h3>
                        </div>
                      </div>
                    </div>
                )}
              </div>
          ) : (
              <div className="grid mb-10 grid-cols-1">
                <div className="bg-white">
                  <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="bg-color rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-1 lg:gap-4">
                      <div className="bg-color rounded-lg lg:grid lg:grid-cols-2 lg:gap-4">
                        <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                          <img className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-12 lg:translate-y-16"  src="/assets/img/product_by_libras.jpg" style={{ height:'90%' }} alt={""}/>
                        </div>
                        <div className="pt-10 pb-2 px-4 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                          <div className="lg:self-center">
                            <h2 className="text-3xl font-extrabold sm:text-4xl">
                              <span className="block">Ya Voy Envíos</span>
                              <span className="text-lg font-bold text-gray-700 mt-3">Peso mínimo del paquete 7lb</span>
                            </h2>
                            <br />

                            <div className="mt-7">
                              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Precios por libras
                                  </h3>
                                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Detalles de los precios.
                                  </p>
                                </div>
                                <div>
                                  <section className="px-2 py-2 sm:pt-2 sm:px-6 lg:py-6 lg:pr-6 xl:py-6 xl:px-6">
                                    <article>De 7 a 22lb <p className="px-1 inline-flex  rounded bg-green-100 text-green-800 font-semibold">
                                      4.99 </p>
                                       dólares por libra</article>
                                    <article>De 22 a 44lb <p className="px-1 inline-flex  rounded bg-green-100 text-green-800 font-semibold">
                                      4.50 </p> dólares por libra</article>
                                    <article>+ de 44lb <p className="px-1 inline-flex rounded bg-orange-100 font-semibold">
                                      3.99 </p> dólares por libra</article>
                                  </section>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 pb-12 px-4 sm:pt-2 sm:px-2 lg:py-2 lg:pr-0 xl:py-2 xl:px-2">
                        <p className="mt-4 text-lg leading-6">
                          De momento se vuela una vez por semana, los jueves y las entregas demoran de 48 horas a 10 días máximo.
                          Entregamos en toda Cuba, excepto en Isla de Pinos
                        </p>
                        <p className="mt-4 text-lg leading-6">
                          Nuestra agencia es de carga aérea no acompañada, a diferencia de las agencias con mulas con nosotros se pueden mandar
                          Teléfonos Celulares, Electrodomésticos, Auto-Partes, Muebles, Ferretería, etc.
                        </p>
                        <p className="mt-4 text-lg leading-6">
                          Estamos en 9500 NW 77th Ave, Suite 23, Hialeah Gardens, FL 33016
                        </p>
                        <p className="mt-4 text-lg leading-6">
                          Abrimos de lunes a viernes de 10am a 6pm y los sábados hacemos recogidas de paquetes en las casas sin costo alguno, con cita previa .
                        </p>
                        <p className="mt-4 text-lg leading-6">
                          <a className="mt-4 text-lg leading-6" href="tel:+17868491159">Si lo desea puede llamarnos al +1 (786) 849-1159 y le atenderemos con gusto</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ) }

        </div>
      )}
    </>
  );
};

export default Restaurants;
