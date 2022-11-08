import { get, post } from "./api";

export default {
    getShopSlug : async (data) => post('shop/getSlugByDomain',null,data),
    getShopDetail: async (shopSlug) =>  await get(`shop/front/${shopSlug}`, null, null),
    getShopPaymentMethod: async(token, data) => await post('shops/payments/all', token, data),
    getShopCurrencies: async (shopSlug) => await get(`shop/front/currencies/byShop/${shopSlug}`, null, null),
    getShopDeliveryZones: async (shopSlug) => await get(`shops/${shopSlug}/zones`),
    getShopDeliveryAddress: async (shopSlug, localitie_id) => await get(`shops/${shopSlug}/services/delivery/${localitie_id}`)
    // getShopDetail: async (shopSlug) => {
    //     let urlRequest = `shop/front/${shopSlug}`
    //     try {
    //         const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
    //             // method:'POST',
    //             headers
    //         })
    //         if(request) {
    //             return await request.json()
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}