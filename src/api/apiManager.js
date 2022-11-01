//const UrlBase = "https://crecexdiez.com";
const UrlBase = "http://127.0.0.1:8000";
const UrlApiBase = UrlBase + "/api/v1";
const shopSlug = "corazon-de-fotografo";

export default {

  getGeneralData: async () => {
    let urlApi = "/settings";
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

  getZones: async (restaurantId) => {
    let urlApi = "/location/zones/restaurant/"+restaurantId;
    const request = await fetch(UrlApiBase + urlApi);
    if (request) {
      return await request.json();
    }
  },
  getTropiapayCountries: async () => {
    let urlApi = "/payment/tropipay/countries";
    const request = await fetch(UrlApiBase + urlApi);
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
  
  getRestaurants: async (locationId,type) => {
    
    let urlApi = "/restaurants/all/"+locationId+"/"+type;
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

  getProductDetails: async (productSlug) => {
    
    let urlApi = "/products/view/"+productSlug;
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
