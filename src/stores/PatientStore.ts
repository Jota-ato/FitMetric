import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ActivityFactorType, GenderType, GoalType, PurposeType } from '../types'
import { calculateBMR, calculateCaloriesNeeded, calculateTDEE } from '../logic/CaloriesCalculations'
import { calculateMacrosInGrams, type MacronutrientBreakdown } from '../logic/MacrosCalculations'

type PatientState = {
    name: string
    weight: number
    height: number
    age: number
    BMR: number
    TDEE: number
    caloriesNeeded: number
    sex: GenderType
    activityFactor: ActivityFactorType
    goal: GoalType
    purpose: PurposeType
    macros: MacronutrientBreakdown
    // Best Practice: Actions to update the state
    setPatientData: (data: Partial<Pick<PatientState, 'name' | 'weight' | 'height' | 'age' | 'sex' | 'activityFactor' | 'goal' | 'purpose'>>) => void
    /**
     * The 'data' parameter uses Partial and Pick to allow flexible updates
     * while protecting derived data (macros) and internal actions from 
     * accidental overrides.
     */
    calculateCalories: (stats: Pick<PatientState, 'weight' | 'height' | 'age' | 'sex' | 'activityFactor' | 'goal'>) => { BMR: number, TDEE: number, caloriesNeeded: number }
    calculateMacros: (caloriesNeeded: number, purpose: PurposeType) => MacronutrientBreakdown
}

export const usePatientStore = create<PatientState>()(
    persist(
        (set, get) => ({
            name: "",
            weight: 0,
            height: 0,
            age: 0,
            BMR: 0,
            TDEE: 0,
            caloriesNeeded: 0,
            sex: "Male",
            activityFactor: "Sedentary",
            goal: "Maintain Weight",
            purpose: "Gain Muscle",
            macros: {
                protein: 0,
                carbohydrate: 0,
                fat: 0
            },
            setPatientData: (data) => {
                /**
                 * Set patient data and calculate calories and macros
                 * Props:
                 * @param data - data object with name, weight, height, age, sex, activityFactor, goal or purpose
                 */
                const keys = Object.keys(data)
                if (keys.length === 1 && keys[0] === 'name') {
                    set(data)
                    return
                }
                const newState = { ...get(), ...data }
                const { BMR, TDEE, caloriesNeeded } = get().calculateCalories(newState)
                const macros = get().calculateMacros(caloriesNeeded, newState.purpose)
                console.log({ ...data, BMR, TDEE, caloriesNeeded, macros })
                set({ ...data, BMR, TDEE, caloriesNeeded, macros })
            },
            calculateCalories: (stats) => {
                /**
                 * Calculate all calores parameters
                 * Props:
                 * @param stats - stats object with weight, height, age, sex, activityFactor, goal
                 * Returns:
                 * @returns Object with BMR, TDEE and caloriesNeeded
                 */
                const { weight, height, age, sex, activityFactor, goal } = stats
                const BMR = calculateBMR(weight, height, age, sex)
                const TDEE = calculateTDEE(BMR, activityFactor)
                const caloriesNeeded = calculateCaloriesNeeded(TDEE, goal)
                return { BMR, TDEE, caloriesNeeded }
            },
            calculateMacros: (caloriesNeeded: number, purpose: PurposeType) => {
                /**
                 * Calculate macros in grams
                 * Props:
                 * @param caloriesNeeded - calories needed per day
                 * @param purpose - purpose type (Bulk, Maintain, Cut)
                 * Returns:
                 * @returns Object with macros in grams
                 */
                return calculateMacrosInGrams(caloriesNeeded, purpose)
            }
        }),
        {
            name: 'patient-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)