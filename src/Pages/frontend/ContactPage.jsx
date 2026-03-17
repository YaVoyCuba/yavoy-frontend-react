import React, { useEffect } from "react";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-14 md:px-8">
      <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Contacto</h1>
      <p className="mt-3 text-slate-600">
        Estamos disponibles para ayudarte con pedidos, entregas y dudas sobre la plataforma.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Correo</h2>
          <p className="mt-2 text-lg font-semibold text-slate-900">soporte@yavoycuba.com</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Telefono</h2>
          <p className="mt-2 text-lg font-semibold text-slate-900">+1 (800) 123-4567</p>
        </article>
      </div>

      <article className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Direccion comercial</h2>
        <p className="mt-2 text-lg font-semibold text-slate-900">Miami, FL, USA</p>
      </article>
    </main>
  );
};

export default ContactPage;
