import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { usdaStore } from "../../../../stores/usdaStore"
import { getNutrients } from "../../../../helpers"
import { getAvailableUnits, convertUnit } from "../../../../helpers/unitConverter"
import FoodHeader from "./FoodHeader"
import NutritionSection from "./NutritionSection"
import CustomPortionCalculator from "./CustomPortionCalculator"
import { EmptyState, LoadingState } from "./EmptyState"
import { diaryStore } from "../../../../stores/DiaryStore"
import type { DiaryMealType } from "../../../../types/DiaryTypes"
import { useNavigate } from "react-router"
import { usePageStore } from "../../../../stores/PageStore"

export default function FoodDetail() {
    const { activeFood, getFoodById, isLoading } = usdaStore()
    const params = useParams()
    const setHasModal = usePageStore(state => state.setHasModal)
    const navigate = useNavigate()

    // Estado para la porción personalizada
    const addFood = diaryStore(state => state.addFoodToMeal)
    const [portionSize, setPortionSize] = useState<number>(100)
    const [portionUnit, setPortionUnit] = useState<string>("g")

    useEffect(() => {
        if (params.id) {
            getFoodById(params.id)
        }
    }, [params.id, getFoodById])

    const handleAddFood = () => {
        if (!activeFood || !params.mealType) return
        const newMeal = {
            ...activeFood,
            portionSize,
            portionUnit,
        }
        addFood(newMeal, params.mealType as DiaryMealType)
        navigate(-2)
        setHasModal(false)
    }

    const nutrients = useMemo(() => {
        if (!activeFood) return null
        return getNutrients(activeFood)
    }, [activeFood])

    const availableUnits = useMemo(() => {
        return getAvailableUnits(activeFood?.servingSizeUnit)
    }, [activeFood?.servingSizeUnit])

    const customPortionNutrients = useMemo(() => {
        if (!activeFood || !nutrients || !portionSize) return null

        const USDA_BASE_AMOUNT = 100;
        const baseUnit = activeFood.servingSizeUnit ?? "g"
        const portionInBaseUnit = convertUnit(portionSize, portionUnit, baseUnit)
        const factor = portionInBaseUnit / USDA_BASE_AMOUNT

        return {
            protein: nutrients.protein * factor,
            fat: nutrients.fat * factor,
            carbohydrate: nutrients.carbohydrate * factor,
            calories: nutrients.calories * factor
        }
    }, [activeFood, nutrients, portionSize, portionUnit])

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
                    <footer>
                        <button
                            className="w-full max-w-220 mx-auto bg-primary block rounded-lg py-4 text-center text-white font-bold text-xl md:text-2xl cursor-pointer hover:bg-primary-hover hover:scale-105 transition-all duration-300"
                            onClick={handleAddFood}
                        >
                            Añadir
                        </button>
                    </footer>
                </article>
            ) : isLoading ? (
                <LoadingState />
            ) : (
                <EmptyState />
            )}
        </div>
    )
}