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
            Muchas gracias por su compra, su pedido ya <br/> está siendo procesado. Espere noticia pronto.
        </span>
        <Link href="/">
          <button className="btn-main mt-5">Ir al inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCompleted;
