import React from "react";
import CartIconGlobal from "../Misc/CartIconGlobal";
import HeaderCategories from "./HeaderCategories";
import HeaderCenter from "./HeaderCenter";

import HeaderTop from "./HeaderTop";
import Location from "./Location";
import LocationHouses from "./LocationHouses";

const Header = (props) => {
  const locationType = props.locationType;
 
  return (
    <div>
      <HeaderTop />
      {locationType == "restaurantes" ||
       locationType == "/" ||
      locationType == "restaurante" ||
      locationType == "mercados" ||
      locationType == "regalitos" ||
      locationType == "caja" ||
      locationType == "dulcerias" ? (
        <Location />
      ) : (
        <LocationHouses />
      )}
    </div>
  );
};

export default Header;
