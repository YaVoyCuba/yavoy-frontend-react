import React from "react";
import { useSelector } from "react-redux";
import defaults from "../../config/defaults";

const WA = () => {
  const info = useSelector((state) => state.info.info);
  const rawPhone = info?.whatsapp || info?.phone || defaults.whatsapp || defaults.phone || "";
  // Format phone for WhatsApp API: digits only, no leading + or non-digits
  const digits = rawPhone.replace(/\D/g, "");
  const waPhone = digits.replace(/^0+/, "");
  const href = `https://api.whatsapp.com/send?phone=${waPhone}&text=Hola%20necesito%20ayuda%20en%20Ya Voy Marketplace.`;

  return (
    <a
      href={href}
      className="float inline-flex items-center gap-2"
      target="_blank"
      rel="noopener noreferrer"
      title={`WhatsApp: ${rawPhone}`}
      aria-label={`Contact via WhatsApp ${rawPhone}`}
    >
      <img src="/assets/img/wa.png" className="mx-auto p-3" alt="WhatsApp" />
      <span className="hidden md:inline-block text-xs text-white">{rawPhone}</span>
    </a>
  );
};

export default WA;
