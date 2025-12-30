import axios from "axios"
import type { USDASearchResponse, USDASFood, USDAFoodDetail } from "../types/usdaTypes"
import { normalizeUnit } from "../helpers";

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
    searchFoods: async (query: string, page_size: number = 20): Promise<USDASFood[]> => {
        try {
            const { data } = await usdaClient.get<USDASearchResponse>('/foods/search', {
                params: {
                    query,
                    page_size
                }
            })
            return data.foods.map(food => ({ ...food, servingSizeUnit: normalizeUnit(food.servingSizeUnit) }))
        } catch (err) {
            console.log("Error fetching from USDA: ", err)
            throw err
        }
    },
    getFoodById: async (id: string): Promise<USDAFoodDetail> => {
        try {
            const { data } = await usdaClient.get<USDAFoodDetail>(`/food/${id}`)
            console.log(data)
            return { ...data, servingSizeUnit: normalizeUnit(data.servingSizeUnit) }
        } catch (err) {
            console.log("Error fetching from USDA: ", err)
            throw err
        }
    }
}
