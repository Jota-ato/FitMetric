import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import type { ActivityFactorType, GenderType, GoalType, PurposeType } from '../types'
import { calculateBMR, calculateCaloriesNeeded, calculateTDEE } from '../logic/CaloriesCalculations'
import { calculateMacrosInGrams, type MacronutrientBreakdown } from '../logic/MacrosCalculations'

type PatientBasicInfo = {
    name: string
    weight: number
    height: number
    age: number
    sex: GenderType
}

type PatientAdvancedInfo = {
    activityFactor: ActivityFactorType
    goal: GoalType
    purpose: PurposeType
}

type PatientState = {
    basicInfo: PatientBasicInfo
    BMR: number
    TDEE: number
    caloriesNeeded: number
    advancedInfo: PatientAdvancedInfo
    macros: MacronutrientBreakdown
    // Best Practice: Actions to update the state
    setPatientData: (data: Partial<Pick<PatientState, 'basicInfo' | 'advancedInfo'>>) => void
    /**
     * The 'data' parameter uses Partial and Pick to allow flexible updates
     * while protecting derived data (macros) and internal actions from 
     * accidental overrides.
     */
    calculateCalories: (stats: Pick<PatientState, 'basicInfo' | 'advancedInfo'>) => { BMR: number, TDEE: number, caloriesNeeded: number }
    calculateMacros: (caloriesNeeded: number, purpose: PurposeType) => MacronutrientBreakdown
}

export const usePatientStore = create<PatientState>()(
    devtools(persist(
        (set, get) => ({
            basicInfo: {
                name: "",
                weight: 0,
                height: 0,
                age: 0,
                sex: "" as GenderType,
            },
            BMR: 0,
            TDEE: 0,
            caloriesNeeded: 0,
            advancedInfo: {
                activityFactor: "" as ActivityFactorType,
                goal: "" as GoalType,
                purpose: "" as PurposeType,
            },
            macros: {
                protein: 0,
                carbohydrate: 0,
                fat: 0
            },
            setPatientData: (data) => {
                // 1. Obtener estado actual y mezclar con los nuevos datos
                const currentBasic = get().basicInfo
                const currentAdvanced = get().advancedInfo

                const newBasicInfo = { ...currentBasic, ...(data.basicInfo || {}) }
                const newAdvancedInfo = { ...currentAdvanced, ...(data.advancedInfo || {}) }

                // Variables para los cálculos (inician con el valor actual o 0)
                let newBMR = get().BMR
                let newTDEE = get().TDEE
                let newCaloriesNeeded = get().caloriesNeeded
                let newMacros = get().macros

                // 2. CÁLCULO DE BMR (Solo requiere Info Básica)
                // Verificamos si los datos básicos mínimos existen y son válidos
                if (newBasicInfo.weight > 0 && newBasicInfo.height > 0 && newBasicInfo.age > 0 && newBasicInfo.sex) {
                    // Usamos la función helper que importaste al inicio del archivo
                    newBMR = calculateBMR(
                        newBasicInfo.weight,
                        newBasicInfo.height,
                        newBasicInfo.age,
                        newBasicInfo.sex
                    )
                }

                // 3. CÁLCULO DE TDEE (Requiere BMR ya calculado + Factor de Actividad)
                if (newBMR > 0 && newAdvancedInfo.activityFactor) {
                    newTDEE = calculateTDEE(newBMR, newAdvancedInfo.activityFactor)
                }

                // 4. CÁLCULO FINAL (Requiere TDEE + Objetivo y Propósito)
                if (newTDEE > 0 && newAdvancedInfo.goal && newAdvancedInfo.purpose) {
                    newCaloriesNeeded = calculateCaloriesNeeded(newTDEE, newAdvancedInfo.goal)
                    newMacros = calculateMacrosInGrams(newCaloriesNeeded, newAdvancedInfo.purpose)
                }

                // 5. Guardar todo el estado actualizado de una sola vez
                set({
                    basicInfo: newBasicInfo,
                    advancedInfo: newAdvancedInfo,
                    BMR: newBMR,
                    TDEE: newTDEE,
                    caloriesNeeded: newCaloriesNeeded,
                    macros: newMacros
                })
            },
            calculateCalories: (stats) => {
                /**
                 * Calculate all calores parameters
                 * Props:
                 * @param stats - stats object with weight, height, age, sex, activityFactor, goal
                 * Returns:
                 * @returns Object with BMR, TDEE and caloriesNeeded
                 */
                const { basicInfo: { weight, height, age, sex }, advancedInfo: { activityFactor, goal } } = stats
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
    ))