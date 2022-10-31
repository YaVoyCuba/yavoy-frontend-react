import React from "react";

const PromoWidget = (props) => {
  const { promoType } = props;

  return (
    <div className="px-3">
      {promoType === "widget1" ? (
        <div className="grid   lg:px-0 mb-12 grid-cols-12">
          <div className="col-span-12 mb-3 lg:mb-0 lg:col-span-8">
            <img
              className="object-cover lg:pr-3 "
              src="/assets/img/ropasqui.jpg"
              alt=""
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <div className="flex flex-col">
              <div className="">
                <img
                  className="img-cover  mb-3 lg:mb-0 lg:mb-7"
                  src="/assets/img/pc.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="img-cover"
                  src="/assets/img/accesorios.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      ) : promoType === "widget2" ? (
        <div className="grid  space-y-2 lg:space-y-0 mb-12 grid-cols-12">
          <div className="col-span-12 lg:col-span-4">
            <img className="img-cover" src="/assets/img/promo3.jpg" alt="" />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <img className="img-cover" src="/assets/img/promo4.jpg" alt="" />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <img className="img-cover" src="/assets/img/promo5.jpg" alt="" />
          </div>
        </div>
      ) : promoType === "widget3" ? (
        <div className="grid mb-12   grid-cols-12">
          <div className="col-span-12 lg:col-span-6">
            <img className="img-cover pr-2" src="/assets/img/promo7.jpg" alt="" />
          </div>
          <div className="col-span-12 pl-2 mt-2 lg:mt-0 lg:col-span-6">
            <img className="img-cover" src="/assets/img/promo8.jpg" alt="" />
          </div>
        </div>
      ) : promoType === "widget4" ? (
        <div className="grid mb-12 grid-cols-12">
          <div className="col-span-12 lg:col-span-12"> 
          <img className="img-cover" src="/assets/img/promo9.jpg" alt="" />
          </div> 
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PromoWidget;
