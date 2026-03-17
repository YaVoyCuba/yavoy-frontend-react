import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "dulcerias",
    name: "Dulcerias",
    description: "Postres y combos dulces para sorprender en casa.",
    href: "/dulcerias",
    icon: "🍰",
    gradient: "from-amber-300 to-orange-500",
  },
  {
    id: "mercados",
    name: "Mercados",
    description: "Productos frescos y de primera necesidad.",
    href: "/mercados",
    icon: "🥬",
    gradient: "from-emerald-300 to-emerald-600",
  },
  {
    id: "regalitos",
    name: "Regalitos",
    description: "Detalles y paquetes para fechas especiales.",
    href: "/regalitos",
    icon: "🎁",
    gradient: "from-orange-300 to-rose-500",
  },
  {
    id: "restaurantes",
    name: "Restaurantes",
    description: "Comidas listas para enviar con entrega local.",
    href: "/restaurantes",
    icon: "🍽️",
    gradient: "from-cyan-300 to-blue-600",
  },
];

const MainLandingRedesign = () => {
  return (
    <div className="-mx-3 lg:-mx-14 bg-[#f6f6f7] text-slate-900">
      <section className="relative overflow-hidden border-b border-[#f0d7cf] bg-[#f7f3f1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(242,98,51,0.16),_transparent_42%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 md:px-8 lg:grid-cols-2 lg:items-center lg:py-16">
          <div>
            <div className="mb-5 inline-flex items-center rounded-full bg-[#f8ded5] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#f06233]">
              Entrega 100% garantizada
            </div>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-slate-900 md:text-6xl">
              Envia productos y paquetes a tu
              <span className="text-[#f06233]"> familia</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Compra online de forma segura y coordinamos la entrega directamente a su puerta con nuestros socios locales certificados.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/restaurantes"
                className="rounded-xl bg-[#f06233] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-300 transition hover:-translate-y-0.5 hover:bg-[#df592d]"
              >
                Ver productos
              </Link>
              <a
                href="#how-it-works"
                className="rounded-xl border border-[#f5b39b] bg-white px-7 py-3 text-sm font-bold text-[#f06233] transition hover:bg-[#fff6f2]"
              >
                Como funciona
              </a>
            </div>
            <div className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500">
              Mas de 1,000 familias felices en Cuba
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-orange-200/60 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-2xl">
              <img
                src="/assets/img/fondo.webp"
                alt="Familia recibiendo una entrega"
                className="h-full max-h-[420px] w-full object-cover"
              />
              <div className="m-4 rounded-xl border border-emerald-200 bg-white p-3 text-sm shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">Ultima entrega</p>
                <p className="font-semibold text-slate-800">Entregado en La Habana hace 15 min</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#efd7cf] bg-[#f7efeb] py-4">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 text-xs font-semibold uppercase tracking-wide text-slate-600 md:grid-cols-4 md:px-8">
          <p>Tienda real</p>
          <p>Socios distribuidos</p>
          <p>Pago encriptado</p>
          <p>Soporte 24/7</p>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black md:text-4xl">Como funciona YaVoy</h2>
          <p className="mt-3 text-slate-600">
            Enviamos tus compras de forma eficiente siguiendo un proceso simple y transparente.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">1</div>
            <h3 className="text-lg font-bold">Elige productos o paquetes</h3>
            <p className="mt-2 text-sm text-slate-600">
              Explora la seleccion disponible y agrega lo necesario al carrito.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">2</div>
            <h3 className="text-lg font-bold">Realiza tu pedido online</h3>
            <p className="mt-2 text-sm text-slate-600">Paga de forma segura desde cualquier lugar del mundo.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">3</div>
            <h3 className="text-lg font-bold">Coordinamos la entrega</h3>
            <p className="mt-2 text-sm text-slate-600">
              Nuestros socios locales entregan en puerta a la familia beneficiaria.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="mb-8 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-black">Categorias destacadas</h2>
              <p className="mt-2 text-slate-600">Los productos mas solicitados para envio inmediato.</p>
            </div>
            <Link className="text-sm font-bold text-[#f06233] hover:underline" to="/restaurantes">
              Ver todo
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.href}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`absolute inset-0 opacity-90 bg-gradient-to-br ${category.gradient}`} />
                <div className="relative flex h-full min-h-[170px] flex-col justify-between text-white">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h3 className="text-xl font-black">{category.name}</h3>
                    <p className="mt-1 text-sm text-white/90">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
        <div className="rounded-3xl bg-[#f06233] p-8 text-white md:p-12">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-4xl font-black leading-tight">Listo para hacer sonreir a tu familia?</h2>
              <p className="mt-3 max-w-2xl text-white/90">
                Unete a los miles de cubanos en el exterior que confian en nosotros para sus envios mensuales.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/restaurantes" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#f06233]">
                  Empezar a comprar
                </Link>
                <Link to="/servicios" className="rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white">
                  Ver envios
                </Link>
              </div>
            </div>
            <div className="hidden h-24 w-24 items-center justify-center rounded-full border border-white/40 bg-white/15 text-3xl md:flex">
              ❤
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainLandingRedesign;
