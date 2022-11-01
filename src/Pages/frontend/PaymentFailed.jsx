import React from "react";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div>
      {" "}
      <div className="flex flex-col my-7 justify-center items-center">
        <img src="/assets/img/notfound.png" className="h-96 w-auto" />
        <span className="text-2xl font-bold">Pago rechazado</span>
        <span className="text-lg my-8 font-medium">
           Ocurrió un error y no fue posible completar el pedido. Contacta a nuestro servicio <br/> 
        </span>
        <Link href="/">
          <button className="btn-main mt-5">Ir al inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;
