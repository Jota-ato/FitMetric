import z from "zod"
import { foodSchema, nutrientSchema } from "../schemas"

export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack"
export type NutrientType = z.infer<typeof nutrientSchema>
export type FoodType = z.infer<typeof foodSchema>