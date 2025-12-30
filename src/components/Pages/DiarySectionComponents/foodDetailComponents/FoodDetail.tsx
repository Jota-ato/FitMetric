// components/food/detail/FoodDetail.tsx

import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { usdaStore } from "../../../../stores/usdaStore"
import { getNutrients } from "../../../../helpers"
import { getAvailableUnits, convertUnit } from "../../../../helpers/unitConverter"
import FoodHeader from "./FoodHeader"
import NutritionSection from "./NutritionSection"
import CustomPortionCalculator from "./CustomPortionCalculator"
import { EmptyState, LoadingState } from "./EmptyState"

export default function FoodDetail() {
    const { activeFood, getFoodById, isLoading } = usdaStore()
    const params = useParams()

    // Estado para la porción personalizada
    const [portionSize, setPortionSize] = useState<number>(100)
    const [portionUnit, setPortionUnit] = useState<string>("g")

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

    // Obtener las unidades disponibles para el select
    const availableUnits = useMemo(() => {
        return getAvailableUnits(activeFood?.servingSizeUnit)
    }, [activeFood?.servingSizeUnit])

    // Calcular nutrientes por porción personalizada
    const customPortionNutrients = useMemo(() => {
        if (!activeFood || !nutrients || !portionSize) return null

        const baseSize = activeFood.servingSize ?? 100
        const baseUnit = activeFood.servingSizeUnit ?? "g"

        // Convertir la porción personalizada a la unidad base
        const portionInBaseUnit = convertUnit(portionSize, portionUnit, baseUnit)

        // Calcular el factor de multiplicación
        const factor = portionInBaseUnit / baseSize

        return {
            protein: nutrients.protein * factor,
            fat: nutrients.fat * factor,
            carbohydrate: nutrients.carbohydrate * factor,
            calories: nutrients.calories * factor
        }
    }, [activeFood, nutrients, portionSize, portionUnit])

    // Handlers para los cambios
    const handlePortionSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)
        setPortionSize(isNaN(value) ? 0 : value)
    }

    const handlePortionUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setPortionUnit(value)
    }

    return (
        <div className="w-[90%] max-w-440 h-[90%] mx-auto overflow-y-auto p-6 md:p-8 bg-surface">
            {activeFood && nutrients ? (
                <article className="space-y-6 animate-fadeIn">
                    <FoodHeader
                        description={activeFood.description}
                        brandOwner={activeFood.brandOwner}
                    />

                    <main className="space-y-6">
                        <NutritionSection
                            protein={nutrients.protein}
                            carbohydrate={nutrients.carbohydrate}
                            fat={nutrients.fat}
                            calories={nutrients.calories}
                            servingSize={activeFood.servingSize}
                            servingSizeUnit={activeFood.servingSizeUnit}
                        />

                        <CustomPortionCalculator
                            portionSize={portionSize}
                            portionUnit={portionUnit}
                            availableUnits={availableUnits}
                            nutrients={customPortionNutrients}
                            onPortionSizeChange={handlePortionSizeChange}
                            onPortionUnitChange={handlePortionUnitChange}
                        />
                    </main>
                </article>
            ) : isLoading ? (
                <LoadingState />
            ) : (
                <EmptyState />
            )}
        </div>
    )
}