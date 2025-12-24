import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ActivityFactorType, GenderType, GoalType, PurposeType } from '../types'

type PatientState = {
    name: string
    weight: number
    height: number
    age: number
    sex: GenderType
    activityFactor: ActivityFactorType
    goal: GoalType
    purpose: PurposeType
    macros: {
        protein: number
        carbohydrate: number
        fat: number
    }
    // Best Practice: Actions to update the state
    setPatientData: (data: Partial<Omit<PatientState, 'macros' | 'setPatientData'>>) => void
    /**
     * The 'data' parameter uses Partial and Omit to allow flexible updates
     * while protecting derived data (macros) and internal actions from 
     * accidental overrides.
     */
}

export const usePatientStore = create<PatientState>()(
    persist(
        (set) => ({
            name: "",
            weight: 0,
            height: 0,
            age: 0,
            sex: "Male",
            activityFactor: "Sedentary",
            goal: "Maintain Weight",
            purpose: "Bulk",
            macros: {
                protein: 0,
                carbohydrate: 0,
                fat: 0
            },
            setPatientData: (data) => set((state) => ({ ...state, ...data }))
        }),
        {
            name: 'patient-storage', // Unique name for localStorage key
            storage: createJSONStorage(() => localStorage) // Correct way to define storage
        }
    )
)