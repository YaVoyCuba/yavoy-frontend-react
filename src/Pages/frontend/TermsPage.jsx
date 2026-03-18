import React, { useEffect } from "react";
import { Trans } from "@lingui/react/macro";
import { Link } from "react-router-dom";

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="-mx-3 bg-[#f2f0f1] py-12 text-slate-900 lg:-mx-14 md:py-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28 p-2">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f06233]">
              <Trans>Document content</Trans>
            </p>
            <nav className="mt-5 space-y-2 text-sm font-semibold text-slate-500" aria-label="Terms section navigation">
              <a className="block border-b-2 border-[#f06233] pb-1 text-[#f06233] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06233]/40" href="#introduction"><Trans>Introduction</Trans></a>
              <a className="block transition-colors hover:text-[#f06233] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06233]/40" href="#operation"><Trans>Platform operation</Trans></a>
              <a className="block transition-colors hover:text-[#f06233] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06233]/40" href="#logistics"><Trans>Logistics and timelines</Trans></a>
              <a className="block transition-colors hover:text-[#f06233] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06233]/40" href="#obligations"><Trans>User obligations</Trans></a>
              <a className="block transition-colors hover:text-[#f06233] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06233]/40" href="#security"><Trans>Security and cancellations</Trans></a>
            </nav>
          </div>
        </aside>

        <div className="lg:col-span-9">
          <nav className="mb-4 flex gap-2 overflow-x-auto pb-2 lg:hidden" aria-label="Terms section navigation mobile">
            <a className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#f06233] shadow-sm ring-1 ring-[#f06233]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06233]/40" href="#introduction"><Trans>Introduction</Trans></a>
            <a className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06233]/30" href="#operation"><Trans>Platform operation</Trans></a>
            <a className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06233]/30" href="#logistics"><Trans>Logistics and timelines</Trans></a>
            <a className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06233]/30" href="#obligations"><Trans>User obligations</Trans></a>
            <a className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06233]/30" href="#security"><Trans>Security and cancellations</Trans></a>
          </nav>

          <article className="rounded-3xl bg-white p-7 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100 md:p-10 lg:p-14">
            <header className="mb-12 border-b border-slate-100 pb-9">
              <p className="inline-flex rounded-full bg-[#ffede8] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#f06233]">
                <Trans>Official document v2024</Trans>
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-slate-900 md:text-[64px]">
                <Trans>Terms and conditions</Trans>
              </h1>
              <p className="mt-3 text-sm font-medium text-slate-500">
                <Trans>Last updated: May 24, 2024</Trans>
              </p>
            </header>

            <section id="introduction" className="scroll-mt-28 mb-10 space-y-4">
              <h2 className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-900">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-black text-white">01</span>
                <Trans>Introduction</Trans>
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                <Trans>Welcome to YaVoy. These terms govern the use of our platform and related services. By accessing or using our site, you agree to be fully bound by these legal conditions.</Trans>
              </p>
            </section>

            <section id="operation" className="scroll-mt-28 mb-10 space-y-4">
              <h2 className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-900">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-black text-white">02</span>
                <Trans>Platform operation</Trans>
              </h2>
              <div className="rounded-xl border-l-4 border-[#f06233] bg-slate-50 p-5">
                <p className="italic leading-relaxed text-slate-700">
                  <Trans>YaVoy operates as an e-commerce platform that coordinates deliveries with local partners. By using this site, you agree to comply with our published purchase, payment, and delivery policies.</Trans>
                </p>
              </div>
            </section>

            <section id="logistics" className="scroll-mt-28 mb-10 space-y-6">
              <h2 className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-900">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-black text-white">03</span>
                <Trans>Logistics and timelines</Trans>
              </h2>
              <p className="leading-relaxed text-slate-600">
                <Trans>We understand the importance of fast deliveries. However, timelines can be affected by external variables:</Trans>
              </p>
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <li className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 shadow-sm">
                  <span className="material-symbols-outlined text-[#f06233]" aria-hidden="true">schedule</span>
                  <span className="text-sm font-semibold text-slate-700"><Trans>Estimated delivery windows are subject to change.</Trans></span>
                </li>
                <li className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 shadow-sm">
                  <span className="material-symbols-outlined text-[#f06233]" aria-hidden="true">cloud</span>
                  <span className="text-sm font-semibold text-slate-700"><Trans>Variations due to weather conditions.</Trans></span>
                </li>
                <li className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 shadow-sm">
                  <span className="material-symbols-outlined text-[#f06233]" aria-hidden="true">inventory</span>
                  <span className="text-sm font-semibold text-slate-700"><Trans>Real-time stock availability.</Trans></span>
                </li>
                <li className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 shadow-sm">
                  <span className="material-symbols-outlined text-[#f06233]" aria-hidden="true">local_shipping</span>
                  <span className="text-sm font-semibold text-slate-700"><Trans>Logistics factors related to third-party carriers.</Trans></span>
                </li>
              </ul>
            </section>

            <section id="obligations" className="scroll-mt-28 mb-10 space-y-4">
              <h2 className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-900">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-black text-white">04</span>
                <Trans>User obligations</Trans>
              </h2>
              <p className="leading-relaxed text-slate-600">
                <Trans>To ensure service efficiency, the customer must provide accurate information to process each order. Any mistakes in address or contact details are the sole responsibility of the user and may cause delays or additional re-delivery charges.</Trans>
              </p>
            </section>

            <section id="security" className="scroll-mt-28 space-y-4">
              <h2 className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-900">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-black text-white">05</span>
                <Trans>Security and cancellations</Trans>
              </h2>
              <p className="leading-relaxed text-slate-600">
                <Trans>YaVoy applies a zero-tolerance policy against illicit activities.</Trans>{" "}
                <span className="rounded bg-red-50 px-1 font-semibold text-red-700">
                  <Trans>We reserve the right to cancel orders with signs of fraud</Trans>
                </span>{" "}
                <Trans>or misuse of the platform. In such cases, users are notified and the request is handled under internal security protocols.</Trans>
              </p>
            </section>

            <div className="relative mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-[#081737] to-[#0d1b3e] p-6 md:p-8">
              <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-white">
                    <Trans>Do you have questions about these terms?</Trans>
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    <Trans>Our legal support team is available to assist you anytime.</Trans>
                  </p>
                </div>
                <Link to="/contacto" className="inline-flex items-center justify-center rounded-xl bg-[#f06233] px-7 py-3 text-sm font-black text-white shadow-lg shadow-orange-400/30 transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                  <Trans>Contact support</Trans>
                </Link>
              </div>
              <span className="material-symbols-outlined absolute -right-2 -top-3 text-[110px] text-white/10" aria-hidden="true">gavel</span>
              <div className="absolute -right-10 -top-10 h-28 w-28 rotate-45 bg-white/5" />
            </div>
          </article>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
