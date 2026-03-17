import React, { useEffect } from "react";
import { Trans } from "@lingui/react/macro";

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-14 md:px-8">
      <h1 className="text-3xl font-black text-slate-900 md:text-4xl"><Trans>Terms and conditions</Trans></h1>
      <div className="mt-6 space-y-4 text-slate-700">
        <p>
          <Trans>YaVoy operates as an e-commerce platform that coordinates deliveries with local partners. By using this site, you agree to comply with our published purchase, payment, and delivery policies.</Trans>
        </p>
        <p>
          <Trans>Delivery times are estimated and may vary due to availability, weather, or third-party logistics factors. The customer must provide accurate information to process the order.</Trans>
        </p>
        <p>
          <Trans>We reserve the right to cancel orders that show signs of fraud, non-compliance, or misuse of the platform.</Trans>
        </p>
      </div>
    </main>
  );
};

export default TermsPage;
