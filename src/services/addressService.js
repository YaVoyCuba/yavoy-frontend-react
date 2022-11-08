import {apiCall, BASE_URL, del, post} from "./api";

const headersToken = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': ''
}

export default {
    getUserAddress: async (token) => await post('user/addresses', token, null),
    removeUserAddress: async(token, data) => await del('user/addresses/delete', token, data),
    addAddress: async(token, data) => await post('user/addresses/new', token, data),
    editAddress: async (token, data) => await post('user/addresses/edit', token, data),
    getAddressesByShop: async (token, data) => await post('user/addresses/byShop', token, data)
    // getUserAddress: async (token) => {
    //     let urlRequest = 'user/addresses'
    //     headersToken.Authorization = `Bearer ${token}`
    //     try {
    //         const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
    //             method: 'POST',
    //             headers: headersToken
    //         })
    //         if (request) {
    //             return await request.json()
    //         }
    //     } catch (error) {
    //         throw new Error('Error de conexión', error)
    //     }
    // },
    
    // removeUserAddress: async (token, address_id) => {
    //     let urlRequest = 'user/addresses/delete'
    //     headersToken.Authorization = `Bearer ${token}`
    //     try {
    //         const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
    //             method: 'DELETE',
    //             body: JSON.stringify(address_id),
    //             headers: headersToken
    //         })
    //         if (request) {
    //             return await request.json()
    //         }
    //     } catch (error) {
    //         throw new Error('Error de conexión', error)
    //     }
    // },
    
    // addAddress: async(token, data) => {
    //     let urlRequest = 'user/addresses/new'
    //     headersToken.Authorization = `Bearer ${token}`
    //     try {
    //         const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
    //             method: 'POST',
    //             body: JSON.stringify(data),
    //             headers: headersToken
    //         })
    //         if (request) {
    //             return await request.json()
    //         }
    //     } catch (error) {
    //         throw new Error('Error de conexión', error)
    //     }
    // },
    
    
    // getAddressesByShop: async(token, data) => {
    //     let urlRequest = 'user/addresses/byShop'
    //     headersToken.Authorization = `Bearer ${token}`
    //     try {
    //         const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
    //             method: 'POST',
    //             body: JSON.stringify(data),
    //             headers: headersToken
    //         })
    //         if (request) {
    //             return await request.json()
    //         }
    //     } catch (error) {
    //         throw new Error('Error de conexión', error)
    //     }
    // }
}