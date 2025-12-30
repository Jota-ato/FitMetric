// src/types/usdaTypes.ts (o dentro del mismo servicio si prefieres)

export type USDASFood = {
    fdcId: number;
    description: string;
    dataType: string;
    brandOwner?: string;
    foodNutrients: USDANutrient[];
    servingSize?: number;
    servingSizeUnit?: string;
}

export type USDANutrient = {
    nutrientId: number;
    nutrientName: string;
    value: number;
    unitName: string;
}

export type USDASearchResponse = {
    totalHits: number;
    foods: USDASFood[];
}