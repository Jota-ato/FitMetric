import MacrosGrid from "./MacrosGrid"
import { useNavigate } from "react-router"
import { usePageStore } from "../../../stores/PageStore"
import type { DiaryMealType } from "../../../types/DiaryTypes"
import { diaryStore } from "../../../stores/DiaryStore"
import FoodInMealComponent from "./FoodInMealComponent"

interface MealComponentProps {
    mealLabel: string
    mealType: DiaryMealType
}

export default function MealComponent({ mealLabel, mealType }: MealComponentProps) {

    const meals = diaryStore(state => state.meals)
    const { calories, protein, carbohydrate, fat } = diaryStore(state => state.macrosInMealTime[mealType])
    const setHasModal = usePageStore(state => state.setHasModal)
    const navigate = useNavigate()
    const handleMealClick = () => {
        navigate(`/diary/${mealType}/searchFood`)
        setHasModal(true)
    }


    return (
        <article className="bg-surface p-8 rounded-xl border border-surface-">
            <header className="flex justify-between items-center border-b border-surface-gray-dark pb-4">
                <h2 className="text-4xl font-bold">{mealLabel}</h2>
                <button
                    className="bg-secondary hover:bg-secondary-hover text-text-main px-8 py-4 rounded-xl text-xl font-bold cursor-pointer transition-all duration-300"
                    type="button"
                    onClick={handleMealClick}
                >
                    Agregar comida
                </button>
            </header>
            <div className="flex flex-col gap-4 mt-4">
                <MacrosGrid
                    calories={calories}
                    protein={protein}
                    carbs={carbohydrate}
                    fats={fat}
                />
            </div>
            <div>
                {
                    meals[mealType].length ?
                        <div className="space-y-4">
                            {meals[mealType].map(food => (
                                <FoodInMealComponent
                                    food={food}
                                />
                            ))}
                        </div>
                        :
                        <p className="text-center text-xl md:text-2xl text-muted">No hay comidas</p>
                }
            </div>
        </article>
    )
}
