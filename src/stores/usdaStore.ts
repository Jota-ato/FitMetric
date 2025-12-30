import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { USDAFoodService } from "../services/USDAFoodService";
import type { USDASFood } from "../types/usdaTypes";

type usdaStoreType = {
    foods: USDASFood[],
    isLoading: boolean,
    searchFoods: (query: string) => Promise<void>
}

export const usdaStore = create<usdaStoreType>()(
    devtools(
        (set) => ({
            foods: [],
            isLoading: false,
            searchFoods: async (query: string) => {
                set({ isLoading: true })
                const foods = await USDAFoodService.searchFoods(query)
                set({ foods: foods.slice(0, 20) })
                set({ isLoading: false })
            }
        })
    )
)
