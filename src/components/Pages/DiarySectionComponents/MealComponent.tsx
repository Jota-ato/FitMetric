import MacrosGrid from "./MacrosGrid"
import { useNavigate } from "react-router"
import { usePageStore } from "../../../stores/PageStore"
import type { DiaryMealType } from "../../../types/DiaryTypes"
import { diaryStore } from "../../../stores/DiaryStore"
import FoodInMealComponent from "./FoodInMealComponent"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface MealComponentProps {
    mealLabel: string
    mealType: DiaryMealType
}

export default function MealComponent({ mealLabel, mealType }: MealComponentProps) {

    const meals = diaryStore(state => state.meals)
    const { calories, protein, carbohydrate, fat } = diaryStore(state => state.macrosInMealTime[mealType])
    const [isOpen, setIsOpen] = useState(false)
    const setHasModal = usePageStore(state => state.setHasModal)
    const navigate = useNavigate()

    const handleEdithMealClick = () => {
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
                    onClick={handleEdithMealClick}
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
            {meals[mealType].length < 1 ?
                <p className="text-center text-xl md:text-2xl text-muted py-4 opacity-70">
                    No hay alimentos registrados
                </p> :
                isOpen ? (
                    <ChevronDown
                        className="mx-auto cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                ) : (
                    <ChevronUp
                        className="mx-auto cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                )
            }
            <div
                className={`
                    grid transition-[grid-template-rows] duration-500 ease-in-out
                    ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                `}
            >
                {/* Contenedor interno OBLIGATORIO con overflow-hidden */}
                <div className="overflow-hidden">
                    <div className="mt-6"> {/* Margen interno para que no se pegue al abrir */}
                        <div className="space-y-4">
                            {meals[mealType].map(food => (
                                <FoodInMealComponent
                                    key={food.fdcId}
                                    food={food}
                                    meal={mealType}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
