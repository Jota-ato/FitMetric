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

type MacronutrientBreakdownInMeal = MacronutrientBreakdown & {
    calories: number
}

type diaryStoreType = {
    diaryMeal: DiaryMealType
    meals: {
        [key in DiaryMealType]: FoodInMeal[]
    }
    macrosInMealTime: {
        [key in DiaryMealType]: MacronutrientBreakdownInMeal
    }
    isFoodInMeal: (id: number, meal: DiaryMealType) => boolean
    addFoodToMeal: (food: USDAFoodDetail, meal: DiaryMealType) => void
    editFoodInMeal: (food: FoodInMeal, meal: DiaryMealType) => void
    updateMacrosInMealTime: (meal: DiaryMealType) => MacronutrientBreakdown
    removeFoodFromMeal: (id: number, meal: DiaryMealType) => void
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
                    console.log(food)
                    const foodsInMealTime = get().meals[meal]
                    const newFoodsInMealTime = [...foodsInMealTime, food]
                    const newMacros = get().updateMacrosInMealTime(meal)
                    set({ meals: { ...get().meals, [meal]: newFoodsInMealTime }, macrosInMealTime: { ...get().macrosInMealTime, [meal]: newMacros } })
                },
                editFoodInMeal: (food, meal) => {
                    const foodsInMealTime = get().meals[meal]
                    const newFoodsInMealTime = foodsInMealTime.map(foodInMeal => foodInMeal.fdcId === food.fdcId ? food : foodInMeal)
                    const newMacros = get().updateMacrosInMealTime(meal)
                    set({ meals: { ...get().meals, [meal]: newFoodsInMealTime }, macrosInMealTime: { ...get().macrosInMealTime, [meal]: newMacros } })
                },
                removeFoodFromMeal: (id, meal) => {
                    const foodsInMealTime = get().meals[meal]
                    const newFoodsInMealTime = foodsInMealTime.filter(food => food.fdcId !== id)
                    const newMacros = get().updateMacrosInMealTime(meal)
                    set({ meals: { ...get().meals, [meal]: newFoodsInMealTime }, macrosInMealTime: { ...get().macrosInMealTime, [meal]: newMacros } })
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
                    return macrosSum
                }
            }),
            {
                name: "diaryStore",
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
)
