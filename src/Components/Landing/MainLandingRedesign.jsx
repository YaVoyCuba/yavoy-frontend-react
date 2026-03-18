import React from "react";
import { Link } from "react-router-dom";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";

const categories = [
  {
    id: "restaurantes",
    name: "Restaurantes",
    description: "Comidas listas, combos y ofertas para la familia.",
    href: "/restaurantes",
    image: "/assets/img/stitch-main/cat-restaurants.png",
  },
  {
    id: "mercados",
    name: "Mercados",
    description: "Productos frescos y de primera necesidad.",
    href: "/mercados",
    image: "/assets/img/stitch-main/cat-mercados.webp",
  },
  {
    id: "dulcerias",
    name: "Dulcerias",
    description: "Postres y combos dulces para sorprender en casa.",
    href: "/dulcerias",
    image: "/assets/img/stitch-main/cat-dulcerias.webp",
  },
  {
    id: "regalitos",
    name: "Regalitos",
    description: "Detalles y paquetes para fechas especiales.",
    href: "/regalitos",
    image: "/assets/img/stitch-main/cat-regalitos.webp",
  },
];

const heroImage = "/assets/img/stitch-main/hero-family.webp";

const avatarOne = "/assets/img/stitch-main/avatar-1.webp";

const avatarTwo = "/assets/img/stitch-main/avatar-2.webp";

const MainLandingRedesign = () => {
  const { _ } = useLingui();

  const categoriesI18n = categories.map((category) => {
    const labels = {
      dulcerias: {
        name: _(msg`Sweets`),
        description: _(msg`Sweet desserts and combos to surprise your family.`),
      },
      mercados: {
        name: _(msg`Markets`),
        description: _(msg`Fresh products and essentials.`),
      },
      regalitos: {
        name: _(msg`Gifts`),
        description: _(msg`Details and bundles for special occasions.`),
      },
      restaurantes: {
        name: _(msg`Restaurants`),
        description: _(msg`Restaurants`),
      },
    };

    return {
      ...category,
      name: labels[category.id].name,
      description: labels[category.id].description,
    };
  });

  return (
    <div className="-mx-3 lg:-mx-14 bg-[#f6f6f7] text-slate-900">
      <section className="stitch-reveal relative overflow-hidden border-b border-[#f0d7cf] bg-[#f7f3f1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(242,98,51,0.16),_transparent_42%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 md:px-8 lg:grid-cols-2 lg:items-center lg:py-16">
          <div>
            <div className="mb-5 inline-flex items-center rounded-full bg-[#f8ded5] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#f06233]">
              <Trans>100% guaranteed delivery</Trans>
            </div>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-slate-900 md:text-6xl">
              <Trans>Send products and packages to your</Trans>
              <span className="text-[#f06233]"> <Trans>family</Trans></span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              <Trans>Shop online safely and we coordinate delivery directly to their door with certified local partners.</Trans>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/restaurantes"
                className="rounded-xl bg-[#f06233] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-300 transition hover:-translate-y-0.5 hover:bg-[#df592d]"
              >
                <Trans>View products</Trans>
              </Link>
              <a
                href="#how-it-works"
                className="rounded-xl border border-[#f5b39b] bg-white px-7 py-3 text-sm font-bold text-[#f06233] transition hover:bg-[#fff6f2]"
              >
                <Trans>How it works</Trans>
              </a>
            </div>
            <div className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-slate-200">
                    <img src={avatarOne} alt={_(msg`Happy customer`)} className="h-full w-full object-cover" />
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-slate-200">
                    <img src={avatarTwo} alt={_(msg`Happy customer`)} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#f06233] text-xs font-bold text-white">
                    +1k
                  </div>
                </div>
                <p><Trans>More than 1,000 happy families in Cuba</Trans></p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-orange-200/60 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-2xl">
              <img
                src={heroImage}
                alt={_(msg`Family receiving a delivery`)}
                className="h-full max-h-[420px] w-full object-cover"
              />
              <div className="m-4 rounded-xl border border-emerald-200 bg-white p-3 text-sm shadow-sm">
                {/* Future changes */}
                {/* TODO: Add latest delivery information */}
                <div className="flex items-center gap-3 hidden">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-white">
                    <span className="material-symbols-outlined !text-xl">package_2</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-600"><Trans>Latest delivery</Trans></p>
                    <p className="font-semibold text-slate-800"><Trans>Delivered in Havana 15 min ago</Trans></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stitch-reveal border-b border-[#efd7cf] bg-[#f7efeb] py-4" style={{ animationDelay: "90ms" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 text-xs font-semibold uppercase tracking-wide text-slate-600 md:grid-cols-4 md:px-8">
          <p className="flex items-center gap-2"><span className="material-symbols-outlined !text-base">verified_user</span><Trans>Real store</Trans></p>
          <p className="flex items-center gap-2"><span className="material-symbols-outlined !text-base">partner_exchange</span><Trans>Distributed partners</Trans></p>
          <p className="flex items-center gap-2"><span className="material-symbols-outlined !text-base">security</span><Trans>Encrypted payment</Trans></p>
          <p className="flex items-center gap-2"><span className="material-symbols-outlined !text-base">support_agent</span><Trans>24/7 support</Trans></p>
        </div>
      </section>

      <section id="how-it-works" className="stitch-reveal mx-auto w-full max-w-7xl px-4 py-16 md:px-8" style={{ animationDelay: "160ms" }}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black md:text-4xl"><Trans>How YaVoy works</Trans></h2>
          <p className="mt-3 text-slate-600">
            <Trans>We deliver your purchases efficiently through a simple and transparent process.</Trans>
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[#f06233]">
              <span className="material-symbols-outlined !text-2xl">ads_click</span>
            </div>
            <h3 className="text-lg font-bold"><Trans>Choose products or bundles</Trans></h3>
            <p className="mt-2 text-sm text-slate-600">
              <Trans>Browse the available selection and add what you need to cart.</Trans>
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[#f06233]">
              <span className="material-symbols-outlined !text-2xl">credit_card</span>
            </div>
            <h3 className="text-lg font-bold"><Trans>Place your order online</Trans></h3>
            <p className="mt-2 text-sm text-slate-600"><Trans>Pay securely from anywhere in the world.</Trans></p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[#f06233]">
              <span className="material-symbols-outlined !text-2xl">handshake</span>
            </div>
            <h3 className="text-lg font-bold"><Trans>We coordinate delivery</Trans></h3>
            <p className="mt-2 text-sm text-slate-600">
              <Trans>Our local partners deliver to your family at their doorstep.</Trans>
            </p>
          </article>
        </div>
      </section>

      <section className="stitch-reveal bg-white py-16" style={{ animationDelay: "230ms" }}>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="mb-8 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-black"><Trans>Featured categories</Trans></h2>
              <p className="mt-2 text-slate-600"><Trans>Most requested products for immediate delivery.</Trans></p>
            </div>
            <Link className="text-sm font-bold text-[#f06233] hover:underline" to="/restaurantes">
              <Trans>View all</Trans>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoriesI18n.map((category) => (
              <Link
                key={category.id}
                to={category.href}
                className="group relative h-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={category.image}
                  alt={category.description}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-2xl font-black">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="stitch-reveal mx-auto w-full max-w-7xl px-4 py-16 md:px-8" style={{ animationDelay: "300ms" }}>
        <div className="rounded-3xl bg-[#f06233] p-8 text-white md:p-12">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-4xl font-black leading-tight"><Trans>Ready to make your family smile?</Trans></h2>
              <p className="mt-3 max-w-2xl text-white/90">
                <Trans>Join thousands of Cubans abroad who trust us for their monthly deliveries.</Trans>
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/restaurantes" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#f06233]">
                  <Trans>Start shopping</Trans>
                </Link>
                <Link to="/servicios" className="rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white">
                  <Trans>View shipments</Trans>
                </Link>
              </div>
            </div>
            <div className="hidden h-24 w-24 items-center justify-center rounded-full border border-white/40 bg-white/15 md:flex">
              <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20.25l-1.45-1.32C5.4 14.28 2 11.2 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.7-3.4 6.78-8.55 11.43L12 20.25z" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainLandingRedesign;
