import React, { useState, Fragment, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import apiManager from "../../api/apiManager";
import { setLocation } from "../../redux/locationSlice";

const Location = () => {
  const location = useSelector((state) => state.location.location);
  const [provinces, setProvinces] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState([]);
  const [municipalitieSelected, setMunicipalitieSelected] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const getLocation = async () => {
    let json = await apiManager.getLocationData();
    if (json.code == "ok") {
      setProvinces(json.data);
      json.data.forEach((province) => {
        province.municipalities.forEach((muni) => {
          setMunicipalities((municipalities) => [...municipalities, muni]);
        });
        //Save in municipalities all municipalities for each province
      });
    }
  };

  const setMunicipalitiesByProvince = (event) => {
    console.log('event',event.value);
    setProvinceSelected(event.target.value);
    let province = provinces.find((prov) => 
        prov.id == event.target.value
     );
    setMunicipalities(province.municipalities);
    setMunicipalitieSelected(province.municipalities[0].id)
  };

  const storeLocation = () =>{
     
    setOpen(false);
    dispatch(setLocation({'locationName': municipalitieSelected.splice(',')[0],'locationId':municipalitieSelected.splice(',')[1]}))
   }

  useEffect(() => {
    getLocation();
  }, []);

  const cancelButtonRef = useRef(null);
  return (
    <>
      <div className="flex py-3 -mt-3 bg-gray-200 rounded-lg px-3   w-3/4">
        <button className="btn flex" onClick={(event) => setOpen(!open)}>
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
              d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
            />
          </svg>
          <span className="text-gray-700 font-medium pl-3">
            Delivery fijado en {location.locationName} 
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 ml-3 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
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
                        Escoge tu ubicación
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Te mostraremos los resultados en correspondencia a
                          esta ubicación
                        </p>
                      </div>
                      <div className="flex my-5 flex-col">
                        <select
                          onChange={(event) =>
                            setMunicipalitiesByProvince(event)
                          }
                          className="input-text"
                        >
                          {provinces?.map((province) => {
                            return (
                              <option
                                key={`provincew-${province.id}`}
                                value={province.id}
                              >
                                {province.name}
                              </option>
                            );
                          })}
                        </select>
                        <select   onChange={(event) => setMunicipalitieSelected(event.target.value)} className="input-text mt-3">
                          
                          {municipalities?.map((mu) => {
                            return (
                              //Number random
                              <option 
                                key={`province2d-${mu.id}${Math.random()}`}
                                value={[mu.id,mu.name]}
                              >
                                {mu.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-main px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      onClick={() => storeLocation()}
                    >
                      Establecer
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Location;
