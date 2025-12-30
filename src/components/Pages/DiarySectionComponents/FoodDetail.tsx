import { useEffect, useMemo } from "react"
import { useParams } from "react-router"
import { usdaStore } from "../../../stores/usdaStore"
import MacrosGrid from "./MacrosGrid"
import { getNutrients } from "../../../helpers"


export default function FoodDetail() {

    const { activeFood, getFoodById } = usdaStore()
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            getFoodById(params.id)
        }
    }, [params.id, getFoodById])

    // Calcular los nutrientes usando useMemo para optimizar
    const nutrients = useMemo(() => {
        if (!activeFood) return null
        return getNutrients(activeFood)
    }, [activeFood])

    return (
        <div className="w-[90%] max-w-440 h-[90%] mx-auto overflow-y-auto p-8 bg-surface-gray rounded-xl">
            {activeFood && nutrients ? (
                <article className="space-y-8">
                    <header>
                        <h2 className="text-4xl font-bold">{activeFood.description}</h2>
                        <p className="text-muted text-2xl">
                            {activeFood.brandOwner}
                        </p>
                    </header>
                    <main>
                        <h3 className="text-2xl font-bold">
                            Nutrición
                        </h3>
                        <MacrosGrid
                            protein={nutrients.protein}
                            carbs={nutrients.carbohydrate}
                            fats={nutrients.fat}
                            calories={nutrients.calories}
                        />
                    </main>
                </article>
            ) : (
                <p>No hay comida seleccionada</p>
            )}
        </div>
    )
}
