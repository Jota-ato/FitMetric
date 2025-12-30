// components/food/detail/NutritionSection.tsx

import MacrosGrid from "../MacrosGrid"

interface NutritionSectionProps {
    protein: number
    carbohydrate: number
    fat: number
    calories: number
    servingSizeUnit?: string
}

export default function NutritionSection({
    protein,
    carbohydrate,
    fat,
    calories,
    servingSizeUnit
}: NutritionSectionProps) {
    return (
        <section className="bg-surface-gray/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-accent">📊</span>
                Datos nutricionales
                <span className="text-sm font-normal text-muted ml-2">
                    (por 100{servingSizeUnit ? servingSizeUnit : "g"})
                </span>
            </h3>
            <MacrosGrid
                protein={protein}
                carbs={carbohydrate}
                fats={fat}
                calories={calories}
            />
        </section>
    )
}