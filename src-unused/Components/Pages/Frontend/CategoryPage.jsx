import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CardProductVertical from "../../Components/Misc/CardProductVertical";

function CategoryPage(props) {
   useEffect(() => window.scrollTo(0, 0));
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [countProductToView, setCountProductToView] = useState(5);
  const [priceMax, setPriceMax] = useState(1000);
  const [priceMin, setPriceMin] = useState(0);

  function setPriceFilter(value) {
    let val = value.split(",");
    setPriceMin(Number(val[0]));
    setPriceMax(Number(val[1]));
  }

  async function getDataApi() {
    const data = await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }

  function validateProducts() {
    return products
      .slice(0, countProductToView)
      .filter(
        (product) => product.price < priceMax && product.price > priceMin
      );
  }

  useEffect(() => {
    getDataApi();
  }, []);

  return (
    <div>
      <div className="min-h-creen  mb-20 px-3 lg:px-14">
        <div className="flex  ">
          <img
            className="h-32 rounded-full w-32 shadow-xl"
            src="/assets/img/seller.png"
            alt=""
          />
          <div className="flex p-3 flex-col">
            <span className=" title">Vitra</span>
            <span className="  subtitle">80 productos</span>
          </div>
        </div>
        <div className="flex mt-10 justify-between">
          <div className="flex space-x-3">
            <select
              onChange={(e) => setPriceFilter(e.target.value)}
              className="input-text"
            >
              <option value="0,1000">Seleccionar precio</option>
              <option value="0,1000">0-1000</option>
              <option value="1000,5000">1000-5000</option>
              <option value="5000,15000">5000-15 000</option>
              <option value="5000,15000">15000-25 000</option>
              <option value="25000,50000">25000-50 000</option>
              <option value="50000,100000">50 000-100 000</option>
            </select>
          </div>
          <div className="flex">
            <div
              className="flex justify-content-center align-items-center "
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <span className="uppercase mr-3 ">Mostrando</span>
              <select
                onChange={(e) => setCountProductToView(e.target.value)}
                className="input-text"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4">
          {validateProducts().map((prod) => {
            return (
              <div key={prod.id} className="col-span-4 m-2 lg:col-span-1">
                <CardProductVertical
                  id={prod.id}
                  name={prod.title}
                  img={prod.image}
                  price={prod.price}
                  rating={prod.rating.rate}
                />
              </div>
            );
          })}
        </div>
        {validateProducts().length === 0 && (
          <div className="flex h-screen  justify-center">
            <span className="subtitle pt-20 text-center uppercase">
              No hay productos
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
