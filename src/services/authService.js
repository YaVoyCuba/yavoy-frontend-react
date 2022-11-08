import { BASE_URL, API_URL, creceShop_URL, post,get } from "./api";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const headersToken = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': ''
}

export default {
    register: async (data) => await post('register', null, data),
    login: async (data) => await post('login', null, data),
    getUser: async (token) => await get('user/me', token, null),
    logout: async (token) => await post('logout', token, null),
    forgotPassword: async (data) => await post('user/change/password/get-pin', null, data),
    resetPassword: async (data) => await post('user/forgot/password-user', null, data),
    sendCodeToEmail : async (data) => await post('shops/front/login/crecexdiez', null, data),
    checkPin: async (data) => await post('shops/front/login/check/crecexdiez', null, data),
    // register: async (data) => {
    //     let urlRequest = "register"
    //     try {
    //         const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
    //             method:'POST',
    //             body: JSON.stringify(data),
    //             headers,
    //         })
    //         if (request) {
    //             return await request.json()
    //         } 
    //     } catch (error) {
    //         throw new Error('error catch', error)
    //     }
    // },
    // login: async (data) => {
    //     let urlRequest = "login"
    //     try {
    //         const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
    //             method: 'POST',
    //             body: JSON.stringify(data),
    //             headers
    //         })
    //         if (request) {
    //             return await request.json()
    //         }
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // },
    // logout: async (token) => {
    //     let urlRequest = "logout"
    //     headersToken.Authorization = `Bearer ${token}`
    //     try {
    //         const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
    //             method: 'POST',
    //             body: JSON.stringify(token),
    //             headers: headersToken
    //         })
    //         if (request) {
    //             return await request.json()
    //         }
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // },
    // forgotPassword: async (data) => {
    //     let urlRequest = "user/change/password/get-pin"
    //     try {
    //         const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
    //             method: 'POST',
    //             body: JSON.stringify(data),
    //             headers
    //         })
    //         if (request) {
    //             return await request.json()
    //         }
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // },
    // resetPassword: async (data) => {
    //     let urlRequest = "user/forgot/password-user"
    //     try {
    //         const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
    //             method: 'POST',
    //             body: JSON.stringify(data),
    //             headers
    //         })
    //         if (request) {
    //             return await request.json()
    //         }
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // }
}