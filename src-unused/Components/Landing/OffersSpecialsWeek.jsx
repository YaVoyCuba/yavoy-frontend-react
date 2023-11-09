import React, { useState, useEffect } from "react";
import CardProductOffer from "../Misc/CardProductOffer";

const OffersSpecialsWeek = () => {
  const [productsOffersPopulars, setProductsOffersPopulars] = useState([]);

  async function getDataApi() {
    const data = await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProductsOffersPopulars(json));
  }

  useEffect(() => {
    getDataApi();
  }, []);

  return (
    <div className="flex px-3 mb-20 flex-col">
      <h2 className="title pb-6">Ofertas de la semana</h2>
      <hr className="separator" />

      <div className="grid grid-cols-4">
        {productsOffersPopulars.map((product) => {
          return (
            <div  key={product.id} className="col-span-4 m-2 lg:col-span-1">
              <CardProductOffer
                id={product.id}
                name={product.title}
                img={product.image}
                price={product.price}
                rating={product.rating.rate}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OffersSpecialsWeek;
