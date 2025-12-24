import type { MacronutrientType, PurpouseType } from "../types"

export const macrosValues: Record<MacronutrientType, number> = {
    "Protein": 4,
    "Carbohydrate": 4,
    "Fat": 9
}

// 50% carbs, 30% fat, 20% protein for bulking
// 40% carbs, 40% fat, 20% protein for maintaining
// 30% carbs, 40% fat, 30% protein for cutting

export const macrosRatios: Record<PurpouseType, Record<MacronutrientType, number>> = {
    "Bulk": {
        "Protein": 0.2,
        "Carbohydrate": 0.5,
        "Fat": 0.3
    },
    "Maintain": {
        "Protein": 0.2,
        "Carbohydrate": 0.4,
        "Fat": 0.4
    },
    "Cut": {
        "Protein": 0.3,
        "Carbohydrate": 0.3,
        "Fat": 0.4
    }
}

export interface MacronutrientBreakdown {
    protein: number;
    carbohydrate: number;
    fat: number;
}

export function calculateMacrosInGrams(calories: number, purpouse: PurpouseType): MacronutrientBreakdown {
    /**
     * Calculate the needed macros in grams based on the calories and the purpouse
     * Props:
     * @param calories - calories needed per day
     * @param purpouse - purpouse type (Bulk, Maintain, Cut)
     * Returns:
     * @returns Object with the macros in grams
     */
    return {
        protein: macrosRatios[purpouse]["Protein"] * calories / macrosValues["Protein"],
        carbohydrate: macrosRatios[purpouse]["Carbohydrate"] * calories / macrosValues["Carbohydrate"],
        fat: macrosRatios[purpouse]["Fat"] * calories / macrosValues["Fat"]
    }
}