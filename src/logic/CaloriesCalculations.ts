/*
 * Basal Metabolic Rate
 */
import type { GenderType, ActivityFactorType, GoalType } from "../types"

const activityLevel: Record<ActivityFactorType, number> = {
    "Sedentary": 1.2,
    "Light": 1.375,
    "Moderate": 1.55,
    "Very": 1.725,
    "Extreme": 1.9
}

const genderFactor: Record<GenderType, number> = {
    "Male": 5,
    "Female": -161
}

export function calculateBMR(weight: number, height: number, age: number, sex: GenderType): number {
    /**
     * Calculate Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation
     * Props:
     * @param weight - weight in kilograms
     * @param height - height in centimeters
     * @param age - age in years
     * @param sex - gender
     * Returns:
     * @returns BMR in calories per day
     */
    const bmr = (10 * weight) + (6.25 * height) - (5 * age)
    return bmr + genderFactor[sex]
}

//  Total Daily Energy Expenditure
export function calculateTDEE(BMR: number, activityFactor: ActivityFactorType): number {
    /**
     * Calculate Total Daily Energy Expenditure (TDEE)
     * Props:
     * @param BMR - Basal Metabolic Rate in calories per day
     * @param activityFactor - activity factor
     * Returns:
     * @returns TDEE in calories per day
     */
    return BMR * activityLevel[activityFactor]
}

export function calculateCaloriesNeeded(TDEE: number, goal: GoalType): number {
    /**
    * Calculate calories needed based on goal
    * Props:
    * @param TDEE - Total Daily Energy Expenditure in calories per day
    * @param goal - goal type
    * Returns:
    * @returns calories needed in calories per day
    */
    switch (goal) {
        case "Lose Weight":
            return TDEE - 500
        case "Gain Weight":
            return TDEE + 500
        case "Maintain Weight":
            return TDEE
    }
}
