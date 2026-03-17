import React, { useEffect } from "react";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-14 md:px-8">
      <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Politica de privacidad</h1>
      <div className="mt-6 space-y-4 text-slate-700">
        <p>
          Recopilamos informacion necesaria para gestionar compras, pagos y entregas, incluyendo datos de contacto y
          direccion de entrega.
        </p>
        <p>
          Implementamos medidas de seguridad para proteger tu informacion y evitar accesos no autorizados.
        </p>
        <p>
          No vendemos datos personales. Solo compartimos informacion con proveedores y socios cuando es necesario para
          completar el servicio solicitado.
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
