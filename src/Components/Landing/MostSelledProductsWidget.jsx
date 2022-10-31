import React, { useState, useEffect } from "react";
import CardProductVertical from "../Misc/CardProductVertical";

const MostSelledProductsWidget = () => {
  const [mostSelled, setMostSelled] = useState([]);

  async function getDataApi() {
    const data = await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setMostSelled(json));
  }

  useEffect(() => {
    getDataApi();
  }, []);

  return (
    <div>
      <div className="flex px-3 mb-20 flex-col">
        <h2 className="title pb-6">Más vendidos</h2>
        <hr className="separator" />

        <div className="grid grid-cols-6">
          {mostSelled.splice(0,6).map((product) => {
            return (
              <div key={product.id} className="col-span-3 m-1 lg:m-2 lg:col-span-1">
                <CardProductVertical
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
    </div>
  );
};

export default MostSelledProductsWidget;
