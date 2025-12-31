import { useEffect, useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { usdaStore } from "../../../../stores/usdaStore"
import { getNutrients } from "../../../../helpers"
import { getAvailableUnits, convertUnit } from "../../../../helpers/unitConverter"
import FoodHeader from "./FoodHeader"
import NutritionSection from "./NutritionSection"
import CustomPortionCalculator from "./CustomPortionCalculator"
import { EmptyState, LoadingState } from "./EmptyState"
import { diaryStore } from "../../../../stores/DiaryStore"
import type { DiaryMealType } from "../../../../types/DiaryTypes"
import { usePageStore } from "../../../../stores/PageStore"

export default function FoodDetail() {
    // Hooks y Stores
    const { activeFood, getFoodById, isLoading } = usdaStore()
    const params = useParams()
    const navigate = useNavigate()
    const setHasModal = usePageStore(state => state.setHasModal)

    // Store del Diario
    const addFood = diaryStore(state => state.addFoodToMeal)
    const removeFood = diaryStore(state => state.removeFoodFromMeal)
    const editFood = diaryStore(state => state.editFoodInMeal)
    const isFoodInMeal = diaryStore(state => state.isFoodInMeal(activeFood?.fdcId ?? 0, params.mealType as DiaryMealType))

    const [portionSize, setPortionSize] = useState<number>(100)
    const [userSelectedUnit, setUserSelectedUnit] = useState<string>("")

    useEffect(() => {
        if (params.id) {
            getFoodById(params.id)
        }
    }, [params.id, getFoodById])

    const id = activeFood?.fdcId

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setUserSelectedUnit("")
        setPortionSize(100)
    }, [id])

    // 4. MEMOS (Cálculos)
    const nutrients = useMemo(() => {
        if (!activeFood) return null
        return getNutrients(activeFood)
    }, [activeFood])

    const availableUnits = useMemo(() => {
        return getAvailableUnits(activeFood?.servingSizeUnit)
    }, [activeFood?.servingSizeUnit])

    const currentUnit = useMemo(() => {
        if (userSelectedUnit) return userSelectedUnit
        if (availableUnits && availableUnits.length > 0) return availableUnits[0]
        return 'g'
    }, [userSelectedUnit, availableUnits])

    const customPortionNutrients = useMemo(() => {
        if (!activeFood || !nutrients || !portionSize) return null

        const USDA_BASE_AMOUNT = 100;
        const baseUnit = activeFood.servingSizeUnit ?? "g"

        // Usamos 'currentUnit' (la calculada arriba) para la conversión
        const portionInBaseUnit = convertUnit(portionSize, currentUnit, baseUnit)
        const factor = portionInBaseUnit / USDA_BASE_AMOUNT

        return {
            protein: nutrients.protein * factor,
            fat: nutrients.fat * factor,
            carbohydrate: nutrients.carbohydrate * factor,
            calories: nutrients.calories * factor
        }
    }, [activeFood, nutrients, portionSize, currentUnit])

    // 5. HANDLERS
    const handlePortionSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)
        setPortionSize(isNaN(value) ? 0 : value)
    }

    const handlePortionUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Aquí sí guardamos la selección explícita del usuario
        setUserSelectedUnit(e.target.value)
    }

    const handleAddFood = () => {
        if (!activeFood || !params.mealType) return

        const newMeal = {
            ...activeFood,
            portionSize,
            portionUnit: currentUnit, // Guardamos la unidad calculada final
        }

        if (!isFoodInMeal) {
            addFood(newMeal, params.mealType as DiaryMealType)
        } else {
            editFood(newMeal, params.mealType as DiaryMealType)
        }
        setHasModal(false)
        navigate(-2) // Regresa al diario cerrando el modal/pantalla
    }

    // 6. RENDER
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
                            portionUnit={currentUnit} // Pasamos la unidad calculada
                            availableUnits={availableUnits}
                            nutrients={customPortionNutrients}
                            onPortionSizeChange={handlePortionSizeChange}
                            onPortionUnitChange={handlePortionUnitChange}
                        />
                    </main>
                    <footer>

                        {isFoodInMeal ? (
                            <div className="flex flex-col md:flex-row gap-4">
                                <button
                                    className="w-full max-w-220 mx-auto bg-primary block rounded-lg     py-4 text-center text-white font-bold text-xl md:text-2xl cursor-pointer hover:bg-primary-hover hover:scale-105 transition-all duration-300"
                                    onClick={handleAddFood}
                                >
                                    Editar
                                </button>
                                <button
                                    className="w-full max-w-220 mx-auto bg-primary block rounded-lg py-4 text-center text-white font-bold text-xl md:text-2xl cursor-pointer hover:bg-primary-hover hover:scale-105 transition-all duration-300 "
                                    onClick={() => {
                                        removeFood(activeFood?.fdcId ?? 0, params.mealType as DiaryMealType)
                                        navigate(-2)
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>


                        ) : <button
                            className="w-full max-w-220 mx-auto bg-primary block rounded-lg py-4 text-center text-white font-bold text-xl md:text-2xl cursor-pointer hover:bg-primary-hover hover:scale-105 transition-all duration-300"
                            onClick={handleAddFood}
                        >
                            {isFoodInMeal ? "Editar" : "Añadir"}
                        </button>}
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