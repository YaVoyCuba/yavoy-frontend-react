import { BASE_URL } from "./api";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export default {
    getProvinces: async() => {
        let urlRequest = 'shops/provinces'
        try {
            const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
                // method:'POST',
                headers
            })
            if(request) {
                return await request.json()
            }
        } catch (error) {
            throw new Error('Error de conexión', error)
        }
    }, 
    getMunicipalitiesByProvinces: async(province_id) => {
        let urlRequest = `shops/municipalities/${province_id}`
        try {
            const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
                // method:'POST',
                headers
            })
            if(request) {
                return await request.json()
            }
        } catch (error) {
            throw new Error('Error de conexión', error)
        }
    },
    getLocalitiesByMunicipalities: async(municipalitie_id) => {
        let urlRequest = `shops/localities/${municipalitie_id}`
        try {
            const request = await fetch(`${BASE_URL}/api/v1/${urlRequest}`, {
                // method:'POST',
                headers
            })
            if(request) {
                return await request.json()
            }
        } catch (error) {
            throw new Error('Error de conexión', error)
        }
    }
}