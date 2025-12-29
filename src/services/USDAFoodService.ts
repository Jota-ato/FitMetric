import axios from "axios"
import type { USDASearchResponse } from "../types/usdaTypes"

export const usdaClient = axios.create({
    baseURL: "https://api.nal.usda.gov/fdc/v1",
    params: {
        api_key: import.meta.env.VITE_USDA_API_KEY,
        dataType: ['Foundation', 'SR Legacy', 'Branded']
    },
    paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();

        for (const key in params) {
            const value = params[key];
            if (Array.isArray(value)) {
                // Si es un array, repetimos la clave por cada valor (dataType=A&dataType=B)
                value.forEach(v => searchParams.append(key, v));
            } else if (value !== undefined && value !== null) {
                // Si es un valor simple, lo agregamos normal
                searchParams.append(key, value.toString());
            }
        }

        return searchParams.toString();
    }
})

export const USDAFoodService = {
    searchFoods: async (query: string, page_size: number = 20) => {
        try {
            const { data } = await usdaClient.get<USDASearchResponse>('/foods/search', {
                params: {
                    query,
                    page_size
                }
            })
            console.log(data)
        } catch (err) {
            console.log("Error fetching from USDA: ", err)
            throw err
        }
    }
}
