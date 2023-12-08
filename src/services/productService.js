import { creceShop_URL } from "./api";


export default {
    getProductsByShop: async(shopSlug) => {
        let urlRequest = `products/${shopSlug}`
        try {
            const request = await fetch(`${creceShop_URL}${urlRequest}`, {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            if (request) {
                return await request.json()
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    getShopCategories: async(shopSlug) => {
        let urlRequest = `categories/${shopSlug}/categories`
        try {
            const request = await fetch(`${creceShop_URL}${urlRequest}`, {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            if (request) {
                return await request.json()
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    getProductBySlug: async(itemSlug) => {
        let urlRequest = `product/${itemSlug}`
        try {
            const request = await fetch(`${creceShop_URL}${urlRequest}`, {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            if (request) {
                return await request.json()
            }
        } catch (error) {
            // TODO: done
            console.log(error)
        }
    }
}
