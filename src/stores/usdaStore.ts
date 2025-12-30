import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { USDAFoodService } from "../services/USDAFoodService";
import type { USDASFood, USDAFoodDetail } from "../types/usdaTypes";

type usdaStoreType = {
    foods: USDASFood[],
    activeFood: USDAFoodDetail | null,
    isLoading: boolean,
    searchFoods: (query: string) => Promise<void>
    getFoodById: (id: string) => Promise<void>
    resetFoods: () => void
}

export const usdaStore = create<usdaStoreType>()(
    devtools(
        (set) => ({
            foods: [],
            activeFood: null,
            isLoading: false,
            searchFoods: async (query: string) => {
                set({ isLoading: true })
                const foods = await USDAFoodService.searchFoods(query)
                set({ foods: foods.slice(0, 20) })
                set({ isLoading: false })
            },
            getFoodById: async (id: string) => {
                set({ isLoading: true })
                const food = await USDAFoodService.getFoodById(id)
                set({ activeFood: food })
                set({ isLoading: false })
            },
            resetFoods: () => {
                set({ foods: [] })
            }
        })
    )
)
