import {BASE_URL, post, postFormData} from './api'

const headersToken = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': ''
}

export default {
    addOrder: async (token, data) => await post('shops/payments/pay', token, data),
    addOrderPaymentMethodManual: async (token, data) => await postFormData('shops/payments/pay', token, data),
    cancelOrder: async (token, order_id) => {
        let urlRequest = 'shops/orders/cancel'
        headersToken.Authorization = `Bearer ${token}`
        try {
            const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
                method:'POST',
                body: JSON.stringify({order_id}),
                headers: headersToken,
            })
            if (request) {
                return await request.json()
            }
        } catch (error) {
            throw new Error('error catch', error)
        }
    },
    getOrders: async (token, shopSlug) => {
        let urlRequest = `shops/front/orders/${shopSlug}`
        headersToken.Authorization = `Bearer ${token}`
        try {
            const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
                method:'POST',
                // body: JSON.stringify({shopSlug}),
                headers: headersToken,
            })
            if (request) {
                return await request.json()
            } 
        } catch (error) {
            throw new Error('error catch', error)
        }
    },
    getOrderById: async (token, order_id) => {
        let urlRequest = 'shops/orders/view'
        headersToken.Authorization = `Bearer ${token}`
        try {
            const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
                method:'POST',
                body: JSON.stringify({order_id}),
                headers: headersToken,
            })
            if (request) {
                return await request.json()
            }
        } catch (error) {
            throw new Error('error catch', error)
        }
    }
}