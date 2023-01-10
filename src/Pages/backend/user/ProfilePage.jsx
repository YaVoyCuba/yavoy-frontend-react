import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { useEffect } from "react";
import apiManager from "../../../api/apiManager";
import { Loading } from "../../../common/Loading";
import { logout } from "../../../redux/authSlice";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [page, setPage] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useSelector((state) => state.auth);
  const [bookingToView, setBookingToView] = useState([]);
  const [orderToView, setOrderToView] = useState([]);
  const [openOrder, setOpenOrder] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  const tabs = [
    { name: "Pedidos", href: "#", count: "0", current: true },
    { name: "Reservas", href: "#", count: "0", current: false },
  ];

  const dispatch = useDispatch();
  const getUserInfo = async () => {
    const json = await apiManager.userInfo(token);

    if (json.code == "ok") {
      setOrders(json.data.orders);
      tabs[0].count = json.data.orders.length;
      tabs[1].count = json.data.bookings.length;
      
      setBookings(json.data.bookings);
      setLoading(false);
    }
  };

  const logoutHandle = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  useEffect(() => {
    token && getUserInfo();
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-14 lg:max-w-lg lg:mx-auto">
          <div>
            <span className="text-2xl font-bold text-color">
              Hola {user.name}
            </span>
          </div>

          <div className="mt-7 ">
            <div className="bg-red-50 text-center rounded-2xl p-4">
              <button
               onClick={() => logoutHandle()}
              >Salir de la cuenta</button>
            </div>
            <div className="  ">
              <nav
                className=" flex divide-x divide-gray-200 rounded-lg shadow"
                aria-label="Tabs"
              >
                <button
                  onClick={() => setPage("orders")}
                  className={`${
                    page == "orders" ? "border-b-2  text-gray-700" : "border-0"
                  }   group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10`}
                >
                  Pedidos
                </button>
                <button
                  onClick={() => setPage("bookings")}
                  className={`${
                    page == "bookings"
                      ? "border-b-2   text-gray-700"
                      : "border-0"
                  }   group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10`}
                >
                  Reservas
                </button>
              </nav>
            </div>
            {page == "orders" && (
              <div className="mt-7">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Pedidos
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Detalles de los pedidos realizados.
                    </p>
                  </div>
                  <div>
                    <ul className="divide-y divide-gray-200">
                      {orders.map((order) => (
                        <li key={order.id}>
                          <a href="#" className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-orange-600 truncate">
                                  Pedido #{order.id}
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {order.status}
                                  </p>
                                  <button
                                    onClick={() => {
                                      setOrderToView(order);
                                      setOpenOrder(true);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 text-gray-500 ml-3"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {page == "bookings" && (
              <div className="mt-7">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Reservas
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Detalles de las reservas de alojamiento realizados.
                    </p>
                  </div>
                  <div>
                    <ul className="divide-y divide-gray-200">
                      {bookings.map((book) => (
                        <li key={book.id}>
                       
                          <a href="#" className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-orange-600 truncate">
                                  Reserva #{book.booking_code}
                                </p>
                                {book.status == "approvated" && (
                                  <div className="ml-2 flex-shrink-0 flex">
                                    <Link to={`/booking/${book.booking_code}`}>
                                      <button
                                        className="bg-green-500 rounded-lg text-white px-3 py-1 hover:bg-green-600"
                                        onClick={() => {}}
                                      >
                                        {" "}
                                        Pagar ahora
                                      </button>
                                    </Link>
                                  </div>
                                )}

                                <div className="ml-2 flex-shrink-0 flex">
                                  <p
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  first-letter:
                                    ${
                                      book.status == "pending"
                                        ? "bg-orange-100 text-orange-800 "
                                        : " bg-green-100 text-green-800"
                                    }
                                  `}
                                  >
                                    {book.status}
                                  </p>
                                  <button
                                    onClick={() => {
                                      setBookingToView(book);
                                      setOpenBooking(true);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 text-gray-500 ml-3"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </a>
                        </li>
                      ))}

                      {bookings.length == 0 && (
                        <div className="px-4 py-5 sm:px-6">
                          <div className="text-sm text-gray-500">
                            No hay reservas realizadas.
                          </div>
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Transition.Root show={openOrder} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpenOrder}>
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

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
                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                          <div className="px-4 sm:px-6">
                            <div className="flex pr-10 items-start justify-between">
                              <Dialog.Title className="text-lg font-medium text-gray-900">
                                Pedido {orderToView.id} ({orderToView.ref})
                              </Dialog.Title>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                  onClick={() => setOpenOrder(false)}
                                >
                                  <span className="sr-only">Close panel</span>
                                  <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="my-3 flex flex-col  w-full">
                            {orderToView.delivery == "delivery" ? (
                              <span className="text-sm bg-green-100 p-3  font-medium text-gray-900">
                                Entrega a domicilio: {orderToView.date_delivery}
                              </span>
                            ) : (
                              <span className="text-sm bg-green-100 p-3  font-medium text-gray-900">
                                Recogida en tienda:{" "}
                                {orderToView.restaurant?.address}
                              </span>
                            )}
                          </div>
                          <div className="relative mt-6 flex-1 px-6 pr-14 sm:px-6">
                            {/* Replace with your content */}

                            <div className="relative  flex-1 flex flex-col">
                              <div className="flex-1">
                                <div className="mt-2">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-orange-600 truncate">
                                      Pedido #{orderToView.id}
                                    </p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {orderToView.status}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-orange-600 truncate">
                                      Cliente:
                                    </p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {orderToView.client_name}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-orange-600 truncate">
                                      Fecha: {orderToView.date}
                                    </p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {orderToView.total} USD
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-orange-600 truncate">
                                      Dirección: {orderToView.address}
                                    </p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {orderToView.user_address}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-orange-600 truncate">
                                      Teléfono:
                                    </p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {orderToView.user_phone}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-2">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-orange-600 truncate">
                                      Productos:
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <div className="flex items-center justify-between px-3">
                                    <p className="text-sm font-medium text-orange-600 truncate">
                                      {orderToView.products?.map((product) => (
                                        <div
                                          className="mt-2 "
                                          key={product.product.id}
                                        >
                                          <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-orange-600 truncate">
                                              {product.product.name}
                                            </p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {product.amount}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </p>
                                  </div>
                                </div>
                              </div>
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

          <Transition.Root show={openBooking} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpenBooking}>
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

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
                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                          <div className="px-4 sm:px-6">
                            <div className="flex pr-10 items-start justify-between">
                              <Dialog.Title className="text-lg font-medium text-gray-900">
                                Reserva {bookingToView.id} (
                                {bookingToView.booking_code})
                              </Dialog.Title>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                  onClick={() => setOpenBooking(false)}
                                >
                                  <span className="sr-only">Close panel</span>
                                  <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="my-3  flex flex-col  w-full">
                            <span className="text-sm px-4 bg-green-100 p-3  font-medium text-gray-900">
                              Alojamiento: {bookingToView.house?.title}
                            </span>
                            <span className="text-sm px-4 bg-green-100 p-3  font-medium text-gray-900">
                             Teléfono de Contacto: {bookingToView.house?.user?.phone}
                            </span>
                            <span className="text-sm px-4 bg-green-100 p-3  font-medium text-gray-900">
                             Email de Contacto: {bookingToView.house?.user?.email}
                            </span>
                          </div>
                          <div className="relative mt-6 flex-1 px-6 pr-14 sm:px-6">
                            {/* Replace with your content */}
                            <div className="relative  flex-1 flex flex-col">
                              <div className="flex-1">
                                <div className="mt-2">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-orange-600 truncate">
                                      Estado
                                    </p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                      <p
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full first-letter:
                                        ${
                                          bookingToView.status === "pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : bookingToView.status ===
                                              "approvated"
                                            ? "bg-green-100 text-green-800"
                                            : bookingToView.status ===
                                              "completed"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                      >
                                        {bookingToView.status}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-2">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-orange-600 truncate">
                                      Fecha
                                    </p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {bookingToView.date}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
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
      )}
    </>
  );
};

export default ProfilePage;
