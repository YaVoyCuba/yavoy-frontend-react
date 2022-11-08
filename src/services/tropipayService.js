import { BASE_URL, headers, headersToken, post } from "./api";

export default {
    getShopTropipayStatus: async(token, data) => await post('shops/payments/validate', token, data),
    getUserMethodPayment: async (token, data) => await post('shops/payments/get/user', token, data),
    getCounties: async (token) => await post('shops/payments/pay/tropipay/getUbications', token)
    // getShopTropipayStatus: async (token, data) => {
    //     let urlRequest = 'shops/payments/validate'
    //     headersToken.Authorization = `Bearer ${token}`
    //     try {
    //         const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
    //             method:'POST',
    //             body: JSON.stringify(data),
    //             headers: headersToken
    //         })
    //         if(request) {
    //             return await request.json()
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    // getUserMethodPayment: async (token, data) => {
    //     let urlRequest = 'shops/payments/get/user'
    //     headersToken.Authorization = `Bearer ${token}`
    //     try {
    //         const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
    //             method:'POST',
    //             headers: headersToken
    //         })
    //         if(request) {
    //             return await request.json()
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}