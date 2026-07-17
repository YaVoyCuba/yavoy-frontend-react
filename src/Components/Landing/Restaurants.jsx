import React, { useEffect, useMemo, useState, useRef } from "react";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
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
    href: "/restaurants",
    icon: "restaurant",
    image: "/assets/img/stitch-main/cat-restaurants.png",
    label: msg`Restaurants`,
  },
  {
    key: "markets",
    href: "/markets",
    icon: "storefront",
    image: "/assets/img/stitch-main/cat-mercados.webp",
    label: msg`Markets`,
  },
  {
    key: "sweets",
    href: "/sweets",
    icon: "cake",
    image: "/assets/img/stitch-main/cat-dulcerias.webp",
    label: msg`Sweets`,
  },
  {
    key: "gifts",
    href: "/gifts",
    icon: "redeem",
    image: "/assets/img/stitch-main/cat-regalitos.webp",
    label: msg`Gifts`,
  },
  // {
  //   key: "shipping",
  //   href: "/services",
  //   icon: "local_shipping",
  //   image: "/assets/img/product_by_libras.jpg",
  // },
];

const STORE_ICONS = ["restaurant", "local_cafe", "storefront", "shopping_bag", "lunch_dining"];

const StoreCard = ({ restaurant, imageBase }) => {
  const rating = Number(restaurant?.valoration) || 0;
  const productsCount = Number(restaurant?.products_count) || 0;
  const image = restaurant?.avatar ? `${imageBase}${restaurant.avatar}` : "/assets/img/fondo.webp";
  const icon = STORE_ICONS[(Number(restaurant?.id) || 0) % STORE_ICONS.length];

  return (
    <Link
      to={`/restaurant/${restaurant.slug}`}
      className="group block rounded-3xl bg-[#f7f7f8] p-3 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl sm:p-4"
      aria-label={restaurant?.name || "Store"}
    >
      <div className="flex gap-4 sm:block">
        <div className="relative mb-0 h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:mb-4 sm:h-40 sm:w-full">
          <img
            src={image}
            alt={restaurant?.name || "Store"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {rating > 0 && (
            <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-black text-slate-900 shadow-sm sm:right-3 sm:top-3 sm:text-xs">
              <span className="notranslate material-symbols-outlined !text-[10px] text-[#f06233] sm:!text-sm">star</span>
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center sm:block">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-black tracking-tight text-slate-900 sm:text-xl">{restaurant?.name}</h3>
              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
                {productsCount} <Trans>products available</Trans>
              </p>
            </div>
            <span className="hidden rounded-lg bg-[#ffede8] p-2 text-[#f06233] sm:inline-flex">
              <span className="notranslate material-symbols-outlined !text-base">{icon}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Restaurants = () => {
  const { i18n } = useLingui();
  const locationRouter = useLocation();
  const path = locationRouter.pathname;

  const enableMainLanding = import.meta.env.VITE_ENABLE_MAIN_LANDING === "true";
  const isMainPage = path === "/" && enableMainLanding;

  // Ref for the catalog section to scroll into view when category changes
  const catalogSectionRef = useRef(null);

  const [restaurants, setRestaurants] = useState([]);
  const [promoRestaurants, setPromoRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMunicipality = useSelector((state) => state.location.municipality);

  const imageBase = apiManager.UrlBase;

  // Scroll to the catalog section when the category changes and it's not the main page
  useEffect(() => {
      if (!isMainPage && catalogSectionRef.current) {
        catalogSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start", // Align the top of the section with the top of the viewport
        });
      }
    }, [path, isMainPage]);

  const categoryI18n = {
    restaurants: {
      label: i18n._(msg`Restaurants`),
      description: i18n._(msg`Fresh meals from trusted local partners.`),
    },
    markets: {
      label: i18n._(msg`Markets`),
      description: i18n._(msg`Essentials delivered to your family.`),
    },
    sweets: {
      label: i18n._(msg`Sweets`),
      description: i18n._(msg`Desserts and sweet combos for special moments.`),
    },
    gifts: {
      label: i18n._(msg`Gifts`),
      description: i18n._(msg`Curated details for celebrations and surprises.`),
    },
    shipping: {
      label: i18n._(msg`Shipping`),
      description: i18n._(msg`Air and sea cargo options.`),
    },
  };

  const isServicesPage = path === "/services";

  const currentCategoryCard = useMemo(() => {
    const activeCard = CATEGORY_CARDS.find((cat) => {
      if (cat.href === "/restaurants") return path === "/restaurants" || path === "/";
      return path === cat.href;
    });

    // Return category key or default to restaurants
    return activeCard ? activeCard.key : "restaurants";
  }, [path]);

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
    if (href === "/restaurants") {
      return path === "/restaurants" || path === "/";
    }

    return path === href;
  };

  async function getRestaurants() {
    const municipalityId = getMunicipality?.value?.id;
    const locationFinal = municipalityId === 0 ? 0 : municipalityId;

    // Rapid mapping of keys to API types
    const typeMapping = {
      restaurants: "restaurant",
      sweets: "dulceria",
      markets: "market",
      services: "servicios",
      gifts: "regalos"
    };

    let type = typeMapping[currentCategoryCard] || "restaurant";

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
        <div className="-mx-3 pb-16 lg:-mx-14">
          <section className="mx-auto mt-1 w-full max-w-7xl px-4 lg:px-8">
            {/* <div className="mb-8">
              <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900"><Trans>Explore categories</Trans></h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                <Trans>Discover products and services designed for your loved ones.</Trans>
              </p>
            </div> */}

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {CATEGORY_CARDS.map((category) => (
                <Link
                  key={category.key}
                  to={category.href}
                  className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl p-4 transition-all hover:shadow-lg ${
                    isCategoryActive(category.href)
                      ? "bg-[#f06233] text-white shadow-md ring-2 ring-[#f06233]/20"
                      : "bg-white text-slate-900 border border-slate-200 shadow-sm hover:border-[#f06233]/50"
                  }`}
                >
                  <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isCategoryActive(category.href) ? "bg-white/20 text-white" : "bg-[#ffede8] text-[#f06233]"
                  }`}>
                    <span className="notranslate material-symbols-outlined !text-2xl">{category.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-tight leading-none">{categoryI18n[category.key]?.label || category.key}</p>
                    <p className={`mt-1 line-clamp-1 text-[10px] font-bold uppercase tracking-wider opacity-60 ${
                      isCategoryActive(category.href) ? "text-white" : "text-slate-500"
                    }`}>
                      {categoryI18n[category.key]?.description || ""}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section ref={catalogSectionRef} className="mx-auto w-full max-w-7xl px-4 pt-6 lg:px-8 lg:pt-8">
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
              <Swiper
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                spaceBetween={0}
                slidesPerView={1}
                className="w-full h-full"
              >
                {(promoSlides.length > 0 ? promoSlides : [{ id: "fallback", image: "/assets/img/fondo.webp", link: "/restaurants" }]).map(
                  (slide) => (
                    <SwiperSlide key={`hero-${slide.id}`}>
                      <div className="relative flex h-auto aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-white">
                        
                        {/* 1. Imagen de fondo optimizada - Ahora con object-contain para no recortar */}
                        <img 
                          src={slide.image} 
                          alt="Promo" 
                          className="h-full w-full object-contain object-center transition-transform duration-700 ease-out select-none" 
                        />
                        
                        {/* 2. Oscurecimiento global opcional */}
                        <div className="absolute inset-0 bg-slate-900/5" />
                        
                        {/* 3. Gradiente direccional para la zona del texto */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent" />
                        
                        {/* 4. Contenido del Slide - Simplificado para evitar conflictos con texto de imágenes */}
                        {/* <div className="relative z-10 w-full p-8 md:p-12 lg:p-16">
                          <div className="max-w-xl">
                            <span className="rounded-full bg-[#f06233]/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#ff9f80] backdrop-blur-sm">
                              <Trans>Exclusive offer</Trans>
                            </span>
                            
                            <h1 className="mt-4 text-3xl font-black uppercase leading-[1.1] tracking-tight text-white drop-shadow-lg">
                              <Trans>Discover top stores</Trans>
                              <br />
                              <span className="text-[#f06233]"><Trans>for your loved ones</Trans></span>
                            </h1>
                          </div>
                        </div> */}

                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>

              {/* 5. Tarjeta Flotante "Fast delivery" (Se sube a z-20 y se añade hover sutil) */}
              <div className="absolute bottom-6 right-6 z-20 hidden rounded-2xl bg-white/95 p-5 shadow-2xl backdrop-blur-md border border-white/20 lg:block max-w-[260px] transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-2 text-slate-900">
                  <span className="notranslate material-symbols-outlined text-[#f06233] !text-2xl">local_shipping</span>
                  <p className="text-xs font-black uppercase tracking-wider"><Trans>Fast delivery</Trans></p>
                </div>
                <p className="mt-2.5 text-xs font-bold leading-relaxed text-slate-600">
                  <Trans>Partner stores deliver quickly with real-time stock availability.</Trans>
                </p>
              </div>
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

              <section className="mx-auto mt-16 w-full max-w-7xl px-4 lg:px-8">
                <div className="mb-8">
                  <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">
                    {categoryI18n[currentCategoryCard]?.label || <Trans>Explore categories</Trans>}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500"><Trans>Explore our complete catalog.</Trans></p>
                </div>

                {restaurants.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                      {(regularRestaurants.length > 0 ? regularRestaurants : restaurants).map((restaurant) => (
                        <StoreCard key={`store-${restaurant.id}`} restaurant={restaurant} imageBase={imageBase} />
                      ))}
                    </div>

                    {/* <div className="mt-10 flex justify-center">
                      <button
                        type="button"
                        className="rounded-full border-2 border-slate-400 px-7 py-3 text-sm font-black text-slate-800 transition hover:border-[#f06233] hover:text-[#f06233]"
                      >
                        <Trans>View all stores</Trans>
                      </button>
                    </div> */}
                  </>
                ) : (
                  <div className="rounded-2xl bg-white p-6 text-slate-700 shadow-sm">
                    <p className="text-lg font-semibold">
                      <Trans>No services available in this area</Trans>
                    </p>
                  </div>
                )}
              </section>

              <section className="mx-auto mt-14 w-full max-w-7xl px-4 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900"><Trans>Top rating</Trans></h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500"><Trans>Top rated stores selected for this week.</Trans></p>
                  </div>
                  <div className="hidden items-center gap-2 md:flex">
                    <button
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-400 transition hover:border-[#f06233] hover:text-[#f06233]"
                      aria-label="Previous featured stores"
                    >
                      <span className="notranslate material-symbols-outlined">chevron_left</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-400 transition hover:border-[#f06233] hover:text-[#f06233]"
                      aria-label="Next featured stores"
                    >
                      <span className="notranslate material-symbols-outlined">chevron_right</span>
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
            </>
          )}

        </div>
      )}
    </>
  );
};

export default Restaurants;
