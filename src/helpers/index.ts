import type { GenderType } from "../types";

export function translateGender(gender: GenderType) {
    return gender === "Male" ? "Hombre" : "Mujer"
}