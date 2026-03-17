import React, { useEffect } from "react";

const RefundPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-14 md:px-8">
      <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Politica de reembolso</h1>
      <div className="mt-6 space-y-4 text-slate-700">
        <p>
          El cliente puede solicitar revision de su compra si existe incumplimiento de entrega, error de pedido o
          incidencia demostrable en el servicio.
        </p>
        <p>
          Cada solicitud se evalua en un plazo razonable y puede resolverse mediante reembolso parcial, total o
          reposicion segun el caso.
        </p>
        <p>
          Para gestionar un caso, escribe a soporte@yavoycuba.com con el numero de orden y evidencias relacionadas.
        </p>
      </div>
    </main>
  );
};

export default RefundPolicyPage;
