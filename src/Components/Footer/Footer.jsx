import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
  const info = useSelector((state) => state.info.info);

  if (!info) {
    return null;
  }

  const socialLinks = [
    { href: info.facebook, label: "Facebook" },
    { href: info.instagram, label: "Instagram" },
    { href: info.telegram, label: "Telegram" },
    { href: info.twitter, label: "X" },
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="bg-[#071636] text-slate-200">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-8">
        <section>
          <div className="flex items-center gap-3">
            <img src="/assets/img/logoyavoy.png" alt="YaVoy Cuba" className="h-8 w-auto" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Conectando familias con un servicio de e-commerce y entregas confiable.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-[#f06233] hover:text-[#f06233]"
              >
                {social.label}
              </a>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Empresa</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="transition hover:text-[#f06233]" to="/sobre-nosotros">
                Sobre nosotros
              </Link>
            </li>
            <li>
              <a className="transition hover:text-[#f06233]" href="/#how-it-works">
                Como funciona
              </a>
            </li>
            <li>
              <Link className="transition hover:text-[#f06233]" to="/contacto">
                Contacto
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Legal</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="transition hover:text-[#f06233]" to="/terminos-y-condiciones">
                Terminos y condiciones
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-[#f06233]" to="/politica-de-privacidad">
                Politica de privacidad
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-[#f06233]" to="/politica-de-reembolso">
                Politica de reembolso
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Contacto</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>{info.mail || "soporte@yavoycuba.com"}</li>
            <li>{info.phone || "+1 (800) 123-4567"}</li>
            <li>Miami, FL, USA</li>
          </ul>
        </section>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© 2026 YaVoy Cuba. Todos los derechos reservados.</p>
          <p>
            Maintained by <a className="hover:text-[#f06233]" href="https://github.com/kmilodenisglez">KDG</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
