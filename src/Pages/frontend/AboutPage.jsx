import React from "react";
import { useEffect } from "react";

function AboutPage() {
  useEffect(() => window.scrollTo(0, 0));
  return (
    <div>
      <div className="grid h-screen grid-cols-7">
        <div className="col-span-7 lg:col-span-5">
          <div className="flex space-y-3 p-7 flex-col">
            <span className="title">Mantengámosno conectados</span>
            <span className="subtitle-2">
              Su dirección de correo electrónico no será publicada. Los campos
              obligatodios están marcados *
            </span>
            <textarea
              className="input-text border-2 border-gray-700 p-3"
              rows="7"
              placeholder="Mensaje *"
            ></textarea>
            <div className="flex flex-wrap lg:flex-nowrap lg:space-x-5  ">
                <input type="text" className="input-text my-1 w-[100%]"  placeholder="Nombre y apellidos" />
                <input type="text" className="input-text my-1 w-[100%]" placeholder="Correo electrónico"/>
            </div>
          </div>
        </div>
        <div className="col-span-7 lg:col-span-2">
          <div className="flex  p-7 space-y-8 flex-col">
            <div className="flex flex-col">
                <span className="subtitle">Sede</span>
                <span>Calel 123 entre Calle 456 y Calle 789, Vedado, La Habana, Cuba</span>
            </div>
            <div className="flex flex-col">
                <span className="subtitle">Teléfono</span>
                <span>+5353535353</span>
                <span>+5353535355</span>
            </div>
            <div className="flex flex-col">
                <span className="subtitle">Soporte</span>
                <span>soporte@gmail.com</span>
                <span>atencionalcliente@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
