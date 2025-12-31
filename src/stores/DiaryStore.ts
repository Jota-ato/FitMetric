import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import type { DiaryMealType } from "../types/DiaryTypes"
import type { USDAFoodDetail } from "../types/usdaTypes"
import { getNutrients } from "../helpers"
import type { MacronutrientBreakdown } from "../logic/MacrosCalculations"

export type FoodInMeal = USDAFoodDetail & {
    portionSize: number
    portionUnit: string
}

type diaryStoreType = {
    diaryMeal: DiaryMealType
    meals: {
        [key in DiaryMealType]: FoodInMeal[]
    }
    macrosInMealTime: {
        [key in DiaryMealType]: MacronutrientBreakdown
    }
    isFoodInMeal: (id: number, meal: DiaryMealType) => boolean
    addFoodToMeal: (food: USDAFoodDetail, meal: DiaryMealType) => void
    editFoodInMeal: (food: FoodInMeal, meal: DiaryMealType) => void
    updateMacrosInMealTime: (meal: DiaryMealType) => void
}

export const diaryStore = create<diaryStoreType>()(
    devtools(
        persist(
            (set, get) => ({
                diaryMeal: "" as DiaryMealType,
                meals: {
                    Breakfast: [],
                    Lunch: [],
                    Dinner: [],
                    Snack: []
                },
                macrosInMealTime: {
                    Breakfast: { protein: 0, fat: 0, carbohydrate: 0, calories: 0 },
                    Lunch: { protein: 0, fat: 0, carbohydrate: 0, calories: 0 },
                    Dinner: { protein: 0, fat: 0, carbohydrate: 0, calories: 0 },
                    Snack: { protein: 0, fat: 0, carbohydrate: 0, calories: 0 }
                },
                isFoodInMeal: (id, meal) => {
                    const foodsInMealTime = get().meals[meal]
                    return foodsInMealTime.some(food => food.fdcId === id)
                },
                addFoodToMeal: (food, meal) => {
                    const foodsInMealTime = get().meals[meal]
                    const newFoodsInMealTime = [...foodsInMealTime, food]
                    set({ meals: { ...get().meals, [meal]: newFoodsInMealTime } })
                },
                editFoodInMeal: (food, meal) => {
                    const foodsInMealTime = get().meals[meal]
                    const newFoodsInMealTime = foodsInMealTime.map(foodInMeal => foodInMeal.fdcId === food.fdcId ? food : foodInMeal)
                    set({ meals: { ...get().meals, [meal]: newFoodsInMealTime } })
                },
                updateMacrosInMealTime: (meal) => {
                    const foodsInMealTime = get().meals[meal]
                    const macrosSum = foodsInMealTime.reduce((acc, food) => {
                        const { protein, fat, carbohydrate, calories } = getNutrients(food)
                        return {
                            protein: acc.protein + protein,
                            fat: acc.fat + fat,
                            carbohydrate: acc.carbohydrate + carbohydrate,
                            calories: acc.calories + calories
                        }
                    }, { protein: 0, fat: 0, carbohydrate: 0, calories: 0 })
                    console.log(macrosSum)
                    set({ macrosInMealTime: { ...get().macrosInMealTime, [meal]: macrosSum } })
                }
            }),
            {
                name: "diaryStore",
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
)
