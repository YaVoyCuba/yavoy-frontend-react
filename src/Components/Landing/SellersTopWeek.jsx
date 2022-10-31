import React, { useState, useEffect } from "react";
import CardSeller from "../Misc/CardSeller";

const SellersTopWeek = () => {
  const [sellers, setSellers] = useState([]);

  async function getSellers() {
    await fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((json) => setSellers(json));
  }

  useEffect(() => {
    getSellers();
  }, []);

  return (
    <div className="flex px-3 mb-20 flex-col">
      <h2 className="title pb-6">Principales proveedores de la semana</h2>
      <hr className="separator" />
      <div className="grid grid-cols-12">
        {sellers.slice(0, 4).map((seller) => {
          return (
          <div key={seller.id} className="col-span-6 p-1 lg:p-2 lg:col-span-3">
            <CardSeller  key={seller.id}  products={[{"id":1,"image": '/assets/img/monitor.png'},{"id":2,"image": '/assets/img/monitor.png'},{"id":3,"image": '/assets/img/monitor.png'}]} productsCount={77} logo='/assets/img/seller.png' cover="/assets/img/cover.png"  name={seller.name.firstname} />
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default SellersTopWeek;
