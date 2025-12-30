import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { FoodType } from "../types/DiaryTypes";

type usdaStoreType = {
    foods: FoodType[],
    searchFoods: (query: string) => void
}

export const usdaStore = create<usdaStoreType>()(
    devtools(
        () => ({
            foods: [],
            searchFoods: (query: string) => {
                console.log(query)
            }
        })
    )
)
