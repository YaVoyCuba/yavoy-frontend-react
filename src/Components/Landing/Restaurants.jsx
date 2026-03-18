import React, { useEffect, useMemo, useState } from "react";
import { Trans } from "@lingui/react/macro";
import apiManager from "../../api/apiManager";
import { Loading } from "../../common/Loading";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import SwiperCore, { Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import MainLandingRedesign from "./MainLandingRedesign";

SwiperCore.use([Autoplay]);

const CATEGORY_CARDS = [
  {
    key: "restaurants",
    href: "/restaurantes",
    label: "Restaurants",
    icon: "restaurant",
    image: "/assets/img/stitch-main/cat-restaurants.png",
    description: "Fresh meals from trusted local partners.",
  },
  {
    key: "markets",
    href: "/mercados",
    label: "Markets",
    icon: "storefront",
    image: "/assets/img/stitch-main/cat-mercados.webp",
    description: "Essentials delivered to your family.",
  },
  {
    key: "sweets",
    href: "/dulcerias",
    label: "Sweets",
    icon: "cake",
    image: "/assets/img/stitch-main/cat-dulcerias.webp",
    description: "Desserts and sweet combos for special moments.",
  },
  {
    key: "gifts",
    href: "/regalitos",
    label: "Gifts",
    icon: "redeem",
    image: "/assets/img/stitch-main/cat-regalitos.webp",
    description: "Curated details for celebrations and surprises.",
  },
  {
    key: "shipping",
    href: "/servicios",
    label: "Shipping",
    icon: "local_shipping",
    image: "/assets/img/product_by_libras.jpg",
    description: "Air and sea cargo options across Cuba.",
  },
];

const STORE_ICONS = ["restaurant", "local_cafe", "storefront", "shopping_bag", "lunch_dining"];

const StoreCard = ({ restaurant, imageBase }) => {
  const rating = Number(restaurant?.valoration) || 0;
  const productsCount = Number(restaurant?.products_count) || 0;
  const image = restaurant?.avatar ? `${imageBase}${restaurant.avatar}` : "/assets/img/fondo.webp";
  const icon = STORE_ICONS[(Number(restaurant?.id) || 0) % STORE_ICONS.length];

  return (
    <Link
      to={`/restaurante/${restaurant.slug}`}
      className="group block rounded-3xl bg-[#f7f7f8] p-4 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl"
      aria-label={restaurant?.name || "Store"}
    >
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-slate-100">
        <img
          src={image}
          alt={restaurant?.name || "Store"}
          className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {rating > 0 && (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-xs font-black text-slate-900 shadow-sm">
            <span className="material-symbols-outlined !text-sm text-[#f06233]">star</span>
            <span>{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-900">{restaurant?.name}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {productsCount} <Trans>products available</Trans>
          </p>
        </div>
        <span className="inline-flex rounded-lg bg-[#ffede8] p-2 text-[#f06233]">
          <span className="material-symbols-outlined !text-base">{icon}</span>
        </span>
      </div>
    </Link>
  );
};

const Restaurants = () => {
  const locationRouter = useLocation();
  const path = locationRouter.pathname;
  const isMainPage = path === "/";

  const [restaurants, setRestaurants] = useState([]);
  const [promoRestaurants, setPromoRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMunicipality = useSelector((state) => state.location.municipality);

  const imageBase = apiManager.UrlBase;

  const isServicesPage = path === "/servicios";

  const promoSlides = useMemo(() => {
    return promoRestaurants
      ?.map((photo) => {
        const image = photo?.image || photo?.image_movil;
        if (!image) {
          return null;
        }

        return {
          id: photo.id,
          image: `${imageBase}${image}`,
          link: photo.link,
        };
      })
      .filter(Boolean);
  }, [promoRestaurants, imageBase]);

  const featuredRestaurants = useMemo(() => {
    return [...restaurants]
      .sort((a, b) => (Number(b?.valoration) || 0) - (Number(a?.valoration) || 0))
      .slice(0, 4);
  }, [restaurants]);

  const featuredIds = useMemo(() => new Set(featuredRestaurants.map((item) => item.id)), [featuredRestaurants]);

  const regularRestaurants = useMemo(() => {
    return restaurants.filter((item) => !featuredIds.has(item.id));
  }, [restaurants, featuredIds]);

  const isCategoryActive = (href) => {
    if (href === "/restaurantes") {
      return path === "/restaurantes";
    }

    return path === href;
  };

  async function getRestaurants() {
    const municipalityId = getMunicipality?.value?.id;
    const locationFinal = municipalityId === 0 ? 0 : municipalityId;

    let type = "restaurant";

    if (path === "/dulcerias") {
      type = "dulceria";
    }

    if (path === "/mercados") {
      type = "market";
    }
    if (path === "/servicios") {
      type = "servicios";
    }

    if (path === "/regalitos") {
      type = "regalos";
    }

    try {
      const json = await apiManager.getRestaurants(locationFinal, type);
      if (json !== 500) {
        setRestaurants(json?.restaurants || []);
      } else {
        setRestaurants([]);
      }

      const json2 = await apiManager.getPromosRestaurants();
      if (json2 !== 500) {
        setPromoRestaurants(json2?.promos || []);
      } else {
        setPromoRestaurants([]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isMainPage) {
      setLoading(false);
      return;
    }

    setLoading(true);
    if (getMunicipality?.value) {
      getRestaurants();
    }
  }, [getMunicipality, path, isMainPage]);

  if (isMainPage) {
    return <MainLandingRedesign />;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="-mx-3 bg-[#f2f0f1] pb-16 lg:-mx-14">
          <section className="mx-auto w-full max-w-7xl px-4 pt-6 lg:px-8 lg:pt-8">
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
              <Swiper
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                spaceBetween={0}
                slidesPerView={1}
              >
                {(promoSlides.length > 0 ? promoSlides : [{ id: "fallback", image: "/assets/img/fondo.webp", link: "/restaurantes" }]).map(
                  (slide) => (
                    <SwiperSlide key={`hero-${slide.id}`}>
                      <div className="relative min-h-[320px] md:min-h-[400px]">
                        <img src={slide.image} alt="Promo" className="absolute inset-0 h-full w-full object-cover opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/70 to-transparent" />
                        <div className="relative z-10 flex h-full items-center p-7 md:p-10 lg:p-12">
                          <div className="max-w-2xl">
                            <p className="inline-flex rounded-full bg-[#f06233]/20 px-4 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#ff9f80]">
                              <Trans>Exclusive offer</Trans>
                            </p>
                            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-tight text-white md:text-6xl">
                              <Trans>Discover top stores</Trans>
                              <br />
                              <span className="text-[#f06233]"><Trans>near your family</Trans></span>
                            </h1>
                            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-200 md:text-lg">
                              <Trans>Browse restaurants, markets, sweets, gifts, and shipping services from trusted local partners.</Trans>
                            </p>
                            <div className="mt-7 flex flex-wrap gap-3">
                              <Link
                                to="/restaurantes"
                                className="rounded-xl bg-[#f06233] px-7 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-orange-400/30 transition hover:scale-[1.02]"
                              >
                                <Trans>Order now</Trans>
                              </Link>
                              <a
                                href={slide.link || "#"}
                                className="rounded-xl border-2 border-white/30 bg-white/10 px-7 py-3 text-sm font-black uppercase tracking-wide text-white backdrop-blur-sm transition hover:bg-white/20"
                              >
                                <Trans>View offer</Trans>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>

              <div className="absolute bottom-6 right-6 z-20 hidden rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur-md lg:block">
                <div className="flex items-center gap-2 text-slate-900">
                  <span className="material-symbols-outlined text-[#f06233]">local_shipping</span>
                  <p className="text-xs font-black uppercase tracking-wide"><Trans>Fast delivery</Trans></p>
                </div>
                <p className="mt-2 max-w-[210px] text-xs font-medium leading-relaxed text-slate-600">
                  <Trans>Partner stores deliver quickly with real-time stock availability.</Trans>
                </p>
              </div>
            </div>
          </section>

          <section className="mx-auto mt-12 w-full max-w-7xl px-4 lg:px-8">
            <div className="mb-8">
              <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900"><Trans>Explore categories</Trans></h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                <Trans>The best of Cuba delivered to your family.</Trans>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {CATEGORY_CARDS.map((category) => (
                <Link
                  key={category.key}
                  to={category.href}
                  className={`group relative overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-xl ${
                    isCategoryActive(category.href) ? "ring-2 ring-[#f06233]/60" : "ring-1 ring-slate-200"
                  }`}
                >
                  <img
                    src={category.image}
                    alt={category.label}
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110 lg:h-44"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/25 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-lg font-black uppercase tracking-tight text-white">
                      <Trans>{category.label}</Trans>
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-white/90">
                      <span className="material-symbols-outlined !text-base">{category.icon}</span>
                      <p className="line-clamp-1 text-[11px] font-semibold uppercase tracking-wide">
                        <Trans>{category.description}</Trans>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {isServicesPage ? (
              <div className="grid mb-10 grid-cols-1">
                <div className="bg-white">
                  <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="bg-color rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-1 lg:gap-4">
                      <div className="bg-color rounded-lg lg:grid lg:grid-cols-2 lg:gap-4">
                        <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                          <img className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-12 lg:translate-y-16"  src="/assets/img/product_by_libras.jpg" style={{ height:'90%' }} alt={""}/>
                        </div>
                        <div className="pt-10 pb-2 px-4 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                          <div className="lg:self-center">
                            <h2 className="text-3xl font-extrabold sm:text-4xl">
                              <span className="block">Ya Voy Envíos</span>
                              <span className="text-lg font-bold text-gray-700 mt-3"><Trans>We offer Air and Sea Shipments</Trans></span>
                            </h2>
                            <br />

                            <div className="mt-7">
                              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    <Trans>Prices per pound</Trans>
                                  </h3>
                                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    <Trans>Price details.</Trans>
                                  </p>
                                </div>
                                <div>
                                  <section className="px-2 py-2 sm:pt-2 sm:px-6 lg:py-6 lg:pr-6 xl:py-6 xl:px-6">
                                    <h3 style={{fontSize: 'larger', fontWeight: '300'}}><Trans>Air Shipments</Trans></h3>
                                    <h6 style={{fontSize: 'small', fontWeight: '300'}}><Trans>Minimum 15lb</Trans></h6>
                                    <article>De 15 a 44lb <p
                                        className="px-1 inline-flex  rounded bg-green-100 text-green-800 font-semibold">
                                      3.99 </p>
                                      dólares por libra
                                    </article>
                                    <article>De 44 a 100lb <p
                                        className="px-1 inline-flex rounded bg-green-100 text-green-800 font-semibold">
                                      3.75 </p> dólares por libra
                                    </article>
                                    <article>Más de 100lb <p className="px-1 inline-flex rounded bg-orange-100 font-semibold">
                                      3.65 </p> dólares por libra
                                    </article>
                                  </section>
                                  <section className="px-2 py-2 sm:pt-2 sm:px-6 lg:py-6 lg:pr-6 xl:py-6 xl:px-6">
                                    <h3 style={{fontSize: 'larger', fontWeight: '300'}}><Trans>Sea Shipments</Trans></h3>
                                    <h6 style={{fontSize: 'small', fontWeight: '300'}}><Trans>Minimum 22lb</Trans></h6>
                                    <article>De 22 a 100lb <p
                                        className="px-1 inline-flex  rounded bg-green-100 text-green-800 font-semibold">
                                      2.60 </p>
                                      dólares por libra
                                    </article>
                                    <article>Más de 100lb <p className="px-1 inline-flex rounded bg-orange-100 font-semibold">
                                      2.50 </p> dólares por libra
                                    </article>
                                  </section>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 pb-12 px-4 sm:pt-2 sm:px-2 lg:py-2 lg:pr-0 xl:py-2 xl:px-2">
                        <p className="mt-4 text-lg leading-6">
                            Tenemos envios Aéreos y Marítimos
                        </p>
                        <p className="mt-4 text-lg leading-6">
                            El Envío Aéreo vuela 2 veces por semana y a partir del día de vuelo la entrega demora 10 días hábiles a "Toda Cuba"
                        </p>
                        <p className="mt-4 text-lg leading-6">
                            El mínimo a mandar son 15 libras y el costo es 3.99 x lb, si se pasa de 44lb es a 3.75 y si pasa de 100lb es a 3.65. Estos precios son para toda Cuba y en el está incluido el delivery hasta la puerta de la casa y su familiar no paga nada.
                        </p>
                        <p className="mt-4 text-lg leading-6">
                            En el Envío Marítimo el mínimo son 22 lb y la libra es a 2.60, si pasa de 100lb es a 2.50. El Barco sale los sábados y demora la entrega de 25 a 30 días.
                        </p>
                          <p className="mt-4 text-lg leading-6">
                              Nuestra agencia es de carga aérea no acompañada, a diferencia de las agencias con mulas con nosotros se pueden mandar Teléfonos Celulares, Electrodomésticos, Auto-Partes, Muebles, Ferretería, etc.
                          </p>
                          <p className="mt-4 text-lg leading-6">
                              Estamos en 9500 NW 77th Ave, Suite 23, Hialeah Gardens, Miami FL 33016
                          </p>
                          <p className="mt-4 text-lg leading-6">
                              Abrimos de lunes a viernes de 10am a 6pm y los viernes y sábados hacemos recogidas de paquetes en las casas sin costo alguno, con cita previa y dentro de Miami
                          </p>
                          <p className="mt-4 text-lg leading-6">
                              Clientes que viven en otros estados, nos hacen llegar sus paquetes por correo regular y tambien cuando hacen compras online (Amazon, Ebay, Shein, etc) ponen nuestra dirección de entrega y su nombre y nosotros se lo enviamos a Cuba
                          </p>
                          <p className="mt-4 text-lg leading-6">
                              Si decide enviar algún paquete, esta es la dirección 👇
                          </p>
                          <p className="mt-4 text-lg leading-6">
                              Dirección de entrega y recepción de paquetes
                          </p>
                          <p className="mt-4 text-lg leading-6">
                              223 Antilla Ave. Apto 11. Coral Gables. Miami FL 33134
                          </p>
                          <p className="mt-4 text-lg leading-6">
                              Debe de poner su nombre en el paquete para saber que es suyo
                          </p>
                          <p className="mt-4 text-lg leading-6">
                          <a className="mt-4 text-lg leading-6" href="tel:+17868491159">Si lo desea puede llamarnos al +1 (305) 645 7572 y le atenderemos con gusto.</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ) : (
            <>
              <section className="mx-auto mt-14 w-full max-w-7xl px-4 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900"><Trans>Featured stores</Trans></h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500"><Trans>Top rated stores selected for this week.</Trans></p>
                  </div>
                  <div className="hidden items-center gap-2 md:flex">
                    <button
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-400 transition hover:border-[#f06233] hover:text-[#f06233]"
                      aria-label="Previous featured stores"
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-400 transition hover:border-[#f06233] hover:text-[#f06233]"
                      aria-label="Next featured stores"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>

                {featuredRestaurants.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {featuredRestaurants.map((restaurant) => (
                      <StoreCard key={`featured-${restaurant.id}`} restaurant={restaurant} imageBase={imageBase} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl bg-white p-6 text-slate-700 shadow-sm">
                    <p className="text-lg font-semibold">
                      <Trans>No services available in this area</Trans>
                    </p>
                  </div>
                )}
              </section>

              <section className="mx-auto mt-16 w-full max-w-7xl px-4 lg:px-8">
                <div className="mb-8">
                  <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900"><Trans>All stores</Trans></h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500"><Trans>Explore the full catalog of local partners.</Trans></p>
                </div>

                {restaurants.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                      {(regularRestaurants.length > 0 ? regularRestaurants : restaurants).map((restaurant) => (
                        <StoreCard key={`store-${restaurant.id}`} restaurant={restaurant} imageBase={imageBase} />
                      ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                      <button
                        type="button"
                        className="rounded-full border-2 border-slate-400 px-7 py-3 text-sm font-black text-slate-800 transition hover:border-[#f06233] hover:text-[#f06233]"
                      >
                        <Trans>View all stores</Trans>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="rounded-2xl bg-white p-6 text-slate-700 shadow-sm">
                    <p className="text-lg font-semibold">
                      <Trans>No services available in this area</Trans>
                    </p>
                  </div>
                )}
              </section>
            </>
          )}

        </div>
      )}
    </>
  );
};

export default Restaurants;
