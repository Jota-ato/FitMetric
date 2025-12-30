import type { GenderType, GoalType, PurposeType } from "../types";
import type { USDAFoodDetail } from "../types/usdaTypes";

export function translateGender(gender: GenderType) {
    return gender === "Male" ? "Hombre" : "Mujer"
}
export function translateGoal(goal: GoalType) {
    const goalsTranslation: Record<GoalType, string> = {
        "Gain Weight": "Ganar Peso",
        "Maintain Weight": "Mantener Peso",
        "Lose Weight": "Perder Peso"
    }
    return goalsTranslation[goal]
}

export function translatePurpose(purpose: PurposeType) {
    const purposesTranslation: Record<PurposeType, string> = {
        "Gain Muscle": "Ganar Musculo",
        "Maintain Muscle": "Mantener Musculo",
        "Lose Fat": "Perder Grasa"
    }
    return purposesTranslation[purpose]
}

export const normalizeUnit = (unit: string | undefined | null): string => {
    if (!unit) return "g";

    const cleanUnit = unit.toUpperCase().trim();

    const unitMap: Record<string, string> = {
        "GRM": "g",
        "G": "g",
        "GRAMS": "g",
        "GRAM": "g",
        "GR": "g",
        "MLT": "ml",
        "ML": "ml",
        "MILLILITERS": "ml",
        "MLR": "ml",
        "KCAL": "kcal",
        "OZA": "oz",
        "ONZ": "oz",
        "OZ": "oz",
        "LBR": "lb"
    };

    return unitMap[cleanUnit] || cleanUnit.toLowerCase();
}

interface MacronutrientBreakdown {
    protein: number
    fat: number
    carbohydrate: number
    calories: number
}

export function getNutrients(food: USDAFoodDetail): MacronutrientBreakdown {
    const nutreintsArray = food.foodNutrients.filter(nutrient => nutrient.nutrient.id === 1003 || nutrient.nutrient.id === 1004 || nutrient.nutrient.id === 1005 || nutrient.nutrient.id === 1008)

    const protein = nutreintsArray.find(n => n.nutrient.id === 1003)?.amount ?? 0
    const fat = nutreintsArray.find(n => n.nutrient.id === 1004)?.amount ?? 0
    const carbohydrate = nutreintsArray.find(n => n.nutrient.id === 1005)?.amount ?? 0
    const calories = nutreintsArray.find(n => n.nutrient.id === 1008)?.amount ?? 0

    return {
        protein,
        fat,
        carbohydrate,
        calories
    }
}