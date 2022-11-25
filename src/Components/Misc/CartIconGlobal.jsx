import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  removeItem } from "../../redux/cartSlice";
 

const CartIconGlobal = () => {
  const {cart} = useSelector((state) =>state.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const getTotalQuantity = () => {
    let total = 0;
   
    if(cart){
      cart.forEach((item) => {
        total += item.quantity;
      });
    } 
    return Number(total).toFixed();
  };

  
  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
   
    return Number(total).toFixed(2);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className=" flex cursor-pointer  pr-3 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 pt-1 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>

        {getTotalQuantity()}
      </button>
 
 
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                      <div className="px-4 flex justify-between pb-3 sm:px-6">
                        <span className="subtitle uppercase">
                          Carrito de compra
                        </span>
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white main-color hover:text-gray-500 focus:outline-none focus:outline-none  "
                              onClick={() => setOpen(false)}
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
                      <hr className="separator mx-3" />
                      <div>
                        {cart.map((product,index) => {
                          return (
                            <div
                            key={`productcartglobal-${index}`}
                              className="grid  grid-cols-9 p-3  items-center"
                            >
                              <div className="col-span-3 bg-slate-100 rounded-lg">
                                <img
                                  className="h-32 w-32 object-contain p-2"
                                  src={product.img}
                                />
                              </div>
                              <div className="col-span-5 items-center p-3">
                                <div className="flex flex-col">
                                  <span className="text-lg font-medium text-gray-800">
                                    {product.name}
                                  </span>
                                  <div className="flex space-x-2">
                                    <span className="text-lg text-gray-500">
                                      {product.quantity}
                                    </span>
                                    <span className="text-lg">X</span>
                                    <span className=" text-lg font-medium color-green">
                                      {Number(product.price).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="col-span-1 flex flex-col "
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <button
                                  onClick={() =>
                                    dispatch(removeItem(product.id))
                                  }
                                  style={{
                                    borderColor: "black",
                                    borderStyle: "solid",
                                    borderWidth: 1,
                                    borderRadius: 100,
                                  }}
                                  className=" p-0.5 focus:outline-none"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>

                                 
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mx-3">
                        <hr className="separator  " />
                        <div className="flex py-2 justify-between">
                          <span className="subtitle-2 px-2">Subtotal</span>
                          <span className="subtitle-2 px-2">
                            { Number(getTotalPrice()).toFixed(2) }
                          </span>
                        </div>
                        <hr className="separator  " />
                        <div className="flex flex-col">
                          <Link className=" mt-3 text-center" to={"carrito"}>
                            <span
                              onClick={() => setOpen(false)}
                              className="text-center text-lg  color-main  font-medium mt-3"
                            >
                              Ver Carrito
                            </span>
                          </Link>
                          <Link
                           onClick={() => setOpen(false)}
                            className="btn-main  mt-5 text-center"
                            to={"caja"}
                          >
                            <button
                             
                              className="uppercase"
                            >
                              Completar pago
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default CartIconGlobal;
