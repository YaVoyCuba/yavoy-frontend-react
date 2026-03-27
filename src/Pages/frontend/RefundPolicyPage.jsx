import React, { useEffect } from "react";
import { Trans } from "@lingui/react/macro";

const RefundPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 md:px-8 md:py-16">
      <div className="stitch-reveal mb-12 border-b border-[#f1d8cf] pb-10">
        <p className="inline-flex rounded-full bg-[#ffe7df] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#f06233]">
          <Trans>Policy document</Trans>
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl"><Trans>Refund policy</Trans></h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
          <Trans>Last updated: October 24, 2023. Our commitment to transparency, fairness, and excellence in travel logistics.</Trans>
        </p>
      </div>

      <p className="text-base leading-relaxed text-slate-700">
        <Trans>At YaVoy, we want you to have a safe and satisfying shopping experience.</Trans>
      </p>

      <p className="text-base leading-relaxed text-slate-700">
        <Trans>This policy outlines the conditions under which you may request exchanges or refunds for products purchased through our platform.</Trans>
      </p>

      <section className="stitch-reveal mt-12" style={{ animationDelay: "90ms" }}>
        <h2 className="flex items-center gap-2 text-3xl font-black md:text-4xl">
          <span className="material-symbols-outlined text-[#f06233]">verified_user</span>
          <Trans>Refund eligibility</Trans>
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          <article className="md:col-span-3 rounded-2xl border border-[#f1d8cf] bg-white p-6 shadow-[0_10px_35px_-24px_rgba(240,98,51,0.65)]">
            <p className="text-lg font-black text-slate-900">
              <Trans>Refunds apply in the following cases:</Trans>
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 md:text-base">
              <li className="flex items-start gap-2 rounded-lg bg-[#fff6f2] px-3 py-2">
                <span className="material-symbols-outlined mt-[1px] text-base text-[#f06233]">check_circle</span>
                <Trans>Product not delivered</Trans>
              </li>
              <li className="flex items-start gap-2 rounded-lg bg-[#fff6f2] px-3 py-2">
                <span className="material-symbols-outlined mt-[1px] text-base text-[#f06233]">check_circle</span>
                <Trans>Incorrect or incomplete product</Trans>
              </li>
              <li className="flex items-start gap-2 rounded-lg bg-[#fff6f2] px-3 py-2">
                <span className="material-symbols-outlined mt-[1px] text-base text-[#f06233]">check_circle</span>
                <Trans>Product in poor condition (with evidence)</Trans>
              </li>
            </ul>
          </article>

          <aside className="md:col-span-2 rounded-2xl border border-[#f7b7a2] bg-[#fff2ed] p-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-wider text-[#f06233]">
              <span className="material-symbols-outlined !text-sm">priority_high</span>
              <Trans>Important</Trans>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              <Trans>To request a refund, the customer must contact our team within 48 hours after delivery, providing evidence when applicable.</Trans>
            </p>
          </aside>
        </div>
      </section>

      <section className="stitch-reveal mt-10 rounded-2xl border border-[#f1d8cf] bg-[#fff2ed] p-6 md:p-8" style={{ animationDelay: "160ms" }}>
        <h2 className="flex items-center gap-2 text-3xl font-black md:text-4xl">
          <span className="material-symbols-outlined text-[#f06233]">account_tree</span>
          <Trans>Refund process</Trans>
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <article>
            <p className="text-2xl font-black text-[#f06233]">01.</p>
            <p className="mt-2 text-lg font-bold"><Trans>Submit request</Trans></p>
            <p className="mt-1 text-sm text-slate-600"><Trans>Log in and select Request Refund in your active booking.</Trans></p>
          </article>
          <article>
            <p className="text-2xl font-black text-[#f06233]">02.</p>
            <p className="mt-2 text-lg font-bold"><Trans>Internal review</Trans></p>
            <p className="mt-1 text-sm text-slate-600"><Trans>Our team validates cancellation timing and service status within 24 hours.</Trans></p>
          </article>
          <article>
            <p className="text-2xl font-black text-[#f06233]">03.</p>
            <p className="mt-2 text-lg font-bold"><Trans>Approval</Trans></p>
            <p className="mt-1 text-sm text-slate-600"><Trans>Once approved, you receive email confirmation with the final amount.</Trans></p>
          </article>
        </div>
      </section>

      <section className="stitch-reveal mt-12" style={{ animationDelay: "230ms" }}>
        <h2 className="flex items-center gap-2 text-3xl font-black md:text-4xl">
          <span className="material-symbols-outlined text-[#f06233]">schedule</span>
          <Trans>Refund timeline</Trans>
        </h2>
        <div className="mt-5 overflow-hidden rounded-xl border border-[#f1d8cf]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fff2ed]">
              <tr>
                <th className="px-5 py-3 font-bold"><Trans>Payment method</Trans></th>
                <th className="px-5 py-3 font-bold"><Trans>Processing time</Trans></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1d8cf] bg-white">
              <tr>
                <td className="px-5 py-3"><Trans>Credit/debit cards</Trans></td>
                <td className="px-5 py-3"><Trans>5 - 10 business days</Trans></td>
              </tr>
              <tr>
                <td className="px-5 py-3"><Trans>Digital wallets (PayPal/Apple Pay)</Trans></td>
                <td className="px-5 py-3"><Trans>2 - 3 business days</Trans></td>
              </tr>
              <tr>
                <td className="px-5 py-3"><Trans>Bank transfers</Trans></td>
                <td className="px-5 py-3"><Trans>7 - 14 business days</Trans></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="stitch-reveal mt-12 rounded-2xl bg-[#0b1a3f] p-8 text-center text-white md:p-12" style={{ animationDelay: "300ms" }}>
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#f06233]">
          <span className="material-symbols-outlined">support_agent</span>
        </div>
        <h2 className="text-4xl font-black md:text-5xl"><Trans>Need more help?</Trans></h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-200">
          <Trans>Our support team is available to answer questions about this policy and specific cases.</Trans>
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="/contacto" className="inline-flex items-center gap-2 rounded-lg bg-[#f06233] px-6 py-3 text-sm font-bold text-white">
            <span className="material-symbols-outlined !text-base">mail</span>
            <Trans>Contact support</Trans>
          </a>
          <a href="/" className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white">
            <span className="material-symbols-outlined !text-base">help</span>
            <Trans>Help center</Trans>
          </a>
        </div>
      </section>
      <div className="h-8" />
      <div className="border-t border-[#f1d8cf] pt-5 text-center text-xs text-slate-500"><Trans>© 2026 YaVoy. All rights reserved.</Trans></div>
    </main>
  );
};

export default RefundPolicyPage;
