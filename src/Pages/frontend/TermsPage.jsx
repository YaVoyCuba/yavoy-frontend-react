import React, { useEffect } from "react";

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-14 md:px-8">
      <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Terminos y condiciones</h1>
      <div className="mt-6 space-y-4 text-slate-700">
        <p>
          YaVoy opera como plataforma de comercio y coordinacion de entregas con socios locales. Al usar el sitio,
          aceptas cumplir las politicas de compra, pago y entrega publicadas.
        </p>
        <p>
          Los tiempos de entrega son estimados y pueden variar por disponibilidad, clima o factores logisticos de
          terceros. El cliente debe facilitar informacion correcta para procesar su orden.
        </p>
        <p>
          Nos reservamos el derecho de cancelar pedidos con indicios de fraude, incumplimiento o uso indebido de la
          plataforma.
        </p>
      </div>
    </main>
  );
};

export default TermsPage;
