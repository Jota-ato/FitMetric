import z from "zod"

export const nutrientSchema = z.object({
    nutrientName: z.string(),
    unitName: z.string(),
    nutrientId: z.number(),
    value: z.number()
})

export const foodSchema = z.object({
    fdcId: z.number(),
    servingSize: z.number(),
    servingSizeUnit: z.string(),
    description: z.string(),
    brandOwner: z.string(),
    dataType: z.string(),
    foodNutrients: z.array(nutrientSchema),
})

