import React, { useState, Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import apiManager from "../../api/apiManager";
import { useEffect } from "react";

const FilterInHouse = (props) => {

  const [open, setOpenModal] = useState(false);

 const {housesTypes,selectedTypes,setSelectedTypes,prices, setPrices, filterHouses } = props;
  
  return (
    <>
     <button className="pr-1" onClick={() => setOpenModal(!open)}>
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
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenModal}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white pt-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white main-color hover:text-gray-500 focus:outline-none focus:outline-none  "
                              onClick={() => setOpenModal(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6 main-color"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative   lg:pt-0   flex-1 px-4 sm:px-6">
                        <div className=" px-4 sm:px-6">
                          <div className="divide-y divide-gray-300 text-lg font-medium text-center">Filtro</div>
                        </div>
                        <div className="flex mx-auto  flew-wrap px-3 space-x-3 my-2">
                            <input 
                                onChange={(e) => {
                                    setPrices({ ...prices, min: e.target.value });
                                }}
                            type="text" className="input-text w-1/2" placeholder="Precio mínimo" />
                            <input
                                onChange={(e) => {
                                    setPrices({ ...prices, max: e.target.value });
                                }}
                            type="text" className="input-text w-1/2" placeholder="Precio máximo" />
                        </div>
                        <div className="grid grid-cols-2 mx-2  gap-3 space-y-2 mt-5">
                             
                            {housesTypes.map((type) => (
                                <button
                                    key={`type-${type.id}`}
                                     onClick={() => {
                                        if (selectedTypes.includes(type.id)) {
                                            setSelectedTypes(selectedTypes.filter((t) => t !== type.id));
                                        } else {
                                            setSelectedTypes([...selectedTypes, type.id]);
                                        }
                                    }}

                                    className={`   rounded-lg p-1 ${
                                        selectedTypes.includes(type.id) ? "bg-main" : "bg-gray-200"
                                    }`}
                                >
                                {type.name}</button>
                            ))} 
                        </div>
                        <div className="separator mt-3"></div>
                        <button className="btn-main w-full m-3 mx-auto"
                        onClick={() => {
                            filterHouses(prices, selectedTypes);
                            setOpenModal(false);
                        }}
                        >Aplicar filtros</button>
                      </div>
                      <div className="flex bottom-0 absolute flex-col py-7 lg:py-20 px-7  text-white bg-color"></div>
                      <div className="flex mt-20 mx-auto space-y-2 flex-col">
                        <hr className="h-0.5 w-68 bg-white" />
                        <span className="text-white text-center">
                          YaVoy Market 2022
                        </span>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
     </>
  )
}

export default FilterInHouse