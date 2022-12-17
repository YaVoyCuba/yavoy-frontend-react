import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import apiManager from "../../../api/apiManager";
import { Loading } from "../../../common/Loading";

const PaymentBookings = () => {
  const { bookingCode } = useParams();
  const [booking, setBooking] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const getBooking = async () => {
    let json = await apiManager.getBooking(bookingCode);

    if (json != 500) {
      setBooking(json.booking);
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

    const payload = {
      bookingCode: bookingCode,
      currency_code: "USD",
      method_payment: "tropipay",
      clientPhone: data.clientPhone,
      clientEmail: data.clientEmail,
      clientName: data.clientName + " " + data.clientLastName,
      client: {
        name: data.clientName,
        lastName: data.clientLastName,
        address: data.clientAddress,
        phone: data.clientPhone,
        email: data.clientEmail,
        countryId: data.clientCountry,
        termsAndConditions: true,
      },
      contact : {
        name: data.contactName,
        email: data.contactEmail ?? '',
        phone: data.contactPhone,
      },
    };

    let json = await apiManager.newBookingPayment(payload);
    
    console.log(json);

    if (json.code == "ok") {
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
    getBooking();
    getTropipayCountries();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="bg-color-100 mx-auto max-w-5xl h-32 mb-10">
            <div className="flex flex-col justify-center items-center h-full">
              <div className="flex flex-col justify-center items-center">
                <div className="text-2xl color font-bold text-color-100">
                  {booking?.status == "approvated"
                    ? "Reservacion aprovada, Pendiente de pago"
                    : "Pago realizado"}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-20 justify-center items-center">
            <form onSubmit={handleSubmit(newOrder)}>
              <div>
                <span className="title p-3">Datos de contacto</span>
              <div className="p-3">
                <div className="flex flex-col space-y-3">
                  <span className="text-gray-700">Nombre</span>
                  <input
                    type="text"
                    className="input-text"
                    {...register("contactName", { required: true })}
                  />
                  {errors.contactName && (
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
                    {...register("contactEmail", { required: true })}
                  />
                  {errors.contactEmail && (
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
                    {...register("contactPhone", { required: true })}
                  />
                  {errors.contactPhone && (
                    <span className="text-red-500 font-medium">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                </div>

                <span className="title p-3">Datos de facturación</span>
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
                        required: false,
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
                <span classNama="text-center mx-auto">
                  * Las tarjetas deben tener habilitado 3D-Secure para ser
                  aceptadas
                </span>
                <button
                  type="submit"
                  className="btn-main flex  mt-7 px-7 mx-auto"
                >
                  <span className="px-7 text-lg font-medium">
                    Pagar con tarjeta
                  </span>
                  <img src="/assets/img/tropipay.png" className="h-10 w-auto" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentBookings;
