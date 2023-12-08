
let UrlBase = import.meta.env.VITE_APP_BASE_URL;
const shopSlug = "yavoycuba";
const UrlApiBase = UrlBase + "/api/v1";

export default {

  getGeneralData: async () => {
    let urlApi = "/settings";
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getHousesTypes: async () => {
    let urlApi = "/houses/types";
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getBooking: async (bookingCode) => {
    let urlApi = "/houses/book/view/"+bookingCode;
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getHouseDetailsForBooking: async (houseSlug) => {
    let urlApi = "/houses/book/"+houseSlug;
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getLocationData: async () => {
    let urlApi = "/location/provinces";
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },


  getLocationDataForHouses: async () => {
    let urlApi = "/location/houses/provinces";
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },


  getZones: async (restaurantId) => {
    let urlApi = "/location/zones/restaurant/"+restaurantId;
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getTropiapayCountries: async () => {
    let urlApi = "/payment/tropipay/countries";
    const request = await fetch(UrlApiBase + urlApi,{
      method:'POST',
      headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      }}
      );
    if (request) {
      return await request.json();
    }
  },


  getRestaurantInfoForCheckout: async (restaurantId) => {
    let urlApi = "/payment/checkout/"+restaurantId+"/location/provinces";
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getMunicipalities: async (provinceId) => {
    let urlApi = "/location/province/"+provinceId+"/municipalities";
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getZonesForHouses: async (provinceId) => {
    let urlApi = "/location/province/"+provinceId+"/zoneshouses";
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getRestaurants: async (locationId,type) => {

    let urlApi = "/restaurants/all/"+locationId+"/"+type;
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },
  getSearchResults: async (locationId) => {

    let urlApi = "/search/all/"+locationId;
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getHouses: async (locationId,type,filters) => {

    let urlApi = "/houses/all/"+locationId+"/"+type+"/"+filters;
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getRestaurantDetails: async (restaurantSlug) => {

    let urlApi = "/restaurants/view/"+restaurantSlug;
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getPromosRestaurants: async () => {

    let urlApi = "/promos/restaurants";
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getPromosHouses: async () => {

    let urlApi = "/promos/houses";
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },


  getHouseDetails: async (houseSlug) => {

    let urlApi = "/houses/view/"+houseSlug;
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getDataForCheckOut: async (restaurantId) => {

    let urlApi = "/payment/checkout/"+restaurantId;
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getCategories: async () => {
    let urlApi = "/products/categoriesres";
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  getProductDetails: async (itemSlug) => {

    let urlApi = "/products/view/"+itemSlug;
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },

  // getCategory: async (categorySlug) => {

  //   let urlApi = "/shops/front/" + shopSlug + "/" + categorySlug;

  //   const request = await fetch(UrlApiBase + urlApi);

  //   if (request) {
  //     if (request && request.status == 200) {
  //       return await request.json();
  //     }

  //     return request.message;
  //   }
  // },
  register: async (data) => {
    let urlApi = '/register';

    const request = await fetch(UrlApiBase  + urlApi, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if(request){

        return await request.json();
    }
  },


  newBook: async (data) => {
    let urlApi = '/houses/newbook';

    const request = await fetch(UrlApiBase  + urlApi, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if(request){

        return await request.json();
    }
  },

  userInfo: async (token) => {
    let urlApi = '/user/me';



    const request = await fetch(UrlApiBase  + urlApi, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    if(request){

        return await request.json();
    }
  },

  newOrder: async (data) => {
    let urlApi = '/payment/pay';

    const request = await fetch(UrlApiBase  + urlApi, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if(request){

        return await request.json();
    }
  },

  newBookingPayment: async (data) => {
    let urlApi = '/payment/booking';

    const request = await fetch(UrlApiBase  + urlApi, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if(request){

        return await request.json();
    }
  },

  // getAlbunByCategory: async (categorySlug) => {
  //   let urlApi = "/shops/front/" + shopSlug + "/" + categorySlug + "/album";

  //   const request = await fetch(UrlApiBase + urlApi);

  //   if (request) {
  //     if (request && request.status == 200) {
  //       return await request.json();
  //     }

  //     return request.message;
  //   }
  // },

  // getRandomPhotos: async () => {
  //   let urlApi = "/studiophotos/" + shopSlug + "/photos";

  //   const request = await fetch(UrlApiBase + urlApi);

  //   if (request) {
  //     if (request && request.status == 200) {
  //       return await request.json();
  //     }

  //     return request.message;
  //   }
  // },

  // getServicesByCategory: async (categorySlug) => {
  //   let urlApi = "/shops/front/" + shopSlug + "/" + categorySlug + "/services";

  //   const request = await fetch(UrlApiBase + urlApi);

  //   if (request) {
  //     if (request && request.status == 200) {
  //       return await request.json();
  //     }

  //     return request.message;
  //   }
  // },

  // getCategories: async (shopSlug) => {
  //   let urlApi = "/shops/front/" + shopSlug + "/services/categories";

  //   const request = await fetch(UrlApiBase + urlApi);
  //   if (request && request.status == 200) {
  //     return await request.json();
  //   } else {
  //     return "500";
  //   }
  // },

  // getProduct: async (productSlug) => {
  //   let urlApi = "/product/" + productSlug;

  //   const request = await fetch(UrlApiBase + urlApi);

  //   if (request && request.status == 200) {
  //     return await request.json();
  //   } else {
  //     return "500";
  //   }
  // },

  UrlBase,
  shopSlug,
};
