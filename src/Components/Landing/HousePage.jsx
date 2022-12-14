import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import apiManager from "../../api/apiManager";
import { Loading } from "../../common/Loading";
import format from "date-fns/format";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

import { DateRangePicker } from "react-date-range";
import { useSelector } from "react-redux";
import LoginPage from "../../Pages/frontend/LoginPage";
import truncate from "truncate-html";

const HousePage = (props) => {
  const [bookCompleted, setBookCompleted] = useState(false);
  const [bookCompletedCode, setBookCompletedCode] = useState(0);
  const auth = useSelector((state) => state.auth);
  const { houseSlug } = useParams();
  const [house, setHouse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBookView, setLoadingBookView] = useState(false);
  const [photos, setPhotos] = useState([]);

  //Enable data only from today
  const [disabledDates, setDisabledDates] = useState([]);
  const [bookingView, setBookingView] = useState(false);
  const [loginView, setLoginView] = useState(false);

  //Use in subtype == 'Hostal'
  const [bedrooms, setBetrooms] = useState([]);

  //NewBook
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [totalQuests, setTotalQuests] = useState(0);
  const [countries, setCountries] = useState([]);

  const [contactCountry, setContactCountry] = useState(1);

  const [errorQuantity, setErrorQuantity] = useState(false);

  const handleBedromm = (bedroom) => {
    //add bedroom to array if not exist
    let exist = bedrooms.find((b) => b.id == bedroom.id);
    if (!exist) {
      setBetrooms([...bedrooms, bedroom]);
    } else {
      //remove bedroom from array
      let newBedrooms = bedrooms.filter((b) => b.id != bedroom.id);
      setBetrooms(newBedrooms);
    }
  };

  const valdiateBook = async () => {
    let date =
      format(range[0].startDate, "dd-MM-yyyy") +
      "," +
      format(range[0].endDate, "dd-MM-yyyy");

    let days = 0;
    if (range[0].startDate != null) {
      days = Math.round(
        (range[0].endDate.getTime() - range[0].startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
    }

    setErrorQuantity(false);

    if (house.subtype?.name == "Hostal") {
      if (bedrooms.length == 0) {
        toast.error("Debes seleccionar al menos una habitación");
        return;
      }
    } else {
      setTotalQuests(adults + children + babies);

      if (adults + children + babies > house.guests) {
        setErrorQuantity(true);
        return;
      }
    }

    //array with only id of bedrooms
    let bedroomsName = "";
    bedrooms.map((bedroom) => {
      bedroomsName += bedroom.name + ", ";
    });

    let payload = {
      house_id: house.id,
      price: totalPrice(),
      contactName: auth.user.name,
      contactPhone: auth.user.phone,
      daysBookings: days,
      contactEmail: auth.user.email,
      contactCountry: contactCountry,
      dates: date,
      quests: totalQuests,
      bedrooms: bedroomsName,
    };

    let json = await apiManager.newBook(payload);

    if (json.code == "ok") {
      setBookCompleted(true);
      setBookCompletedCode(json.bookingCode);
      return handleBook();
    } else {
      toast.error("Ocurrió un error en el servidor, intentalo más tarde");
    }
  };

  useEffect(() => {
    setTotalQuests(adults + children + babies);
  }, [adults, children, babies]);

  const totalPrice = () => {
    let days = 0;

    if (range[0].startDate != null) {
      days = Math.round(
        (range[0].endDate.getTime() - range[0].startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
    }

    if (house.subtype?.name == "Hostal") {
      let price = 0;
      bedrooms.map((bedroom) => {
        price += bedroom.price * days;
      });
      return price;
    } else {
      let price = 0;
      price = house.price * days * totalQuests;
      return price;
    }
  };

  const handleBook = () => {
    window.scrollTo(0, 0);
    setLoadingBookView(true);
    if (!auth.token) {
      setLoginView(true);
    } else {
      setLoginView(false);
      setBookingView(!bookingView);
    }

    setLoadingBookView(false);
  };

  const closeModales = () => {
    setBookingView(false);
    setLoginView(false);
  };

  const handleLogin = () => {
    if (auth.token) {
      setLoginView(false);
      //setBookingView(!bookingView);
    } else {
      setLoginView(true);
    }
  };

  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  async function getHouseDetailsForBooking(houseSlug) {
    let json = await apiManager.getHouseDetailsForBooking(houseSlug);

    if (json != 500) {
      if (json.code == "ok") {
        //Set all the dates that are not available in format new Date(2021, 0, 1)
        let disabledDates = [];
        json.data.daysDisableds.map((date) => {
          disabledDates.push(new Date(date));
        });

        setDisabledDates(disabledDates);
        setCountries(json.data.countries);
      }
    }
  }

  async function getHouseDetails(houseSlug) {
    let json = await apiManager.getHouseDetails(houseSlug);

    if (json != 500) {
      if (json.code == "ok") {
        setHouse(json.data);
        
        json.data.photos.map((photo) => {
          setPhotos((photos) => [
            ...photos,
            {
              original: apiManager.UrlBase + photo.path_image,
              thumbnail: apiManager.UrlBase + photo.path_image,
            },
          ]);
        });
      } else {
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
    getHouseDetails(houseSlug);
    getHouseDetailsForBooking(houseSlug);
    //  handleLogin();
  }, [houseSlug, auth]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="pb-32 ">
          {loginView && (
            <div className="">
              <div className=" text-center lg:rounded-2xl lg:m-10 lg:max-w-2xl h-[53%]  absolute z-50 overflow-y-auto py-20   shadow-2xl inset-y-0   inset-0 lg:mx-auto lg:shadow-2xl bg-white p-5    ">
                <div className="mt-1">
                  <button onClick={() => closeModales()} className="pl-3 flex">
                    <span className="text-gray-700 flex text-lg pt-3 pl-2">
                      {" "}
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
                          d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                        />
                      </svg>
                      Volver al alojamiento
                    </span>
                  </button>
                </div>
                <div className="mt-7">
                  <LoginPage />
                </div>
              </div>
            </div>
          )}
          {bookingView ? (
            loadingBookView ? (
              <Loading />
            ) : (
              <div className="">
                <div
                  className="mb-0  overflow-y-auto text-center lg:rounded-2xl lg:m-10 lg:max-w-4xl absolute z-50   inset-0 lg:mx-auto lg:shadow-2xl bg-white p-5    "
                  style={{ zIndex: 9999 }}
                >
                  <div className="mt-1">
                    <button
                      onClick={() => closeModales()}
                      className="pl-3 flex"
                    >
                      <span className="text-gray-700 flex text-lg pt-3 pl-2">
                        {" "}
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
                            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                          />
                        </svg>
                        Volver al alojamiento
                      </span>
                    </button>
                  </div>

                  <br className="separator" />
                  <span className="text-md mt-5 text-center">
                    Escoge una fecha
                  </span>
                  <div>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                            />
                          </svg>
                        </div>
                        <input
                          value={`${format(
                            range[0].startDate,
                            "MM/dd/yyyy"
                          )} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
                          readOnly
                          onClick={() => setOpen((open) => !open)}
                          className="block input-text w-full rounded-none rounded-l-md border-gray-300 pl-10   sm:text-sm"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" ">
                    <div ref={refOne}>
                      {open && (
                        <div>
                         
                          <DateRangePicker
                            dateDisplayFormat="dd/MM/yyyy"
                            onChange={(item) => setRange([item.selection])}
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                            minDate={addDays(new Date(), house.min_days ?? 1)}
                            maxDate={addDays(new Date(), 365)}
                            disabledDates={disabledDates}
                            months={2}
                            direction="vertical"
                            className="calendarElement"
                          />
                          <div className="flex mx-auto">
                            <button
                              className="btn-main w-1/2 mx-auto"
                              onClick={() => setOpen((open) => !open)}
                            >
                              Seleccionar
                            </button>
                          </div>{" "}
                        </div>
                      )}
                    </div>
                  </div>

                  {house.subtype?.name == "Hostal" ? (
                    <>
                      <br />
                      <span className="text-md pt-7 text-center">
                        Selecciona las habitaciones
                      </span>
                      <div className="py-7 flex flex-row flex-wrap">
                        {house.bedrooms?.map((bedroom) => (
                          <button
                            onClick={() => {
                              handleBedromm(bedroom);
                            }}
                            key={`bed-${bedroom.id}`}
                            className="flex flex-col "
                          >
                            <div className="flex flex-row">
                              <div className="flex flex-col ">
                                <div
                                  className={`text-lg 
                                ${
                                  bedrooms.includes(bedroom)
                                    ? "bg-orange-600 text-white"
                                    : "bg-gray-100 text-black"
                                }
                                rounded-lg px-7 hover:bg-orange-600 py-3 m-2`}
                                >
                                  {bedroom.name} - ${bedroom.price}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex text-center lg:w-1/2 mx-auto space-y-3 flex-col my-5">
                      {/* Adults */}
                      <span>Adultos</span>
                      <div className="flex px-7">
                        <div className="    inset-y-0   flex items-center pr-3">
                          <button
                            onClick={() => {
                              if (adults > 0) {
                                setAdults(adults - 1);
                              }
                            }}
                          >
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
                                d="M18 12H6"
                              />
                            </svg>
                          </button>
                        </div>
                        <input
                          value={adults}
                          onChange={(e) => setAdults(e.target.value)}
                          type="text"
                          className="input-text text-center w-full"
                        />
                        <div className="     right-0 flex items-center pl-3">
                          <button
                            onClick={() => {
                              if (house.guests > adults) {
                                setAdults(adults + 1);
                              }
                            }}
                          >
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
                                d="M12 4.5v15m7.5-7.5h-15"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Children */}
                      <span>Niños</span>
                      <div className="flex px-7 mt-4">
                        <div className="    inset-y-0   flex items-center pr-3">
                          <button
                            onClick={() => {
                              if (children > 0) {
                                setChildren(children - 1);
                              }
                            }}
                          >
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
                                d="M18 12H6"
                              />
                            </svg>
                          </button>
                        </div>
                        <input
                          value={children}
                          onChange={(e) => setChildren(e.target.value)}
                          type="text"
                          className="input-text text-center w-full"
                        />
                        <div className="     right-0 flex items-center pl-3">
                          <button
                            onClick={() => {
                              if (house.guests > children) {
                                setChildren(children + 1);
                              }
                            }}
                          >
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
                                d="M12 4.5v15m7.5-7.5h-15"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Bebes */}
                      <span>Bebés</span>
                      <div className="flex px-7 mt-4">
                        <div className="    inset-y-0   flex items-center pr-3">
                          <button
                            onClick={() => {
                              if (babies > 0) {
                                setBabies(babies - 1);
                              }
                            }}
                          >
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
                                d="M18 12H6"
                              />
                            </svg>
                          </button>
                        </div>
                        <input
                          value={babies}
                          onChange={(e) => setBabies(e.target.value)}
                          type="text"
                          className="input-text text-center w-full"
                        />
                        <div className="     right-0 flex items-center pl-3">
                          <button
                            onClick={() => {
                              if (house.guests > babies) {
                                setBabies(babies + 1);
                              }
                            }}
                          >
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
                                d="M12 4.5v15m7.5-7.5h-15"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Bebes */}
                      <span>País</span>
                      <div className="flex px-7 mt-4">
                        <select
                          onChange={(event) =>
                            setContactCountry(event.target.value)
                          }
                          className="input-text w-full px-3"
                        >
                          {countries?.map((element) => {
                            return (
                              <option
                                key={`a-${element.id}`}
                                value={element.id}
                              >
                                {element.PaisNombre}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  )}

                  {totalPrice() > 0 && (
                    <button
                      onClick={() => valdiateBook()}
                      className="btn-main lg:w-1/2 mx-auto"
                    >
                      Hacer pre reserva por ${totalPrice()}
                    </button>
                  )}

                  {errorQuantity && (
                    <div className="flex justify-center">
                      <span className="text-red-500 text-center py-3 text-lg font-medium">
                        No puedes reservar para más de {house.guests} personas
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          ) : (
            <div>
              <div className="mt-1">
                <button onClick={() => goBack()} className="pl-3 flex">
                  <span className="text-gray-700 flex text-lg pt-3 pl-2">
                    {" "}
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
                        d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                      />
                    </svg>
                    Ver todos los alojamientos
                  </span>
                </button>
              </div>
              <div className="grid  grid-cols-5">
                <div className="col-span-5 p-1 lg:col-span-5">
                  <div className="col-span-5  grid mt-3 grid-cols-2">
                    <div className="col-span-2 lg:col-span-1 mb-7 sm:mb-0  pl-3 pr-7">
                      <ImageGallery items={photos} />
                    </div>
                    <div className="col-span-2 px-3 lg:px-0  lg:col-span-1">
                      <div className="flex  flex-col">
                        <div className="flex justify-center">
                          <div className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6 text-color"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="ml-1">
                              {house.valorations_count}
                            </span>
                          </div>
                        </div>
                        <hr className="separator" />
                        <h1 className="text-3xl p-3 text-center">
                          {house.title}
                        </h1>
                        <div className="flex justify-center py-2">
                          <div className="flex text-center">
                            <span>{house.guests} huespedes</span>
                            <span className="px-1">-</span>
                            <span>{house.rooms} habitaciones</span>
                            <span className="px-1">-</span>
                            <span>{house.beds} camas</span>
                          </div>
                        </div>
                        <hr className="separator" />
                        <h2 className="text-2xl p-3 text-center">
                          Descripción
                        </h2>
                        <div className="flex ">
                          <div className="flex text-left">
                            <span
                              className="font-medium text-md pt-1 pb-2"
                              dangerouslySetInnerHTML={{
                                __html: house.description,
                              }}
                            ></span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <h2 className="text-2xl p-3 text-center">
                            Servicios
                          </h2>
                          <span className="font-medium text-md pt-1 pb-2">
                            {house.services}
                          </span>
                        </div>
                        <hr className="separator" />
                        <div className="flex justify-between mt-3">
                          {house.price ? (
                            <div className="flex">
                              <span className="text-color font-bold text-4xl ">
                                ${house.price}
                              </span>
                              <span className="text-md pt-4 pl-1"> /noche</span>
                            </div>
                          ) : (
                            <div></div>
                          )}
                          <div>
                            <button
                              onClick={() => handleBook()}
                              className="btn-main"
                            >
                              Reservar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Transition.Root show={bookCompleted} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={setBookCompleted}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed  inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                      <div className="space-y-5">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                          <CheckIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Pre reserva completada
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              El anfitrión le contactará para confirmar la
                              reserva.
                            </p>
                            <br />
                            <span className="text-2xl bg-green-300 text-green-700 rounded-lg p-3 px-7 text-center">
                              {bookCompletedCode}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 flex justify-center sm:mt-6">
                        <Link to={"/perfil"}>
                          <button
                            type="button"
                            className="btn-main flex my-3 items-center"
                            onClick={() => setBookCompleted(false)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 pt-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                              />
                            </svg>
                            Ver todas mis reservas
                          </button>
                        </Link>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      )}
    </>
  );
};

export default HousePage;
