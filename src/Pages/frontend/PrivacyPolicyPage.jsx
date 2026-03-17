import React, { useEffect } from "react";
import { Trans } from "@lingui/react/macro";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-14 md:px-8">
      <h1 className="text-3xl font-black text-slate-900 md:text-4xl"><Trans>Privacy policy</Trans></h1>
      <div className="mt-6 space-y-4 text-slate-700">
        <p>
          <Trans>We collect the information needed to manage purchases, payments, and deliveries, including contact details and delivery address.</Trans>
        </p>
        <p>
          <Trans>We implement security measures to protect your information and prevent unauthorized access.</Trans>
        </p>
        <p>
          <Trans>We do not sell personal data. We only share information with providers and partners when necessary to complete the requested service.</Trans>
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
