import React, { useState, useEffect } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import apiManager from "../../api/apiManager";
import { useParams } from "react-router-dom";
import { Loading } from "../../common/Loading";
import { DEFAULT_MSG_WARNING_CART } from '../../utils/constants.js';

const ProductDetailPage = (props) => {
  const { cart } = useSelector((state) => state.cart);

  const productExisted = (type) => {
    toast.warning(
        DEFAULT_MSG_WARNING_CART,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  //history
  useEffect(() => window.scrollTo(0, 0), []);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { itemSlug } = useParams();

  const productAdd = (type) => {
    toast.success(" Producto agregado!", {
      position: "top-center",
      autoClose: 100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const dispatch = useDispatch();

  async function getProduct() {
    const response = await apiManager.getProductDetails(itemSlug);
    if (response.code === "ok") {
      setProduct(response.product);
      response.product.photos.map((photo) => {
        console.log(photo);
        setPhotos((photos) => [
          ...photos,
          {
            original: apiManager.UrlBase + photo.path_photo,
            thumbnail: apiManager.UrlBase + photo.path_photo,
          },
        ]);
      });
    }

    setLoading(false);
  }
  useEffect(() => {
    getProduct();
  }, []);

  const navigate = useNavigate();

  //Function navigate back
  function goBack() {
    navigate("/restaurants/" + product.restaurant.slug);
  }
  const [tab, setTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(2);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="pb-32">
          <div className="mt-7">
            <button onClick={() => goBack()} className="pl-3 flex">
              <span className="text-gray-700 flex text-lg pt-3 pl-2">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                  />
                </svg>
                Anterior
              </span>
            </button>
          </div>
          <div className="grid  grid-cols-5">
            <div className="col-span-5 p-1 lg:col-span-5">
              <div className="col-span-5  grid mt-3 grid-cols-2">
                {photos.length > 0 && (
                  <div className="col-span-2 lg:col-span-1 mb-7 sm:mb-0  pl-3 pr-7">
                    <ImageGallery items={photos} />
                  </div>
                )}
                <div className="col-span-2 px-3 lg:px-0  lg:col-span-1">
                  <div className="flex  flex-col">
                    <div className="flex mt-3 text-xl">
                      <h1 className="font-bold"> {product.name}</h1>
                    </div>
                    <div className="flex mt-3  font-medium justify-between">
                      <span>CATEGORÍA: {product.category?.name}</span>
                    </div>
                    <div className="flex mt-3  font-medium justify-between">
                      <span>COMERCIO: {product.restaurant?.name}</span>
                    </div>
                    <span className="text-color font-bold text-4xl mt-3">
                      ${Number(product.price).toFixed(2)} usd
                    </span>

                    <span
                      className="font-medium text-lg py-2"
                      dangerouslySetInnerHTML={{
                        __html: product.description,
                      }}
                    ></span>
                    <hr className="w-100 my-4 bg-gray-500 h-0.5" />
                    <div className="flex " style={{ alignSelft: "center" }}>
                      <div className="flex border-2 py-1    border-gray-500 rounded-md w-2/7  pl-3 px-3">
                        <button
                          onClick={() =>
                            setQuantity(quantity === 1 ? 1 : quantity - 1)
                          }
                          className="mr-4 text-2xl"
                        >
                          -
                        </button>
                        <div
                          className="h-8 my-1  bg-black"
                          style={{ width: 1 }}
                        ></div>
                        <br />
                        <span className="text-2xl  font-bold px-2 mx-3">
                          {quantity}
                        </span>
                        <div
                          className="h-8  my-1  bg-black"
                          style={{ width: 1 }}
                        ></div>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="ml-2 text-2xl"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          let exist = cart?.find(
                            (item) => item.restaurantId !=  product.restaurant_id
                          );
                          if (exist) {
                            productExisted();
                          } else {
                            dispatch(
                              addToCart({
                                id: product.id,
                                slug: product.slug,
                                name: product.name,
                                price: product.price,
                                img:
                                  apiManager.UrlBase +
                                  product.photos[0]?.path_photo,
                                quantity: quantity,
                                restaurantId: product.restaurant_id,
                                restaurantName: product.restaurant.name,
                                restaurantSlug: product.restaurant.slug,
                              })
                            );
                            productAdd();
                          }


                        }}
                        className="btn-main p-1 px-2 ml-6"
                      >
                        Agregar al carrito
                      </button>
                    </div>
                    <hr className="w-100 my-4 bg-gray-500 h-0.5" />
                    {/* <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    <span className="pl-2 text-lg -mt-1 font-medium">
                      Agregar como favorito
                    </span>
                  </div> */}
                  </div>
                </div>
              </div>
              <div className="mt-7">
                <div className="block px-3 lg:px-0 lg:mx-14">
                  <div className="border-b border-gray-200">
                    <nav
                      className="-mb-px overflow-x-auto flex space-x-8"
                      aria-label="Tabs"
                    >
                      {/* <button
                    key={"description"}
                    onClick={() => setTab("description")}
                    className={classNames(
                      tab == "description"
                        ? "border-main text-gray-800"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                    )}
                  >
                    Descripción
                  </button> */}
                      {/* <button
                    key={"info"}
                    onClick={() => setTab("info")}
                    className={classNames(
                      tab == "info"
                        ? "border-main text-gray-800"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                    )}
                  >
                    Información adicional
                  </button> */}
                      {/*
                  <button
                    key={"send"}
                    onClick={() => setTab("send")}
                    className={classNames(
                      tab == "send"
                        ? "border-main text-gray-800"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                    )}
                  >
                    Envío y devoluciones
                  </button> */}

                      {/* <button
                    key={"comment"}
                    onClick={() => setTab("comment")}
                    className={classNames(
                      tab == "comment"
                        ? "border-main text-gray-800"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                    )}
                  >
                    Comentarios ()
                  </button> */}
                    </nav>
                  </div>
                  {/* {tab === "description" ? (
                  <div className=" p-3">
                    <span
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    ></span>
                  </div>
                ) : tab === "info" ? (
                  <div className=" p-3">
                    <span></span>
                  </div>
                ) : tab === "send" ? (
                  <div className=" p-3">
                    <span></span>
                  </div>
                ) : (
                  <div className=" p-3">
                    <span></span>
                  </div>
                )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
