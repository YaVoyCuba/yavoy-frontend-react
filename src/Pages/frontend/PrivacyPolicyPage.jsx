import React, { useEffect } from "react";
import { Trans } from "@lingui/react/macro";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="-mx-3 bg-[#f2f0f1] py-12 text-slate-900 lg:-mx-14 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
        <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="inline-flex rounded-full bg-[#ffede8] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#f06233]">
              <Trans>Total transparency</Trans>
            </p>
            <h1 className="mt-5 text-5xl font-black leading-[0.96] tracking-tight text-slate-900 md:text-7xl md:leading-[0.95]">
              <Trans>Your privacy is our</Trans>{" "}
              <span className="text-[#f06233]"><Trans>vital commitment.</Trans></span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-600">
              <Trans>At YaVoy, trust is the foundation of every delivery. This policy explains how we protect your information while connecting borders.</Trans>
            </p>
          </div>

          <div className="relative lg:col-span-5" aria-hidden="true">
            <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-[#f06233]/25 blur-3xl" />
            <div className="h-[260px] rounded-3xl shadow-2xl lg:h-[360px] lg:rotate-[2.5deg]" style={{ background: "radial-gradient(circle at 18% 15%, #66c9ee 0%, #f3a24e 34%, #f9881f 70%, #f97316 100%)" }} />
          </div>
        </section>

        <section className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-7">
          <article className="md:col-span-8 rounded-3xl bg-white p-7 shadow-md md:p-10">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-3xl font-black tracking-tight text-slate-900"><Trans>Data collection</Trans></h2>
              <span className="material-symbols-outlined text-5xl text-[#f06233]/20">database</span>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              <Trans>We collect the information needed to manage purchases, payments, and deliveries, including contact details and delivery address.</Trans>
            </p>
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                <span className="material-symbols-outlined text-[#f06233]">person</span>
                <Trans>Basic identity</Trans>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                <span className="material-symbols-outlined text-[#f06233]">location_on</span>
                <Trans>Delivery destinations</Trans>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                <span className="material-symbols-outlined text-[#f06233]">payments</span>
                <Trans>Payment methods</Trans>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                <span className="material-symbols-outlined text-[#f06233]">contact_mail</span>
                <Trans>Contact channels</Trans>
              </div>
            </div>
          </article>

          <article className="md:col-span-4 rounded-3xl bg-[#f06233] p-7 text-white shadow-lg shadow-orange-300/40 md:p-10">
            <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <h3 className="mt-5 text-3xl font-black tracking-tight"><Trans>YaVoy guarantee</Trans></h3>
            <p className="mt-4 leading-relaxed text-white/90">
              <Trans>We do not sell personal data. Your information is a service tool, not a commercial product.</Trans>
            </p>
            <p className="mt-8 border-t border-white/25 pt-5 text-xs font-black uppercase tracking-[0.16em] text-white/75">
              <Trans>100% human privacy</Trans>
            </p>
          </article>

          <article className="relative overflow-hidden md:col-span-5 rounded-3xl bg-slate-900 p-7 text-white shadow-md md:p-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#f06233]/20 blur-2xl" />
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#f06233]">
              <span className="material-symbols-outlined">security</span>
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight"><Trans>Security</Trans></h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              <Trans>We implement security measures to protect your information and prevent unauthorized access. We use bank-grade encryption protocols for every transaction and storage flow.</Trans>
            </p>
          </article>

          <article className="md:col-span-7 rounded-3xl bg-white p-7 shadow-md md:p-10">
            <h2 className="text-3xl font-black tracking-tight text-slate-900"><Trans>Use of information</Trans></h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              <Trans>We only share information with providers and partners when needed to complete the requested service. Your data flow follows a strictly logistical path:</Trans>
            </p>
            <div className="mt-7 space-y-4">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ffede8] text-xs font-black text-[#f06233]">01</span>
                <p className="font-medium text-slate-600"><Trans>Transaction validation with secure payment gateways.</Trans></p>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ffede8] text-xs font-black text-[#f06233]">02</span>
                <p className="font-medium text-slate-600"><Trans>Coordination with local carriers in Cuba.</Trans></p>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ffede8] text-xs font-black text-[#f06233]">03</span>
                <p className="font-medium text-slate-600"><Trans>Status notifications and order tracking updates.</Trans></p>
              </div>
            </div>
          </article>
        </section>

        <section className="mx-auto mt-16 max-w-4xl rounded-3xl bg-[#e9edf3] p-7 text-center shadow-sm md:p-10">
          <h3 className="text-3xl font-black tracking-tight text-slate-900"><Trans>Questions about your data?</Trans></h3>
          <p className="mt-3 text-slate-600">
            <Trans>Our legal support team is available to answer any privacy-related request.</Trans>
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contacto" className="rounded-xl bg-[#f06233] px-8 py-3 text-sm font-black text-white shadow-lg shadow-orange-300/40 transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06233]/40">
              <Trans>Contact support</Trans>
            </Link>
            <Link to="/" className="rounded-xl border-2 border-[#f06233]/20 bg-white px-8 py-3 text-sm font-black text-slate-800 transition hover:bg-[#f06233]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06233]/30">
              <Trans>Frequently asked questions</Trans>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
