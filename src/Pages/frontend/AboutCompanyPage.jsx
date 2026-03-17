import React, { useEffect } from "react";

const AboutCompanyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="-mx-3 bg-[#f7f5f6] text-slate-900 lg:-mx-14">
      <section className="stitch-reveal mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
        <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-slate-900 shadow-2xl md:min-h-[430px]">
          <img src="/assets/img/fondo.webp" alt="YaVoy Cuba" className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/55 to-transparent" />
          <div className="relative flex h-full max-w-3xl flex-col justify-end p-7 md:p-14">
            <span className="mb-4 inline-block rounded bg-[#f06233] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
              Nuestro compromiso
            </span>
            <h1 className="text-4xl font-black leading-[1.02] text-white md:text-6xl">
              Conectando Familias a Traves de las Fronteras
            </h1>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-200 md:text-xl">
              Acortamos la distancia entre usted y sus seres queridos en Cuba a traves del envio seguro, confiable y
              rapido de productos esenciales.
            </p>
          </div>
        </div>
      </section>

      <section className="stitch-reveal mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-8" style={{ animationDelay: "90ms" }}>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#f06233]">Nuestra mision</p>
          <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">
            La entrega va mas alla de los paquetes; se trata de cuidar.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            YaVoy Cuba nacio de una profunda comprension de los desafios que enfrentan las familias cuando intentan
            apoyar a sus parientes en la isla. Nuestra mision es proporcionar un puente transparente y absolutamente
            seguro para comestibles, medicinas y articulos de cuidado personal.
          </p>
          <div className="mt-7 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="material-symbols-outlined !text-base text-[#f06233]">security</span>
              Manejo seguro
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Cada articulo es rastreado y manejado con el maximo cuidado desde el envio hasta la puerta final.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-64 overflow-hidden rounded-xl shadow-lg">
            <img src="/assets/img/fondo.webp" alt="Centro logistico" className="h-full w-full object-cover" />
          </div>
          <div className="h-64 translate-y-8 overflow-hidden rounded-xl shadow-lg">
            <img src="/assets/img/product_by_libras.jpg" alt="Preparacion de paquetes" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="stitch-reveal bg-[#f4ebea] py-16" style={{ animationDelay: "160ms" }}>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="flex items-center justify-center gap-2 text-4xl font-black">
              <span className="material-symbols-outlined text-[#f06233]">history</span>
              Nuestra Historia
            </h2>
            <p className="mt-3 text-slate-600">
              Lo que comenzo como un pequeno proyecto de logistica en Miami se ha convertido en un pilar comunitario
              de confianza para la diaspora cubana.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-4xl font-black text-[#f06233]">2018</p>
              <p className="mt-3 text-lg font-bold">El Comienzo</p>
              <p className="mt-2 text-sm text-slate-600">Fundada por un grupo de ingenieros y expertos en logistica para simplificar envios a La Habana.</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-4xl font-black text-[#f06233]">2021</p>
              <p className="mt-3 text-lg font-bold">Expandiendo el Alcance</p>
              <p className="mt-2 text-sm text-slate-600">Expandimos operaciones para cubrir cada provincia en Cuba, sin dejar familias fuera del alcance.</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-4xl font-black text-[#f06233]">Today</p>
              <p className="mt-3 text-lg font-bold">El Puente Digital</p>
              <p className="mt-2 text-sm text-slate-600">Plataforma integrada que conecta inventario real con equipos locales de entrega confiables.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="stitch-reveal mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-8" style={{ animationDelay: "220ms" }}>
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="flex items-center justify-between bg-[#f06233] px-5 py-3 text-sm font-bold text-white">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined !text-base">verified</span>
              Estado de minorista verificado
            </span>
            <span>OK</span>
          </div>
          <div className="p-5">
            <img src="/assets/img/fondo.webp" alt="Inventario fisico" className="h-64 w-full rounded-lg object-cover" />
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <span className="material-symbols-outlined !text-base text-green-600">storefront</span>
                Operaciones de tienda fisica
              </p>
              <p className="mt-1 text-xs text-slate-600">No somos solo una app; gestionamos inventario real.</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#f06233]">Transparencia y seguridad</p>
          <h2 className="mt-2 text-4xl font-black">Por que confiar en YaVoy Cuba?</h2>
          <div className="mt-6 space-y-6">
            <article>
              <p className="flex items-center gap-2 text-xl font-bold">
                <span className="material-symbols-outlined text-[#f06233]">handshake</span>
                Socios Locales
              </p>
              <p className="mt-1 text-slate-600">Trabajamos directamente con agentes de entrega locales verificados que entienden cada vecindario.</p>
            </article>
            <article>
              <p className="flex items-center gap-2 text-xl font-bold">
                <span className="material-symbols-outlined text-[#f06233]">inventory_2</span>
                Inventario en Tiempo Real
              </p>
              <p className="mt-1 text-slate-600">A diferencia de revendedores externos, mantenemos existencias fisicas para entrega real.</p>
            </article>
            <article>
              <p className="flex items-center gap-2 text-xl font-bold">
                <span className="material-symbols-outlined text-[#f06233]">map</span>
                Presencia en Toda la Isla
              </p>
              <p className="mt-1 text-slate-600">Desde Pinar del Rio hasta Guantanamo, nuestra red cubre todo el pais con plazos confiables.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="stitch-reveal mx-auto w-full max-w-7xl px-4 pb-20 md:px-8" style={{ animationDelay: "280ms" }}>
        <div className="rounded-2xl bg-[#f06233] px-6 py-12 text-center text-white shadow-xl md:px-14 md:py-14">
          <h2 className="text-4xl font-black leading-tight md:text-5xl">Listo para enviar un poco de amor a casa?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Unase a miles de familias que confian en YaVoy Cuba para sus entregas mensuales esenciales.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#f06233]">
              Iniciar pedido ahora
            </a>
            <a href="/restaurantes" className="rounded-xl border border-white px-6 py-3 text-sm font-bold text-white">
              Ver productos
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutCompanyPage;
