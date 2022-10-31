import React from "react";
import { Link } from "react-router-dom";

const CardSeller = (props) => {
  const { logo, name, cover, productsCount, products } = props;

  return (
    <div className="mt-3 shadow-xl rounded-sm  bg-white flex flex-col">
      <img src={cover} className="object-cover" />
      <Link
        className="h-24 w-24 -mt-9  self-center   rounded-full"
        to={"/tienda/" + "otro-categoria"}
      >
        <img src={logo} />
      </Link>
      <span className="uppercase self-center subtitle cursor-pointer">
        {name}
      </span>
      <span className="self-center subtitle-2 cursor-pointer">
        {productsCount} productos
      </span>
      <div className="flex  selection:m-1 p-2">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <img
                className="w-24 p-2 h-24 object-contain cursor-pointer"
                src={product.image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardSeller;
