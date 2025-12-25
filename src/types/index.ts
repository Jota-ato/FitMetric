export type GenderType = "Male" | "Female"
export type ActivityFactorType = "Sedentary" | "Light" | "Moderate" | "Very" | "Extreme"
export type GoalType = "Lose Weight" | "Maintain Weight" | "Gain Weight"
export type MacronutrientType = "Protein" | "Carbohydrate" | "Fat"
export type PurposeType = "Gain Muscle" | "Maintain Muscle" | "Lose Fat"
export type RegistrationInputType = {
    label: string
    name: string
    placeholder: string
    type?: string
}

export type RegistrationFields = {
    name: string
    age: number
    weight: number
    height: number
    sex: GenderType
}