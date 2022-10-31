import React from "react";
import { Link } from "react-router-dom";
import CartIconGlobal from "../Misc/CartIconGlobal";
 

const HeaderCenter = () => {
  return (
    <div className="bg-main   lg:mb-0 lg:sticky top-0 lg:px-14 lg:py-7 py-2">
      <div className="flex justify-between text-sm text-white ">
        <div className="flex flex-col sm:flex-row p-4 lg:p-0">
          <div className="flex justify-between">
            <Link to="/" className="flex">
              <img
                className="h-7 w-auto"
                src="/assets/img/rentalho.png"
                alt="RentalHo"
              />
              <span className="pl-1 font-medium text-lg">Market</span>
            </Link>
            <div>   </div>
          </div>
          <div className="relative my-3 lg:my-0 lg:ml-3 -mt-lg:-1 h-10 flex   shadow-sm">
            <div className="    inset-y-0 left-0 flex items-center">
              <label htmlFor="country" className="sr-only">
                Country
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country"
                className="h-full focus:outline-none text-gray-800 font-medium rounded-l-md border-transparent bg-transparen pl-3 sm:text-sm"
              >
                <option>Todas las categorías</option>
                <option>CA</option>
                <option>EU</option>
              </select>
            </div>
            <div className="bg-white">
              <div
                className="h-8 my-1  bg-black"
                style={{ width: 1 }}
              ></div>
            </div>
            <input
              type="text"
              name="phone-number"
              id="phone-number"
              className="block rounded-r-md lg:rounded-r-none text-gray-800 font-medium h-full w-full  lg:w-96 px-7 pl-3 focus:outline-none "
              placeholder="Buscar algo"
            />
            <div className="hidden sm:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-full block cursor-pointer text-gray-800 font-medium    bg-white  rounded-r-md  pr-2 pl-1 focus:outline-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex ">
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
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          <div className="flex flex-col -mt-2 ml-2">
            <span>Llámanos:</span>
            <span className="font-bold ">+53 53 535353</span>
          </div>
        </div>
        <div className="mx-2 hidden sm:flex -mt-2">
          <div className="h-12     bg-white" style={{ width: 1 }}></div>
        </div>

        <div className="hidden sm:flex">
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
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          <div className="flex flex-col -mt-2 ml-2">
            <span>Carrito de compras:</span>
            <span className="font-bold ">$199.00</span>
          </div>
        </div>
        {/* cart */}
        <div className="hidden px-0 mx-0 lg:flex">
          <CartIconGlobal key={"cartIcon2"} />
        </div>

         
      </div>
    </div>
  );
};

export default HeaderCenter;
