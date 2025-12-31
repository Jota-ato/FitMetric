
import { getNutrients } from "../../../helpers"
import type { FoodInMeal } from "../../../stores/DiaryStore"
import { useNavigate } from "react-router"
import { usePageStore } from "../../../stores/PageStore"
import type { DiaryMealType } from "../../../types/DiaryTypes"

interface FoodInMealComponentProps {
    food: FoodInMeal
    meal: DiaryMealType
}

export default function FoodInMealComponent({ food, meal }: FoodInMealComponentProps) {

    const { calories, carbohydrate, fat, protein } = getNutrients(food)
    const navigate = useNavigate()
    const setHasModal = usePageStore(state => state.setHasModal)

    const handleClickToEdith = () => {
        navigate(`/diary/${meal}/foodDetail/${food.fdcId}`)
        setHasModal(true)
    }

    return (
        <article className="w-full max-w-220 mx-auto p-4 border border-surface-gray-dark rounded-xl space-y-4 hover:scale-105 hover:border-primary tansition-all duration-300">
            <div
                className="flex justify-between gap-8 border-b pb-4 border-surface-gray-dark cursor-pointer"
                onClick={handleClickToEdith}
            >
                <div className="text-xl md:text-2xl">
                    <p className="font-bold">{food.description}</p>
                    <p className="text-secondary font-light">{food.portionSize}{food.portionUnit}</p>
                </div>
                <div>
                    <p className="text-xl text-muted">Calorías</p>
                    <p className="text-2xl text-muted">{calories}</p>
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
