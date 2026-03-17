import React, { useEffect } from "react";

const AboutCompanyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-14 md:px-8">
      <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Sobre nosotros</h1>
      <p className="mt-4 text-slate-700">
        YaVoy Cuba es una plataforma de comercio y logistica enfocada en conectar a cubanos en el exterior con sus
        familias en Cuba mediante compras y entregas coordinadas con socios locales.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Mision</h2>
          <p className="mt-2 text-sm text-slate-700">Hacer que enviar apoyo a la familia sea rapido, seguro y transparente.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Modelo</h2>
          <p className="mt-2 text-sm text-slate-700">Marketplace con pagos online y coordinacion de entrega a domicilio.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Cobertura</h2>
          <p className="mt-2 text-sm text-slate-700">Operaciones de compra internacional con distribucion local en Cuba.</p>
        </article>
      </div>
    </main>
  );
};

export default AboutCompanyPage;
