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
          <Trans>Documento de politica</Trans>
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl"><Trans>Politica de Reembolso</Trans></h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
          <Trans>Ultima actualizacion: 24 de octubre de 2023. Nuestro compromiso con la transparencia, la equidad y la excelencia en la logistica de viajes.</Trans>
        </p>
      </div>

      <p className="text-base leading-relaxed text-slate-700">
        <Trans>En YaVoy Cuba, entendemos que los planes de viaje pueden cambiar inesperadamente. Esta politica describe nuestro procedimiento operativo estandar para cancelaciones y reembolsos. Nuestro objetivo es equilibrar la flexibilidad de nuestros clientes con los compromisos logisticos asumidos con socios locales en toda Cuba.</Trans>
      </p>

      <section className="stitch-reveal mt-12" style={{ animationDelay: "90ms" }}>
        <h2 className="flex items-center gap-2 text-3xl font-black md:text-4xl">
          <span className="material-symbols-outlined text-[#f06233]">verified_user</span>
          <Trans>Elegibilidad de reembolso</Trans>
        </h2>
        <div className="mt-5 space-y-3">
          <details className="rounded-xl border border-[#f1d8cf] bg-white p-4" open>
            <summary className="cursor-pointer list-none text-lg font-bold"><Trans>Cancelaciones estandar</Trans></summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              <Trans>Reservas canceladas al menos 48 horas antes: reembolso completo menos tarifa administrativa del 5%. Cancelaciones entre 24 y 48 horas: reembolso del 50%.</Trans>
            </p>
          </details>
          <details className="rounded-xl border border-[#f1d8cf] bg-white p-4">
            <summary className="cursor-pointer list-none text-lg font-bold"><Trans>Incumplimiento del servicio</Trans></summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              <Trans>Si no podemos cumplir una reserva confirmada, aplicamos reembolso del 100% o alternativa equivalente sin costo adicional.</Trans>
            </p>
          </details>
          <details className="rounded-xl border border-[#f1d8cf] bg-white p-4">
            <summary className="cursor-pointer list-none text-lg font-bold"><Trans>Eventos de fuerza mayor</Trans></summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              <Trans>Eventos fuera de control operativo se revisan caso por caso. Generalmente ofrecemos creditos validos por 12 meses.</Trans>
            </p>
          </details>
        </div>
      </section>

      <section className="stitch-reveal mt-10 rounded-2xl border border-[#f1d8cf] bg-[#fff2ed] p-6 md:p-8" style={{ animationDelay: "160ms" }}>
        <h2 className="flex items-center gap-2 text-3xl font-black md:text-4xl">
          <span className="material-symbols-outlined text-[#f06233]">account_tree</span>
          <Trans>Proceso de devolucion</Trans>
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <article>
            <p className="text-2xl font-black text-[#f06233]">01.</p>
            <p className="mt-2 text-lg font-bold"><Trans>Enviar solicitud</Trans></p>
            <p className="mt-1 text-sm text-slate-600"><Trans>Inicia sesion y selecciona Solicitar Reembolso en tu reserva activa.</Trans></p>
          </article>
          <article>
            <p className="text-2xl font-black text-[#f06233]">02.</p>
            <p className="mt-2 text-lg font-bold"><Trans>Revision interna</Trans></p>
            <p className="mt-1 text-sm text-slate-600"><Trans>Nuestro equipo valida plazo de cancelacion y estado del servicio en 24 horas.</Trans></p>
          </article>
          <article>
            <p className="text-2xl font-black text-[#f06233]">03.</p>
            <p className="mt-2 text-lg font-bold"><Trans>Aprobacion</Trans></p>
            <p className="mt-1 text-sm text-slate-600"><Trans>Una vez aprobado, recibes confirmacion por correo con monto final.</Trans></p>
          </article>
        </div>
      </section>

      <section className="stitch-reveal mt-12" style={{ animationDelay: "230ms" }}>
        <h2 className="flex items-center gap-2 text-3xl font-black md:text-4xl">
          <span className="material-symbols-outlined text-[#f06233]">schedule</span>
          <Trans>Cronograma de reembolsos</Trans>
        </h2>
        <div className="mt-5 overflow-hidden rounded-xl border border-[#f1d8cf]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fff2ed]">
              <tr>
                <th className="px-5 py-3 font-bold"><Trans>Metodo de pago</Trans></th>
                <th className="px-5 py-3 font-bold"><Trans>Tiempo de procesamiento</Trans></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1d8cf] bg-white">
              <tr>
                <td className="px-5 py-3"><Trans>Tarjetas de credito/debito</Trans></td>
                <td className="px-5 py-3"><Trans>5 - 10 dias habiles</Trans></td>
              </tr>
              <tr>
                <td className="px-5 py-3"><Trans>Billeteras digitales (PayPal/Apple Pay)</Trans></td>
                <td className="px-5 py-3"><Trans>2 - 3 dias habiles</Trans></td>
              </tr>
              <tr>
                <td className="px-5 py-3"><Trans>Transferencias bancarias</Trans></td>
                <td className="px-5 py-3"><Trans>7 - 14 dias habiles</Trans></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="stitch-reveal mt-12 rounded-2xl bg-[#0b1a3f] p-8 text-center text-white md:p-12" style={{ animationDelay: "300ms" }}>
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#f06233]">
          <span className="material-symbols-outlined">support_agent</span>
        </div>
        <h2 className="text-4xl font-black md:text-5xl"><Trans>Necesita mas ayuda?</Trans></h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-200">
          <Trans>Nuestro equipo de soporte esta disponible para responder consultas sobre la politica y casos especificos.</Trans>
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="/contacto" className="inline-flex items-center gap-2 rounded-lg bg-[#f06233] px-6 py-3 text-sm font-bold text-white">
            <span className="material-symbols-outlined !text-base">mail</span>
            <Trans>Contactar a soporte</Trans>
          </a>
          <a href="/" className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white">
            <span className="material-symbols-outlined !text-base">help</span>
            <Trans>Centro de ayuda</Trans>
          </a>
        </div>
      </section>
      <div className="h-8" />
      <div className="border-t border-[#f1d8cf] pt-5 text-center text-xs text-slate-500"><Trans>© 2026 YaVoy Cuba. Todos los derechos reservados.</Trans></div>
    </main>
  );
};

export default RefundPolicyPage;
