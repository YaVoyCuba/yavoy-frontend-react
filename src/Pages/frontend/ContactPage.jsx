import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ContactPage = () => {
  const info = useSelector((state) => state.info.info);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="-mx-3 bg-[#f6f4f5] text-slate-900 lg:-mx-14">
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2 lg:px-8">
        <div className="stitch-reveal">
          <h1 className="text-5xl font-black leading-tight md:text-6xl">Como podemos ayudarte?</h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-600">
            Estamos aqui para asistirte con tus viajes y envios a Cuba. Escribenos y nos pondremos en contacto
            contigo lo antes posible.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                Nombre
                <input className="mt-2 w-full rounded-lg border-slate-200" placeholder="Nombre completo" type="text" />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Correo electronico
                <input className="mt-2 w-full rounded-lg border-slate-200" placeholder="correo@ejemplo.com" type="email" />
              </label>
            </div>
            <label className="mt-4 block text-sm font-semibold text-slate-700">
              Asunto
              <input className="mt-2 w-full rounded-lg border-slate-200" placeholder="Consulta sobre..." type="text" />
            </label>
            <label className="mt-4 block text-sm font-semibold text-slate-700">
              Mensaje
              <textarea
                className="mt-2 min-h-[140px] w-full resize-none rounded-lg border-slate-200"
                placeholder="Cuentanos mas sobre tus necesidades..."
              />
            </label>
            <button className="mt-5 w-full rounded-lg bg-[#f06233] px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-[#e1572b]" type="submit">
              <span className="inline-flex items-center gap-2">
                Enviar mensaje
                <span className="material-symbols-outlined !text-base">send</span>
              </span>
            </button>
          </form>
        </div>

        <div className="space-y-4 stitch-reveal" style={{ animationDelay: "120ms" }}>
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <p className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1ec] text-[#f06233]">
              <span className="material-symbols-outlined">mail</span>
            </p>
            <p className="text-sm text-slate-500">Visitanos</p>
            <p className="mt-1 text-2xl font-bold">{info?.mail || "soporte@yavoycuba.com"}</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <p className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1ec] text-[#f06233]">
              <span className="material-symbols-outlined">call</span>
            </p>
            <p className="text-sm text-slate-500">Visitanos</p>
            <p className="mt-1 text-2xl font-bold">{info?.phone || "+1 (800) 123-4567"}</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <p className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1ec] text-[#f06233]">
              <span className="material-symbols-outlined">location_on</span>
            </p>
            <p className="text-sm text-slate-500">Visitanos</p>
            <p className="mt-1 text-2xl font-bold">8300 NW 33rd St, Miami, FL 33122</p>
          </article>

          <div className="relative h-[320px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <img src="/assets/img/fondo.webp" alt="Ubicacion en Miami" className="h-full w-full object-cover grayscale" />
            <div className="absolute bottom-4 left-4 rounded-lg bg-white px-4 py-2 text-sm font-bold shadow-lg">
              Nuestra sede en Miami
            </div>
          </div>

          <div className="rounded-xl border border-[#f2cdc0] bg-[#fff1ec] p-5 md:p-6">
            <h3 className="font-bold text-[#f06233]">Horario de atencion al cliente</h3>
            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Lun - Vie</p>
                <p className="font-bold">9:00 AM - 6:00 PM</p>
              </div>
              <div>
                <p className="text-slate-500">Sabado</p>
                <p className="font-bold">10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
