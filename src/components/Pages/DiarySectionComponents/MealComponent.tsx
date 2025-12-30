import MacrosGrid from "./MacrosGrid"
import { useNavigate } from "react-router"
import { usePageStore } from "../../../stores/PageStore"

interface MealComponentProps {
    mealName: string
}

export default function MealComponent({ mealName }: MealComponentProps) {

    const setHasModal = usePageStore(state => state.setHasModal)
    const navigate = useNavigate()
    const handleMealClick = () => {
        navigate(`/diary/searchFood`)
        setHasModal(true)
    }

    return (
        <article className="bg-surface p-8 rounded-xl border border-surface-">
            <header className="flex justify-between items-center border-b border-surface-gray-dark pb-4">
                <h2 className="text-4xl font-bold">{mealName}</h2>
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
                    calories={0}
                    protein={0}
                    carbs={0}
                    fats={0}
                />
            </div>
            <div>
                <h3>comidas</h3>
            </div>
        </article>
    )
}
