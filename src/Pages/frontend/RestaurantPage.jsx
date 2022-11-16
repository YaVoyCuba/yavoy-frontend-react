import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiManager from "../../api/apiManager";
import CardProductHorizontal from "../../Components/Misc/CardProductHorizontal";
import CardProductVertical from "../../Components/Misc/CardProductVertical";
import ProductRestaurant from "../../Components/Misc/ProductRestaurantDELETE";
import { Loading } from "../../common/Loading";

function RestaurantPage() {
  useEffect(() => window.scrollTo(0, 0));
  const [loading, setLoading] = useState(true);
  const { restaurantSlug } = useParams();
  const [products, setProducts] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [countProductToView, setCountProductToView] = useState(5);
  const [priceMax, setPriceMax] = useState(1000);
  const [priceMin, setPriceMin] = useState(0);

  // function setPriceFilter(value) {
  //   let val = value.split(",");
  //   setPriceMin(Number(val[0]));
  //   setPriceMax(Number(val[1]));
  // }

  // function validateProducts() {
  //   return products
  //     .slice(0, countProductToView)
  //     .filter(
  //       (product) => product.price < priceMax && product.price > priceMin
  //     );
  // }

  async function getRestaurantDetails(restaurantSlug) {
    let json = await apiManager.getRestaurantDetails(restaurantSlug);
    if (json != 500) {
      if (json.code == "ok") {
        setRestaurant(json.restaurant);
      } else {
      }
    }
    setLoading(false);
  }
  useEffect(() => {
    getRestaurantDetails(restaurantSlug);
  }, [restaurantSlug]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen lg:pt-10">
          <div
            className="min-h-80 p-10 lg:pt-16 lg:px-20 lg:flex lg:flex-col   "
            style={{ backgroundImage: "url('/assets/img/fondo.webp')" }}
          >
            <div className="flex flex-col lg:flex-row justify-between flex-wrap">
              <div className="flex">
                <span className="inlinel-block h-14 w-14 rounded-full mr-3 overflow-hidden bg-gray-100">
                  <img
                    className="h-full w-full"
                    src={apiManager.UrlBase + restaurant.avatar}
                  />
                </span>
                <div className="flex flex-col">
                  <span className="text-2xl lg:text-4xl color font-medium uppercase">
                    {restaurant.name}
                  </span>
                  <span className="text-md color">{restaurant.address} </span>
                  <hr />
                  <span className="text-md color">
                    {restaurant.description}{" "}
                  </span>
                </div>
              </div>
              {restaurant.schedule && (
                <div>
                  <p className="color font-bold mt-7 ">
                    Servicio: {restaurant.schedule}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-y-auto ">
            <div className="grid grid-cols-1 pt-3  lg:mx-16 md:grid-cols-1">
              {restaurant.experiences?.length > 0 && (
                <div className="lg:grid lg:p-5  lg:grid-cols-3">
                  <div className="lg:col-span-1">
                    <span className="text-2xl ml-3 color mt-3 font-sans font-medium">
                      Experiencias YaVoy{" "}
                    </span>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="lg:grid lg:grid-cols-2">
                      {restaurant.experiences.map((exp) => {
                        if (exp.status == "active") {
                          return (
                            <div key={`exp--` + exp.id}>
                              <CardProductVertical
                                rating={4}
                                price={exp.price}
                                img={exp.photos[0]?.path_photo}
                                name={exp.name}
                                slug={exp.slug}
                                id={exp.id}
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              )}

              {restaurant.categories?.length > 0 &&
                restaurant.categories.map((category) => {
                  if (
                    category.products.filter((prod) => prod.status == "active")
                      .length > 0
                  ) {
                    return (
                      <div key={category.id}>
                        <div className="lg:grid mt-10 lg:p-5  lg:grid-cols-3">
                          <div className="lg:col-span-1">
                            <span className="text-2xl ml-3 color mt-3 font-sans font-medium">
                              {category.category.name}
                            </span>
                          </div>
                          <div className="lg:col-span-2">
                            <div className="lg:grid lg:grid-cols-2">
                              {category.products.map((product) => {
                                if (
                                  product.category_id == category.id &&
                                  product.status == "active"
                                ) {
                                  return (
                                    <div key={`product-` + product.id}>
                                      <CardProductVertical
                                        rating={4}
                                        price={product.price}
                                        img={product.photos[0]?.path_photo}
                                        name={product.name}
                                        slug={product.slug}
                                        id={product.id}
                                        restaurantId={product.restaurant_id}
                                      />

                                      {/* <ProductRestaurant product={product} /> */}
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );

  // <div className="min-h-creen  mb-20 px-3 lg:px-14">
  //   {console.log(restaurant)}
  //   <div className="flex  ">
  //     <img
  //       className="h-32 rounded-full w-32 shadow-xl"
  //       src="/assets/img/seller.png"
  //       alt=""
  //     />
  //     <div className="flex p-3 flex-col">
  //       <span className=" title">{restaurant.name}</span>
  //       <span className="  subtitle">80 productos</span>
  //     </div>
  //   </div>
  //   <div className="flex mt-10 justify-between">
  //     <div className="flex space-x-3">
  //       <select className="input-text">
  //         <option value="">Seleccionar categoría</option>
  //       </select>
  //       <select
  //         onChange={(e) => setPriceFilter(e.target.value)}
  //         className="input-text"
  //       >
  //         <option value="0,1000">Seleccionar precio</option>
  //         <option value="0,1000">0-1000</option>
  //         <option value="1000,5000">1000-5000</option>
  //         <option value="5000,15000">5000-15 000</option>
  //         <option value="5000,15000">15000-25 000</option>
  //         <option value="25000,50000">25000-50 000</option>
  //         <option value="50000,100000">50 000-100 000</option>
  //       </select>
  //     </div>
  //     <div className="flex">
  //       <div
  //         className="flex justify-content-center align-items-center "
  //         style={{ justifyContent: "center", alignItems: "center" }}
  //       >
  //         <span className="uppercase mr-3 ">Mostrando</span>
  //         <select
  //           onChange={(e) => setCountProductToView(e.target.value)}
  //           className="input-text"
  //         >
  //           <option value={5}>5</option>
  //           <option value={10}>10</option>
  //           <option value={15}>15</option>
  //         </select>
  //       </div>
  //     </div>
  //   </div>

  //   <div className="grid grid-cols-4">
  //     {validateProducts().map((prod) => {
  //       return (
  //         <div key={prod.id} className="col-span-4 m-2 lg:col-span-1">
  //           <CardProductVertical
  //             id={prod.id}
  //             name={prod.title}
  //             img={prod.image}
  //             price={prod.price}
  //             rating={prod.rating.rate}
  //           />
  //         </div>
  //       );
  //     })}
  //   </div>
  //   {validateProducts().length === 0 && (
  //     <div className="flex h-screen  justify-center">
  //       <span className="subtitle pt-20 text-center uppercase">
  //         No hay productos
  //       </span>
  //     </div>
  //   )}
  // </div>
}

export default RestaurantPage;
