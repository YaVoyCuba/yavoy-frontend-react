import React from "react";
import CartIconGlobal from "../Misc/CartIconGlobal";
import HeaderCategories from "./HeaderCategories";
import HeaderCenter from "./HeaderCenter";
 
 
import HeaderTop from "./HeaderTop";
import Location from "./Location";

const Header = () => {
  return (
    <div>
      <HeaderTop />
      <Location />
    
      {/* <HeaderCenter />
      <HeaderCategories /> */}
    
    </div>
  );
};

export default Header;
