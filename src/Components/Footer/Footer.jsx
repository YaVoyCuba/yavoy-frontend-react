import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Trans } from "@lingui/react/macro";
import { t } from "@lingui/core/macro";
import defaults from "../../config/defaults";

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
            <img src="/assets/img/logoyavoy.png" alt={t`YaVoy`} className="h-8 w-auto" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            <Trans>E-commerce platform with secure purchases and coordinated deliveries.</Trans>
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
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400"><Trans>Company</Trans></h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="transition hover:text-[#f06233]" to="/about-us">
                <Trans>About us</Trans>
              </Link>
            </li>
            <li>
              <a className="transition hover:text-[#f06233]" href="/#how-it-works">
                <Trans>How it works</Trans>
              </a>
            </li>
            <li>
              <Link className="transition hover:text-[#f06233]" to="/contact">
                <Trans>Contact</Trans>
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400"><Trans>Legal</Trans></h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="transition hover:text-[#f06233]" to="/terms-and-conditions">
                <Trans>Terms and conditions</Trans>
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-[#f06233]" to="/privacy-policy">
                <Trans>Privacy policy</Trans>
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-[#f06233]" to="/refund-policy">
                <Trans>Refund policy</Trans>
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400"><Trans>Contact</Trans></h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>
              <a
                className="transition hover:text-[#f06233]"
                href={`mailto:${info.mail || defaults.mail}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {info.mail || defaults.mail}
              </a>
            </li>
            <li>
              <a
                className="transition hover:text-[#f06233]"
                href={`tel:${(info.phone || defaults.phone).replace(/[^\d+]/g, "")}`}
              >
                {info.phone || defaults.phone}
              </a>
            </li>
            <li>
              <a
                className="transition hover:text-[#f06233]"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.place || defaults.place)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {info.place || defaults.place}
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
          <p><Trans>© 2026 YaVoy. All rights reserved.</Trans></p>
          <p>
            <Trans>Maintained by</Trans>{" "}<a className="hover:text-[#f06233]" href="https://github.com/kmilodenisglez">KDG</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
