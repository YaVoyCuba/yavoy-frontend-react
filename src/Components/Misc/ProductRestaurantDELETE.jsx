import React from "react";
import truncate from "truncate-html";
import apiManager from "../../api/apiManager";

const ProductRestaurant = (props) => {
  const product = props.product;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  truncate.setup({ stripTags: true, length: 77 });

 

  const cardStypePhotos = function (photos) {
    if (photos?.length > 0) {
      return {
        backgroundImage: `url('${apiManager.UrlBase + photos[0].photo}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "200px",
        width: "100%",
        cursor: "zoom-in",
        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
        ":hover": {
          transform: "scale(1.05)",
        },
      };
    }
  };

  return (
    <div>
        
   

      <div
        className={classNames(
          product.experience == "Y" ? "border-red-500 border-t-20" : "",
          " grid grid-cols-10 bg-gray-300 cursor-pointer m-3 h-32 "
        )}
      >
        {product.photos?.length > 0 && (
          <div
            className="col-span-4 bg-white bg-cover p-2"
            onClick={() =>
              openPhotos(
                product.photos[0]?.path_photo,
                JSON.stringify(product.photos)
              )
            }
            onMouseOver={(event) => zoom(event)}
            style={{
              backgroundImage: `url('${
                apiManager.UrlBase + product.photos[0].path_photo
              }')`,
            }}
          ></div>
        )}

        <div
          className="col-span-5   pt-1 flex  "
          style={cardStypePhotos(product.photos)}
        >
          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-700">
                {product.name}
              </span>
              <span className="text-md -mt-3 px-3 pb-5 color">
                {product.price.toFixed(2)} USD
              </span>
              <br />
              <button className="flex space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>{" "}
                <span> Descripción</span>
              </button>

              {/* <span
                className="text-sm font-bold text-gray-700"
                dangerouslySetInnerHTML={{ __html: truncate(product.description) }}
              ></span> */}
            </div>
          </div>
        </div>
      </div>

      {/* @if($product->photos->count()>0)
        <div className="col-span-4 bg-white bg-cover p-2"
           
            onmousemove="zoom(event)"
            style="background-image: url({{ $product->photos[0]->path_photo ?? '/assets/img/demo/demo7.jpg' }})">
            @if ($product->experience == 'Y')
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="h-6 shado bg-color text-white relative top-0 left-0 z-10 w-6" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            @endif
        </div>
        @endif */}

      {product.name}
    </div>
  );
};

export default ProductRestaurant;
