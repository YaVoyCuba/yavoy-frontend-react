import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiManager from "../../api/apiManager";
import { removeItem } from "../../redux/cartSlice";
import { RadioGroup } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Loading } from "../../common/Loading";
import { clearCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const methodsDeliveries = [
  { name: "Entrega a domicilio", active: true },
  { name: "Recogida en tienda", active: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CheckOut = () => {
  const [empty, setEmpty] = useState(false);
  const [tropipayData, setTropipayData] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const location = useSelector((state) => state.location.location);
  const [countries, setCountries] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //Data
  const [schedules, setSchedules] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [daysOpens, setDaysOpens] = useState([]);
  const [zones, setZones] = useState([]);
  const [settings, setSettings] = useState([]);

  const [method, setMethod] = useState(methodsDeliveries[0]);

  const dispatch = useDispatch();

 const removeItemLocal = (id) => {
    dispatch(removeItem(id));

    //check if cart is empty
    if (cart.length === 1) {
      setEmpty(true);
    }
  };

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });

    return total;
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return getTotalQuantity() * total;
  };

  const deliveryCost = () => {
    if (method == methodsDeliveries[1]) {
      return 0;
    } else {
      //Find in zones the zone where the location is municipalitie_id and get price
      let zone = zones.find(
        (zone) => zone.municipalitie_id == location.locationId
      );
      return zone?.price ?? 0;
    }
  };

  const fee = () => {
    return (
      (Number(getTotalPrice() + deliveryCost()).toFixed(2) *
        settings.fee_restaurants) /
      100
    );
  };

  console.log("getTotalPrice",getTotalQuantity() ,"getTotalPrice", getTotalPrice(), "deliveryCost", deliveryCost()).toFixed(2), "fee", fee());


  const getTotalPriceFinal = () => {
    return getTotalPrice() + fee() + deliveryCost();
  };

  const getRestaurantData = async () => {
    let json = await apiManager.getDataForCheckOut(cart[0].restaurantId);

    if (json.code == "ok") {
      setSchedules(json.data.schedules);
      setDaysOpens(json.data.daysOpens);
      setZones(json.data.zones);
      setRestaurant(json.data.restaurant);
      setSettings(json.data.settings);
    }
  };
  const getTropipayCountries = async () => {
    let json = await apiManager.getTropiapayCountries();
    if (json.code == "ok") {
      setCountries(json.data);
    }
  };

  const newOrder = async (data) => {
    setLoading(true);
    let methodDelivery =
      method.name == "Entrega a domicilio" ? "delivery" : "pick";

    const payload = {
      cart: cart,
      pointToDelivery: null,
      deliveryCost: deliveryCost(),
      userId: null,
      userName: data.userName,
      userEmail: data.userEmail,
      userPhone: data.userPhone,
      schedule: data.schedule,
      dayDelivery: data.dayDelivery,
      currency_code: "USD",
      method_payment: "tropipay",
      client: {
        name: data.clientName,
        lastName: data.clientLastName,
        address: data.clientAddress,
        phone: data.clientPhone,
        email: data.clientEmail,
        countryId: data.clientCountry,
        termsAndConditions: true,
      },
    };

    let json = await apiManager.newOrder(payload);

    if (json.code == "ok") {
      dispatch(clearCart());
      window.location.href = json.url;
    } else {
      toast.error("Ocurrió un error al procesar el pago!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (cart.length > 0) {
      getRestaurantData();
      getTropipayCountries();
    } else {
      setEmpty(true);
    }
  }, []);

  return (
    <>
      {!empty ? (
        loading ? (
          <Loading />
        ) : (
          <div>
            <form onSubmit={handleSubmit(newOrder)}>
              <div className="grid grid-cols-12 bg-gray-100 rounded-lg shadow-lg my-20 p-4">
                <div className="col-span-12 lg:col-span-6">
                  <div className="flex p-3 space-y-3 flex-col mt-2">
                    <span className="title   ">Información de la entrega</span>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700   mt-2">
                          Modo de entrega
                        </span>
                      </div>

                      <RadioGroup
                        value={method}
                        onChange={setMethod}
                        className="mt-2"
                      >
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                          {methodsDeliveries.map((option) => (
                            <RadioGroup.Option
                              key={option.name}
                              value={option}
                              className={({ active, checked }) =>
                                classNames(
                                  option.active
                                    ? "cursor-pointer focus:outline-none"
                                    : "opacity-25 cursor-not-allowed",
                                  active
                                    ? "ring-2 ring-offset-2 ring-red-500"
                                    : "",
                                  checked
                                    ? "bg-main border-transparent text-white hover:bg-red-500"
                                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                  "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                                )
                              }
                              disabled={!option.active}
                            >
                              <RadioGroup.Label as="span">
                                {option.name}
                              </RadioGroup.Label>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {method == methodsDeliveries[0] && (
                      <>
                        <div className="flex flex-col space-y-3">
                          <span className="text-gray-700  ">
                            Nombre del receptor
                          </span>
                          <input
                            type="text"
                            className="input-text"
                            {...register("receiverName", { required: true })}
                          />
                          {errors.receiverName && (
                            <span className="text-red-500 font-medium">
                              Este campo es requerido
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col space-y-3">
                          <span className="text-gray-700  ">
                            Direcion del receptor en {location.locationName}
                          </span>
                          <input
                            type="text"
                            className="input-text"
                            {...register("receiverAddress", { required: true })}
                          />
                          {errors.receiverAddress && (
                            <span className="text-red-500 font-medium">
                              Este campo es requerido
                            </span>
                          )}
                        </div>
                      </>
                    )}
                    {method == methodsDeliveries[1] && (
                      <>
                        <div className="flex flex-col bg-gray-200 space-y-1 border-1 p-3 border-gray-300   rounded-lg">
                          <span className="text-gray-700 font-medium">
                            Recogida en el restaurante
                          </span>
                          <span className="text-gray-700">
                            Dirección: {restaurant.address}
                          </span>
                          <span className="text-gray-700">
                            Teléfono: {restaurant.phone}
                          </span>
                          <span className="text-gray-700">
                            Email: {restaurant.phone}
                          </span>
                        </div>
                        <div className="flex flex-col space-y-3">
                          <span className="text-gray-700">
                            Nombre del receptor
                          </span>
                          <input
                            type="text"
                            className="input-text"
                            {...register("receiverName", { required: true })}
                          />
                          {errors.receiverName && (
                            <span className="text-red-500 font-medium">
                              Este campo es requerido
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col space-y-3">
                          <span className="text-gray-700">
                            Teléfono del receptor
                          </span>
                          <input
                            type="text"
                            className="input-text"
                            {...register("receiverPhone", { required: true })}
                          />
                          {errors.receiverPhone && (
                            <span className="text-red-500 font-medium">
                              Este campo es requerido
                            </span>
                          )}
                        </div>
                      </>
                    )}

                    {/* <span className="text-gray-700 py-1">Zona de entrega</span>
            <select name="" id="" className="input-text">
              {zones?.map((zone, index) => {
                return (
                  <option value={zone.id}>
                    {zone.municipalitie.name}
                  </option>
                );
              })}
            </select> */}

                    <span className="text-gray-700  ">Día de entrega</span>
                    <select
                      {...register("dayDelivery", { required: true })}
                      className="input-text"
                    >
                      <option value="">-Selecciona-</option>
                      {daysOpens?.map((day, index) => {
                        return (
                          <option key={`day-${index}`} value={day}>
                            {day}
                          </option>
                        );
                      })}
                    </select>
                    {errors.dayDelivery && (
                      <span className="text-red-500 font-medium">
                        Este campo es requerido
                      </span>
                    )}

                    <span className="text-gray-700   mt-2">
                      Hora de entrega
                    </span>
                    <select
                      {...register("schedule", { required: true })}
                      className="input-text"
                    >
                      <option value="">-Selecciona-</option>
                      {schedules?.map((schedule, index) => {
                        return (
                          <option key={`schedule-${index}`} value={schedule.id}>
                            {schedule.schedule.schedule}
                          </option>
                        );
                      })}
                    </select>
                    {errors.schedule && (
                      <span className="text-red-500 font-medium">
                        Este campo es requerido
                      </span>
                    )}

                    <span className="text-gray-700  ">Nota aclaratoria</span>
                    <textarea
                      {...register("orderNote")}
                      rows="3"
                      className="input-text"
                      placeholder="Ejemplo: Incluir tarjeta de felicitación a nombre de ...; Soy alérgico a.."
                    ></textarea>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6 bg-gray-50">
                  <div className="bg-gray-10">
                    <div className="flex flex-col mt-2">
                      <span className="title p-3">Productos a entregar</span>
                      {cart.map((product, index) => {
                        return (
                          <div
                            key={`productcartglobal-${index}`}
                            className="grid grid-cols-9 p-3 justify-items-center"
                          >
                            <div className="col-span-3 bg-slate-100 rounded-lg">
                              <img
                                className="h-32 w-32 object-contain p-2"
                                src={product.img}
                              />
                            </div>
                            <div className="col-span-5 p-3">
                              <div className="flex flex-col">
                                <span className="text-lg font-medium text-gray-800">
                                  {product.name}
                                </span>
                                <div className="flex space-x-2">
                                  <span className="text-2xl text-gray-500">
                                    {product.quantity}
                                  </span>
                                  <span className="text-2xl">X</span>
                                  <span className=" text-2xl font-medium color-green">
                                    {product.price}
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
                                onClick={() => removeItemLocal(product.id) }
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

                      <hr className="separator  " />
                      <div className="border-2 flex lg:mx-14 flex-col border-gray-400 border-dashed h-30 my-3 p-3">
                        Productos: ${getTotalPrice()}
                        <br />
                        <span className="py-1">
                          {" "}
                          Costo de envío: ${deliveryCost()}
                        </span>
                        <span className="py-1">YaVoy fee: ${fee()}</span>
                        <hr className="py-2" />
                        <span className="text-lg font-bold">
                          Total: $ {getTotalPriceFinal()}
                        </span>
                      </div>

                      <hr className="separator  " />
                      <span className="title p-3">Método de pago</span>
                      {tropipayData ? (
                        <div>
                          <span className="title p-3">
                            Datos de facturación
                          </span>
                          <div className="p-3">
                            <div className="flex flex-col space-y-3">
                              <span className="text-gray-700">Nombre</span>
                              <input
                                type="text"
                                className="input-text"
                                {...register("clientName", { required: true })}
                              />
                              {errors.clientName && (
                                <span className="text-red-500 font-medium">
                                  Este campo es requerido
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col space-y-3">
                              <span className="text-gray-700">Apellidos</span>
                              <input
                                type="text"
                                className="input-text"
                                {...register("clientLastName", {
                                  required: true,
                                })}
                              />
                              {errors.clientLastName && (
                                <span className="text-red-500 font-medium">
                                  Este campo es requerido
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col space-y-3">
                              <span className="text-gray-700">Dirección</span>
                              <input
                                type="text"
                                className="input-text"
                                {...register("clientAddress", {
                                  required: true,
                                })}
                              />
                              {errors.clientAddress && (
                                <span className="text-red-500 font-medium">
                                  Este campo es requerido
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col space-y-3">
                              <span className="text-gray-700">Email</span>
                              <input
                                type="text"
                                className="input-text"
                                {...register("clientEmail", { required: true })}
                              />
                              {errors.clientEmail && (
                                <span className="text-red-500 font-medium">
                                  Este campo es requerido
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col space-y-3">
                              <span className="text-gray-700">Teléfono</span>
                              <input
                                type="text"
                                className="input-text"
                                {...register("clientPhone", { required: true })}
                              />
                              {errors.clientPhone && (
                                <span className="text-red-500 font-medium">
                                  Este campo es requerido
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col space-y-3">
                              <span className="text-gray-700   mt-2">País</span>
                              <select
                                {...register("clientCountry", {
                                  required: true,
                                })}
                                className="input-text"
                              >
                                <option value="">-Selecciona-</option>
                                {countries?.map((country, index) => {
                                  return (
                                    <option
                                      key={`country-${country.id}`}
                                      value={country.id}
                                    >
                                      {country.name}
                                    </option>
                                  );
                                })}
                              </select>
                              {errors.clientCountry && (
                                <span className="text-red-500 font-medium">
                                  Este campo es requerido
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn-main flex  mt-7 px-7 mx-auto"
                          >
                            <span className="px-7 text-lg font-medium">
                              Pagar con tarjeta
                            </span>
                            <img
                              src="/assets/img/tropipay.png"
                              className="h-10 w-auto"
                            />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setTropipayData(true)}
                          className="btn-main flex  mt-7 px-7 mx-auto"
                        >
                          <span className="px-7 text-lg font-medium">
                            Pagar con tarjeta
                          </span>
                          <img
                            src="/assets/img/tropipay.png"
                            className="h-10 w-auto"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )
      ) : (
        <div className="flex flex-col my-7 justify-center items-center">
          <img src="/assets/img/notfound.png" className="h-96 w-auto" />
          <span className="text-2xl font-bold">Tu carrito está vacío</span>
          <Link to={'/'}>
            <button className="btn-main mt-5">Ir al inicio</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default CheckOut;
