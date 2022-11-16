import React from "react";
 
import OffersSpecialsWeek from "../../Components/Landing/OffersSpecialsWeek";
import SellersTopWeek from "../../Components/Landing/SellersTopWeek";
import CategoryWidget from "../../Components/Landing/CategoryWidget";
import PromoWidget from "../../Components/Landing/PromoWidget";
import MostSelledProductsWidget from "../../Components/Landing/MostSelledProductsWidget";
import { useEffect } from "react";
import { Loading } from "../../common/Loading";
 


const LandingPage = () => {
  useEffect(() => window.scrollTo(0, 0));
  return (
    <div className="lg:px-14">
    </div>
  );
};

export default LandingPage;
