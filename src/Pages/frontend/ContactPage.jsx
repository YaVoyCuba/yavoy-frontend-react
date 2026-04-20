import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Trans } from "@lingui/react/macro";
import { t } from "@lingui/core/macro";
import defaults from "../../config/defaults";

const ContactPage = () => {
  const info = useSelector((state) => state.info.info);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const subject = (formData.get("subject") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    const fallbackSubject = name ? `Contacto web de ${name}` : "Contacto web";
    const mailSubject = subject || fallbackSubject;
    const bodyLines = [
      `Nombre: ${name}`,
      `Correo: ${email}`,
      "",
      "Mensaje:",
      message,
    ];

    const mailtoUrl = `mailto:servicios@yavoycuba.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    const mailWindow = window.open(mailtoUrl, "_blank", "noopener,noreferrer");
    if (!mailWindow) {
      window.location.href = mailtoUrl;
    }

    form.reset();
  };

  const place = info?.place || defaults.place;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
  const phone = info?.phone || defaults.phone;
  const phoneUrl = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <main className="-mx-3 bg-[#f6f4f5] text-slate-900 lg:-mx-14">
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2 lg:px-8">
        <div className="stitch-reveal">
          <h1 className="text-5xl font-black leading-tight md:text-6xl"><Trans>How can we help you?</Trans></h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-600">
            <Trans>Our team is available to assist you with any inquiries regarding products, orders, or your account. Contact us, and we will respond as soon as possible.</Trans>
          </p>

          <form onSubmit={handleSubmit} className="mt-7 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                <Trans>Name</Trans>
                <input className="mt-2 w-full rounded-lg border-slate-200" placeholder={t`Full name`} type="text" name="name" required />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                <Trans>Email</Trans>
                <input className="mt-2 w-full rounded-lg border-slate-200" placeholder={t`email@example.com`} type="email" name="email" required />
              </label>
            </div>
            <label className="mt-4 block text-sm font-semibold text-slate-700">
              <Trans>Subject</Trans>
              <input className="mt-2 w-full rounded-lg border-slate-200" placeholder={t`Question about...`} type="text" name="subject" required />
            </label>
            <label className="mt-4 block text-sm font-semibold text-slate-700">
              <Trans>Message</Trans>
              <textarea
                className="mt-2 min-h-[140px] w-full resize-none rounded-lg border-slate-200"
                placeholder={t`Tell us more about your needs...`}
                name="message"
                required
              />
            </label>
            <button className="mt-5 w-full rounded-lg bg-[#f06233] px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-[#e1572b]" type="submit">
              <span className="inline-flex items-center gap-2">
                <Trans>Send message</Trans>
                <span className="material-symbols-outlined !text-base">send</span>
              </span>
            </button>
          </form>
        </div>

        <div className="space-y-4 stitch-reveal" style={{ animationDelay: "120ms" }}>
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <p className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1ec] text-[#f06233]">
              <span className="material-symbols-outlined">mail</span>
            </p>
            <p className="text-sm text-slate-500"><Trans>Email us</Trans></p>
            <p className="mt-1 text-2xl font-bold">
              <a
                className="hover:text-[#f06233]"
                href={`mailto:${info?.mail || defaults.mail}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {info?.mail || defaults.mail}
              </a>
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <p className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1ec] text-[#f06233]">
              <span className="material-symbols-outlined">call</span>
            </p>
            <p className="text-sm text-slate-500"><Trans>Call us</Trans></p>
            <p className="mt-1 text-2xl font-bold">
              <a className="hover:text-[#f06233]" href={phoneUrl}>
                {phone}
              </a>
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <p className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1ec] text-[#f06233]">
              <span className="material-symbols-outlined">location_on</span>
            </p>
            <p className="text-sm text-slate-500"><Trans>Visit us</Trans></p>
            <p className="mt-1 text-2xl font-bold">
              <a className="hover:text-[#f06233]" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                {place}
              </a>
            </p>
          </article>

          <div className="relative h-[320px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <img src="/assets/img/fondo.webp" alt={t`Location in Miami`} className="h-full w-full object-cover grayscale" />
            <div className="absolute bottom-4 left-4 rounded-lg bg-white px-4 py-2 text-sm font-bold shadow-lg">
              <Trans>Our headquarters in Miami</Trans>
            </div>
          </div>

          <div className="rounded-xl border border-[#f2cdc0] bg-[#fff1ec] p-5 md:p-6">
            <h3 className="font-bold text-[#f06233]"><Trans>Customer service hours</Trans></h3>
            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500"><Trans>Mon - Fri</Trans></p>
                <p className="font-bold"><Trans>9:00 AM - 6:00 PM</Trans></p>
              </div>
              <div>
                <p className="text-slate-500"><Trans>Saturday</Trans></p>
                <p className="font-bold"><Trans>10:00 AM - 2:00 PM</Trans></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
