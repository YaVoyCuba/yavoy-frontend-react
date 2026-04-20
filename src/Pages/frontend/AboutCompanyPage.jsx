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
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCcNcdXzUPsrxWQzPNdORbDe46KQPxTSAq2rX16kQc2Y9_Mt3thwHg5RxLr7SdO8dOweWZ9IgYlIenTPyOS6ds9ABYYn3CXHDnJp5ckno25gGMzq9_aKEztC4YvfscnieEcBwajcsKLtLrjpTh5l3FFQpGNVyl2fHvFNMLeHFuEAG1mZIP-EkGPSBECmc35kv2fhgN4hLaWtEPtwL__JDY0RG-92C_XuDD6H32nVR_JexUAmTM_DYnCI6k9YMjUR1EYkGYRqamjYQ")',
            }}
            role="img"
            aria-label={t`Modern logistics warehouse with organized shelves of products`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          <div className="relative flex h-full max-w-4xl flex-col justify-end p-8 md:p-16">
            <span className="mb-4 inline-block rounded bg-[#f06233] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              <Trans>Our identity</Trans>
            </span>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
              <Trans>YaVoyCuba.com is an e-commerce platform operated by YA VOY, LLC, a U.S.-registered company headquartered in Miami, Florida.</Trans>
            </h1>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-200 md:text-xl">
              <Trans>Our mission is to make it easier to purchase products and services through a secure, reliable, and accessible online experience from anywhere in the world.</Trans>
            </p>
          </div>
        </div>
      </section>

      <section className="stitch-reveal mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-8" style={{ animationDelay: "90ms" }}>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#f06233]"><Trans>Trusted commerce</Trans></p>
          <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl"><Trans>Variety and quality</Trans></h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            <Trans>Through our platform, customers can purchase a wide range of products, including food, household items, electronics, and personal-use packages.</Trans>
          </p>
          <div className="mt-7 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="material-symbols-outlined !text-base text-[#f06233]">inventory</span>
              <Trans>Inventory management</Trans>
            </p>
            <p className="mt-1 text-sm text-slate-600">
              <Trans>We maintain a broad range of essential products ready to be shipped with full security.</Trans>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-64 overflow-hidden rounded-xl shadow-lg">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjsMl_wd2HWKNMLm1PLrNhQsvy0CxYwux_RqguuR9v__MX5afE0CogNu_FALlKA9rictEaNSd9EBBm_zHM6EXJRZNFmcruz-LMlOdXEvXoKnfT_1AfaaMOHcTzdFceUYJVIiKqQB3Rpdq9OpICit6OHOH-S8QIrk95BY6XH2F309TcU5L4rzsY9tjWwoHr3IBE7vzrenpdUmT1lBcWQ1-xSugipz3BIGvXTz5WtiP8RKwTrsvbjiMJWQLT-4s-f6W0OBf__ezcvQ"
              alt={t`Warehouse worker picking food products`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-64 translate-y-8 overflow-hidden rounded-xl shadow-lg">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB11TBnLvRqRydv2wxI0Lcfo1Y5sUAt-VGGqN4wdOpfmFg-ZOQ45K7BhjqffYs2AxX67ekc5sBlHCZpfPneiZq11IwV1FZ3UpUB1y-a90KbWyLt__44LkQlzvytwhrQKUOcezdRSvJO-Hb6ab8a5C1909mpxdONECo3UsTj4703GZj2EqRc_aoYzFtwEIPlqVoDo8VSkkZ19BfFWhoKnUDTE3jsiVaSEi1nwzIQYpJXqyY_1Cf7Y1WfvhHUMfap3BvqhnOUgXG0yQ"
              alt={t`Electronic goods in boxes ready for shipping`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="stitch-reveal bg-[#f4ebea] py-20" style={{ animationDelay: "160ms" }}>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-black md:text-4xl"><Trans>How we work</Trans></h2>
            <p className="mt-3 text-slate-600">
              <Trans>Our commitment is to ensure every order reaches its destination with maximum efficiency and transparency.</Trans>
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-4xl font-black text-[#f06233]">01</p>
              <p className="mt-3 text-lg font-bold"><Trans>Online shopping</Trans></p>
              <p className="mt-2 text-sm text-slate-600">
                <Trans>Orders are processed online and coordinated with independent suppliers and fulfillment partners responsible for preparing and delivering products.</Trans>
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-4xl font-black text-[#f06233]">02</p>
              <p className="mt-3 text-lg font-bold"><Trans>Business partnerships</Trans></p>
              <p className="mt-2 text-sm text-slate-600">
                <Trans>We partner with local businesses to offer curated products, ensure safety standards, and deliver products to our customers.</Trans>
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-4xl font-black text-[#f06233]">03</p>
              <p className="mt-3 text-lg font-bold"><Trans>User experience</Trans></p>
              <p className="mt-2 text-sm text-slate-600">
                <Trans>We focus on delivering a clear, secure, and efficient shopping experience, with customer support, process transparency, and reliable payment methods.</Trans>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="stitch-reveal mx-auto w-full max-w-7xl px-4 py-24 md:px-8" style={{ animationDelay: "220ms" }}>
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-[#f06233] px-4 py-3 text-sm font-bold text-white">
              <span><Trans>Miami operations center</Trans></span>
              <span className="material-symbols-outlined !text-base">verified</span>
            </div>
            <div className="p-8">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzUrLKbz2Cs-jkc90ImnPfYZFhVcDjh35avx1pj4VjuyMNkqxe_kMupQlhnnmJTKsJ-g_0stnvoz6PRQhCdvRGJ0AafuQnbSV51p3p2DqOV-E8ItmcX1LtpQMAVNKMSjtqHWS92PxGeSKxRD3geKb_F0kqrrsAyd-Ua3vTygc1nAGUfH93lqmWuU6-Y_mz2VfKXA-Igr-7Boe_a3ifi-3tNVX9yjV4yAdaP-02_AABuh6tsqD2WB72bH2Qh7J6aAow9uAbzB-OcQ"
                alt={t`Pallets of household goods in a professional warehouse`}
                className="mb-6 h-64 w-full rounded-lg object-cover"
              />
              <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <span className="material-symbols-outlined">warehouse</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900"><Trans>Professional storage</Trans></p>
                  <p className="text-sm text-slate-500"><Trans>We maintain strict storage standards for all our products.</Trans></p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#f06233]"><Trans>Guaranteed quality</Trans></p>
            <h2 className="mt-2 text-4xl font-black"><Trans>Commitment to excellence</Trans></h2>
            <div className="mt-8 space-y-8">
              <article className="flex gap-4">
                <span className="material-symbols-outlined text-3xl text-[#f06233]">shopping_cart_checkout</span>
                <div>
                  <p className="text-xl font-bold"><Trans>Modern e-commerce</Trans></p>
                  <p className="text-slate-600"><Trans>A platform designed to make essential products accessible from anywhere in the world.</Trans></p>
                </div>
              </article>
              <article className="flex gap-4">
                <span className="material-symbols-outlined text-3xl text-[#f06233]">package_2</span>
                <div>
                  <p className="text-xl font-bold"><Trans>Verified products</Trans></p>
                  <p className="text-slate-600"><Trans>Every item in our food, electronics, and household catalog passes quality checks before shipping.</Trans></p>
                </div>
              </article>
              <article className="flex gap-4">
                <span className="material-symbols-outlined text-3xl text-[#f06233]">support_agent</span>
                <div>
                  <p className="text-xl font-bold"><Trans>Personalized support</Trans></p>
                  <p className="text-slate-600"><Trans>We provide continuous support to ensure your shopping experience is satisfactory from start to finish.</Trans></p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="stitch-reveal mx-auto w-full max-w-7xl px-4 pb-20 md:px-8" style={{ animationDelay: "280ms" }}>
        <div className="relative overflow-hidden rounded-2xl bg-[#f06233] px-8 py-12 text-center text-white md:px-16 md:py-16">
          <span className="material-symbols-outlined pointer-events-none absolute -left-8 -top-10 text-[260px] text-white/10">shopping_basket</span>
          <h2 className="relative z-10 text-4xl font-black leading-tight md:text-5xl"><Trans>Ready to place your order?</Trans></h2>
          <p className="relative z-10 mx-auto mt-4 max-w-2xl text-white/90">
            <Trans>Explore our selection of food, electronics, and household items with the confidence of YaVoy Cuba.</Trans>
          </p>
          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
            <a href="/" className="rounded-xl bg-white px-8 py-4 text-sm font-bold text-[#f06233] transition hover:bg-slate-50">
              <Trans>Shop now</Trans>
            </a>
            <a href="/restaurantes" className="rounded-xl border-2 border-white px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10">
              <Trans>View catalog</Trans>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutCompanyPage;
