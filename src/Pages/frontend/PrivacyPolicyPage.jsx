import React, { useEffect } from "react";
import { Trans } from "@lingui/react/macro";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-14 md:px-8">
      <h1 className="text-3xl font-black text-slate-900 md:text-4xl"><Trans>Politica de privacidad</Trans></h1>
      <div className="mt-6 space-y-4 text-slate-700">
        <p>
          <Trans>Recopilamos informacion necesaria para gestionar compras, pagos y entregas, incluyendo datos de contacto y direccion de entrega.</Trans>
        </p>
        <p>
          <Trans>Implementamos medidas de seguridad para proteger tu informacion y evitar accesos no autorizados.</Trans>
        </p>
        <p>
          <Trans>No vendemos datos personales. Solo compartimos informacion con proveedores y socios cuando es necesario para completar el servicio solicitado.</Trans>
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
