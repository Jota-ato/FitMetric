import axios from "axios"
import type { USDASearchResponse } from "../types/usdaTypes"

export const usdaClient = axios.create({
    baseURL: "https://api.nal.usda.gov/fdc/v1",
    params: {
        apiKey: import.meta.env.VITE_USDA_API_KEY,
        dataType: ['Foundation', 'SR Legacy', 'Branded']
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
            return data
        } catch (err) {
            console.log(err)
        }
    }
}
