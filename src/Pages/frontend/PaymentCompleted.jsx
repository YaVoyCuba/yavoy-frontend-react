import React from "react";
import { Link } from "react-router-dom";

const PaymentCompleted = () => {
  return (
    <div>
      {" "}
      <div className="flex flex-col my-7 justify-center items-center">
        <img src="/assets/img/completed.png" className="h-96 w-auto" />
        <span className="text-2xl font-bold">¡Pago completado!</span>
        <span className="text-lg my-8 font-medium">
        Su orden se procesó con éxito. Gracias por su compra! El restaurante se comunicará con su familiar para hacer la entrega.
        </span>
        <Link to="/">
          <button className="btn-main mt-5">Ir al inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCompleted;
