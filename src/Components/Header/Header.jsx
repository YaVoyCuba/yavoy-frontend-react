import React from "react";

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
      locationType == "servicios" ||
      locationType == "mercados" ||
      locationType == "regalitos" ||
      locationType == "caja" ||
      locationType == "producto" ||
      locationType == "carrito" ||
      locationType == "dulcerias" ? (
        <Location />
      ) : (
        <LocationHouses />
      )}
    </div>
  );
};

export default Header;
