import type { GenderType, GoalType, PurposeType } from "../types";

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