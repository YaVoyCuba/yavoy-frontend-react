import React, { useEffect } from "react";

const RefundPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 md:px-8 md:py-16">
      <div className="mb-12 border-b border-[#f1d8cf] pb-10">
        <p className="inline-flex rounded-full bg-[#ffe7df] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#f06233]">
          Documento de politica
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Politica de Reembolso</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
          Ultima actualizacion: 24 de octubre de 2023. Nuestro compromiso con la transparencia, la equidad y la
          excelencia en la logistica de viajes.
        </p>
      </div>

      <p className="text-base leading-relaxed text-slate-700">
        En YaVoy Cuba, entendemos que los planes pueden cambiar inesperadamente. Esta politica describe nuestro
        procedimiento para cancelaciones y reembolsos, equilibrando flexibilidad para clientes y compromisos logísticos
        con socios locales.
      </p>

      <section className="mt-12">
        <h2 className="text-3xl font-black md:text-4xl">Elegibilidad de reembolso</h2>
        <div className="mt-5 space-y-3">
          <details className="rounded-xl border border-[#f1d8cf] bg-white p-4" open>
            <summary className="cursor-pointer list-none text-lg font-bold">Cancelaciones estandar</summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Reservas canceladas al menos 48 horas antes: reembolso completo menos tarifa administrativa del 5%.
              Cancelaciones entre 24 y 48 horas: reembolso del 50%.
            </p>
          </details>
          <details className="rounded-xl border border-[#f1d8cf] bg-white p-4">
            <summary className="cursor-pointer list-none text-lg font-bold">Incumplimiento del servicio</summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Si no podemos cumplir una reserva confirmada, aplicamos reembolso del 100% o alternativa equivalente sin
              costo adicional.
            </p>
          </details>
          <details className="rounded-xl border border-[#f1d8cf] bg-white p-4">
            <summary className="cursor-pointer list-none text-lg font-bold">Eventos de fuerza mayor</summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Casos fuera de control operativo se revisan individualmente y pueden resolverse mediante creditos vigentes
              por 12 meses.
            </p>
          </details>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-[#f1d8cf] bg-[#fff2ed] p-6 md:p-8">
        <h2 className="text-3xl font-black md:text-4xl">Proceso de devolucion</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <article>
            <p className="text-2xl font-black text-[#f06233]">01.</p>
            <p className="mt-2 text-lg font-bold">Enviar solicitud</p>
            <p className="mt-1 text-sm text-slate-600">Solicita el reembolso desde tu reserva activa.</p>
          </article>
          <article>
            <p className="text-2xl font-black text-[#f06233]">02.</p>
            <p className="mt-2 text-lg font-bold">Revision interna</p>
            <p className="mt-1 text-sm text-slate-600">Validamos plazos y estado del servicio en 24 horas.</p>
          </article>
          <article>
            <p className="text-2xl font-black text-[#f06233]">03.</p>
            <p className="mt-2 text-lg font-bold">Aprobacion</p>
            <p className="mt-1 text-sm text-slate-600">Recibes confirmacion por correo con monto final.</p>
          </article>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-black md:text-4xl">Cronograma de reembolsos</h2>
        <div className="mt-5 overflow-hidden rounded-xl border border-[#f1d8cf]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fff2ed]">
              <tr>
                <th className="px-5 py-3 font-bold">Metodo de pago</th>
                <th className="px-5 py-3 font-bold">Tiempo de procesamiento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1d8cf] bg-white">
              <tr>
                <td className="px-5 py-3">Tarjetas de credito/debito</td>
                <td className="px-5 py-3">5 - 10 dias habiles</td>
              </tr>
              <tr>
                <td className="px-5 py-3">Billeteras digitales (PayPal/Apple Pay)</td>
                <td className="px-5 py-3">2 - 3 dias habiles</td>
              </tr>
              <tr>
                <td className="px-5 py-3">Transferencias bancarias</td>
                <td className="px-5 py-3">7 - 14 dias habiles</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 rounded-2xl bg-[#0b1a3f] p-8 text-center text-white md:p-12">
        <h2 className="text-4xl font-black md:text-5xl">Necesita mas ayuda?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-200">
          Nuestro equipo de soporte esta disponible para responder consultas sobre la politica y casos especificos.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="/contacto" className="rounded-lg bg-[#f06233] px-6 py-3 text-sm font-bold text-white">
            Contactar a soporte
          </a>
          <a href="/" className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white">
            Centro de ayuda
          </a>
        </div>
      </section>
      <div className="h-8" />
      <div className="border-t border-[#f1d8cf] pt-5 text-center text-xs text-slate-500">© 2026 YaVoy Cuba. Todos los derechos reservados.</div>
    </main>
  );
};

export default RefundPolicyPage;
