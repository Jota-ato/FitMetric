export type GenderType = "Male" | "Female"
export type ActivityFactorType = "Sedentary" | "Light" | "Moderate" | "Very" | "Extreme"
export type GoalType = "Lose Weight" | "Maintain Weight" | "Gain Weight"
export type MacronutrientType = "Protein" | "Carbohydrate" | "Fat"
export type PurposeType = "Bulk" | "Maintain" | "Cut"
export type RegistrationInputType = {
    label: string
    name: string
    placeholder: string
    type?: string
}