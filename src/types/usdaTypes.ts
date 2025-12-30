// src/types/usdaTypes.ts (o dentro del mismo servicio si prefieres)

export type NutrientId = {
    1003: "Protein",
    1004: "Carbohydrate, by difference",
    1005: "Total lipid(fat)",
    1006: "Energy"
}

export type USDASFood = {
    fdcId: number;
    description: string;
    dataType: string;
    brandOwner?: string;
    foodNutrients: USDANutrient[];
    servingSize?: number;
    servingSizeUnit?: string;
}

export type USDAFoodDetail = {
    fdcId: number;
    description: string;
    dataType: string;
    brandOwner?: string;
    foodNutrients: USDANutrientDetail[];
    servingSize?: number;
    servingSizeUnit?: string;
}

export type USDANutrient = {
    nutrientId: number;
    nutrientName: string;
    value: number;
    unitName: string;
}

export type USDANutrientDetail = {
    id: number;          // ID interno de este registro específico
    amount?: number;     // ¡LA CANTIDAD REAL! (Por 100g)
    // El objeto 'nutrient' es el que te dice QUÉ es
    nutrient: {
        id: number;      // ID moderno del nutriente (ej. 1003)
        number: string;  // ID clásico
        name: string;    // "Protein", "Energy", etc.
        rank?: number;
        unitName: string;// "g", "kcal", "mg"
    };
}

export type USDASearchResponse = {
    totalHits: number;
    foods: USDASFood[];
}