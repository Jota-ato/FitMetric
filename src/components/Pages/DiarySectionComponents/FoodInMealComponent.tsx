
import { getNutrients } from "../../../helpers"
import type { FoodInMeal } from "../../../stores/DiaryStore"

interface FoodInMealComponentProps {
    food: FoodInMeal
}

export default function FoodInMealComponent({ food }: FoodInMealComponentProps) {

    const { calories, carbohydrate, fat, protein } = getNutrients(food)

    return (
        <article className="w-full max-w-220 mx-auto p-4 border border-surface-gray-dark rounded-xl space-y-4">
            <div className="flex justify-between border-b pb-4 border-surface-gray-dark">
                <div className="text-2xl md:text-3xl text-center">
                    <p className="font-bold">{food.description}</p>
                    <p className="text-secondary font-light">{food.portionSize}{food.portionUnit}</p>
                </div>
                <div>
                    <p className="text-2xl text-muted">Calorías</p>
                    <p className="text-3xl text-muted">{calories}</p>
                </div>
            </div>
            <div className="flex justify-evenly py-4 text-muted text-2xl">
                <p>Proteínas: <span className="font-bold">{protein}g</span></p>
                <p>Carbohidratos: <span className="font-bold">{carbohydrate}g</span></p>
                <p>Grasas: <span className="font-bold">{fat}g</span></p>
            </div>
        </article>
    )
}
