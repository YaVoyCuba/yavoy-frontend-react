import React, { useEffect } from "react";
import { Trans } from "@lingui/react/macro";
import { t } from "@lingui/core/macro";

const AboutCompanyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="-mx-3 bg-[#f7f5f6] text-slate-900 lg:-mx-14">
      <section className="stitch-reveal mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
        <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-slate-900 shadow-2xl md:min-h-[430px]">
          <img src="/assets/img/fondo.webp" alt={t`YaVoy Cuba`} className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/55 to-transparent" />
          <div className="relative flex h-full max-w-3xl flex-col justify-end p-7 md:p-14">
            <span className="mb-4 inline-block rounded bg-[#f06233] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
              <Trans>Our commitment</Trans>
            </span>
            <h1 className="text-4xl font-black leading-[1.02] text-white md:text-6xl">
              <Trans>Connecting families across borders</Trans>
            </h1>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-200 md:text-xl">
              <Trans>We shorten the distance between you and your loved ones in Cuba through secure, reliable, and fast delivery of essential products.</Trans>
            </p>
          </div>
        </div>
      </section>

      <section className="stitch-reveal mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-8" style={{ animationDelay: "90ms" }}>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#f06233]"><Trans>Our mission</Trans></p>
          <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">
            <Trans>Delivery goes beyond packages; it is about caring.</Trans>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            <Trans>YaVoy Cuba was born from a deep understanding of the challenges families face when supporting relatives on the island. Our mission is to provide a transparent and fully secure bridge for groceries, medicines, and personal care items.</Trans>
          </p>
          <div className="mt-7 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="material-symbols-outlined !text-base text-[#f06233]">security</span>
              <Trans>Safe handling</Trans>
            </p>
            <p className="mt-1 text-sm text-slate-600">
              <Trans>Every item is tracked and handled with maximum care from dispatch to final delivery.</Trans>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-64 overflow-hidden rounded-xl shadow-lg">
            <img src="/assets/img/fondo.webp" alt={t`Logistics center`} className="h-full w-full object-cover" />
          </div>
          <div className="h-64 translate-y-8 overflow-hidden rounded-xl shadow-lg">
            <img src="/assets/img/product_by_libras.jpg" alt={t`Package preparation`} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="stitch-reveal bg-[#f4ebea] py-16" style={{ animationDelay: "160ms" }}>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="flex items-center justify-center gap-2 text-4xl font-black">
              <span className="material-symbols-outlined text-[#f06233]">history</span>
              <Trans>Our story</Trans>
            </h2>
            <p className="mt-3 text-slate-600">
              <Trans>What started as a small logistics project in Miami has become a trusted community pillar for the Cuban diaspora.</Trans>
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-4xl font-black text-[#f06233]">2018</p>
              <p className="mt-3 text-lg font-bold"><Trans>The beginning</Trans></p>
              <p className="mt-2 text-sm text-slate-600"><Trans>Founded by a group of engineers and logistics experts to simplify deliveries to Havana.</Trans></p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-4xl font-black text-[#f06233]">2021</p>
              <p className="mt-3 text-lg font-bold"><Trans>Expanding our reach</Trans></p>
              <p className="mt-2 text-sm text-slate-600"><Trans>We expanded operations to cover every province in Cuba, leaving no family behind.</Trans></p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-4xl font-black text-[#f06233]"><Trans>Today</Trans></p>
              <p className="mt-3 text-lg font-bold"><Trans>The digital bridge</Trans></p>
              <p className="mt-2 text-sm text-slate-600"><Trans>An integrated platform that connects real inventory with reliable local delivery teams.</Trans></p>
            </article>
          </div>
        </div>
      </section>

      <section className="stitch-reveal mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-8" style={{ animationDelay: "220ms" }}>
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="flex items-center justify-between bg-[#f06233] px-5 py-3 text-sm font-bold text-white">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined !text-base">verified</span>
              <Trans>Verified retailer status</Trans>
            </span>
            <span>OK</span>
          </div>
          <div className="p-5">
            <img src="/assets/img/fondo.webp" alt={t`Physical inventory`} className="h-64 w-full rounded-lg object-cover" />
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <span className="material-symbols-outlined !text-base text-green-600">storefront</span>
                <Trans>Physical store operations</Trans>
              </p>
              <p className="mt-1 text-xs text-slate-600"><Trans>We are not just an app; we manage real inventory.</Trans></p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#f06233]"><Trans>Transparency and security</Trans></p>
          <h2 className="mt-2 text-4xl font-black"><Trans>Why trust YaVoy Cuba?</Trans></h2>
          <div className="mt-6 space-y-6">
            <article>
              <p className="flex items-center gap-2 text-xl font-bold">
                <span className="material-symbols-outlined text-[#f06233]">handshake</span>
                <Trans>Local partners</Trans>
              </p>
              <p className="mt-1 text-slate-600"><Trans>We work directly with verified local delivery agents who understand every neighborhood.</Trans></p>
            </article>
            <article>
              <p className="flex items-center gap-2 text-xl font-bold">
                <span className="material-symbols-outlined text-[#f06233]">inventory_2</span>
                <Trans>Real-time inventory</Trans>
              </p>
              <p className="mt-1 text-slate-600"><Trans>Unlike third-party resellers, we keep physical stock for real delivery.</Trans></p>
            </article>
            <article>
              <p className="flex items-center gap-2 text-xl font-bold">
                <span className="material-symbols-outlined text-[#f06233]">map</span>
                <Trans>Presence across the island</Trans>
              </p>
              <p className="mt-1 text-slate-600"><Trans>From Pinar del Rio to Guantanamo, our network covers the whole country with reliable timelines.</Trans></p>
            </article>
          </div>
        </div>
      </section>

      <section className="stitch-reveal mx-auto w-full max-w-7xl px-4 pb-20 md:px-8" style={{ animationDelay: "280ms" }}>
        <div className="rounded-2xl bg-[#f06233] px-6 py-12 text-center text-white shadow-xl md:px-14 md:py-14">
          <h2 className="text-4xl font-black leading-tight md:text-5xl"><Trans>Ready to send a little love home?</Trans></h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            <Trans>Join thousands of families who trust YaVoy Cuba for their essential monthly deliveries.</Trans>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#f06233]">
              <Trans>Start order now</Trans>
            </a>
            <a href="/restaurantes" className="rounded-xl border border-white px-6 py-3 text-sm font-bold text-white">
              <Trans>View products</Trans>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutCompanyPage;
