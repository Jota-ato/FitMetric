import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { usdaStore } from "../../../stores/usdaStore"
import MacrosGrid from "./MacrosGrid"
import { getNutrients } from "../../../helpers"

// Función helper para obtener las unidades disponibles
function getAvailableUnits(baseUnit?: string): string[] {
    if (!baseUnit) return ["1 unidad"]

    const lowerUnit = baseUnit.toLowerCase()

    // Si es gramos, mostrar kg y mg
    if (lowerUnit === "g") {
        return ["g", "kg", "mg"]
    }

    // Si es mililitros, mostrar litros
    if (lowerUnit === "ml") {
        return ["ml", "L"]
    }

    // Si es kilogramos, mostrar gramos
    if (lowerUnit === "kg") {
        return ["kg", "g", "mg"]
    }

    // Si es litros, mostrar mililitros
    if (lowerUnit === "l") {
        return ["L", "ml"]
    }

    // Si no hay conversión disponible, solo mostrar la unidad base
    return [baseUnit, "1 unidad"]
}

// Función para convertir entre unidades
function convertUnit(value: number, fromUnit: string, toUnit: string): number {
    if (fromUnit === toUnit) return value

    const lowerFrom = fromUnit.toLowerCase()
    const lowerTo = toUnit.toLowerCase()

    // Conversiones de peso
    if (lowerFrom === "g" && lowerTo === "kg") return value / 1000
    if (lowerFrom === "g" && lowerTo === "mg") return value * 1000
    if (lowerFrom === "kg" && lowerTo === "g") return value * 1000
    if (lowerFrom === "kg" && lowerTo === "mg") return value * 1000000
    if (lowerFrom === "mg" && lowerTo === "g") return value / 1000
    if (lowerFrom === "mg" && lowerTo === "kg") return value / 1000000

    // Conversiones de volumen
    if (lowerFrom === "ml" && lowerTo === "l") return value / 1000
    if (lowerFrom === "l" && lowerTo === "ml") return value * 1000

    return value
}

export default function FoodDetail() {

    const { activeFood, getFoodById } = usdaStore()
    const params = useParams()

    // Estado para la porción personalizada - el usuario ingresará estos valores
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
                    {/* Header con información del alimento */}
                    <header className="bg-linear-to-br from-accent/20 to-accent/5 p-6 rounded-2xl border border-accent/20 shadow-lg">
                        <h2 className="text-3xl md:text-4xl font-bold  mb-2 leading-tight">
                            {activeFood.description}
                        </h2>
                        {activeFood.brandOwner && (
                            <p className="text-muted text-lg md:text-xl flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-accent"></span>
                                {activeFood.brandOwner}
                            </p>
                        )}
                    </header>

                    <main className="space-y-6">
                        {/* Sección de nutrición base */}
                        <section className="bg-surface-gray/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="text-accent">📊</span>
                                Datos nutricionales
                                <span className="text-sm font-normal text-muted ml-2">
                                    (por {activeFood.servingSize ? activeFood.servingSize : "100"} {activeFood.servingSizeUnit ? activeFood.servingSizeUnit : "g"})
                                </span>
                            </h3>
                            <MacrosGrid
                                protein={nutrients.protein}
                                carbs={nutrients.carbohydrate}
                                fats={nutrients.fat}
                                calories={nutrients.calories}
                            />
                        </section>

                        {/* Sección de porción personalizada */}
                        <section className="bg-linear-to-br from-surface-gray to-surface-gray/30 p-6 rounded-2xl border border-accent/30 shadow-lg">
                            <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
                                <span className="text-accent">⚖️</span>
                                Calcular mi porción
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Tamaño de porción */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="portionSize"
                                        className="block text-sm font-semibold text-foreground/80 mb-1"
                                    >
                                        Tamaño de porción
                                    </label>
                                    <input
                                        type="number"
                                        id="portionSize"
                                        name="portionSize"
                                        value={portionSize}
                                        onChange={handlePortionSizeChange}
                                        min="0"
                                        step="0.1"
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-lg font-medium shadow-sm hover:shadow-md"
                                        placeholder="100"
                                    />
                                </div>

                                {/* Unidad de porción */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="portionUnit"
                                        className="block text-sm font-semibold text-foreground/80 mb-1"
                                    >
                                        Unidad
                                    </label>
                                    <select
                                        name="portionUnit"
                                        id="portionUnit"
                                        value={portionUnit}
                                        onChange={handlePortionUnitChange}
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-lg font-medium shadow-sm hover:shadow-md cursor-pointer"
                                    >
                                        {availableUnits.map((unit) => (
                                            <option key={unit} value={unit}>
                                                {unit}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Resultados de nutrientes personalizados */}
                            <div className="mt-6 bg-linear-gradient-to-br from-accent/15 via-accent/10 to-accent/5 p-5 rounded-xl border-2 border-accent/30 shadow-inner">
                                <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-accent-dark dark:text-accent">
                                    <span>🎯</span>
                                    Nutrientes en tu porción: {portionSize} {portionUnit}
                                </h4>
                                {customPortionNutrients ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {/* Calorías */}
                                        <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg text-center backdrop-blur-sm border border-accent/10 hover:scale-105 transition-transform duration-200">
                                            <p className="text-xs text-muted uppercase tracking-wide mb-1">Calorías</p>
                                            <p className="text-2xl font-bold text-accent">{customPortionNutrients.calories.toFixed(1)}</p>
                                            <p className="text-xs text-muted">kcal</p>
                                        </div>

                                        {/* Proteínas */}
                                        <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg text-center backdrop-blur-sm border border-blue-200/30 hover:scale-105 transition-transform duration-200">
                                            <p className="text-xs text-muted uppercase tracking-wide mb-1">Proteínas</p>
                                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{customPortionNutrients.protein.toFixed(1)}</p>
                                            <p className="text-xs text-muted">gramos</p>
                                        </div>

                                        {/* Carbohidratos */}
                                        <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg text-center backdrop-blur-sm border border-amber-200/30 hover:scale-105 transition-transform duration-200">
                                            <p className="text-xs text-muted uppercase tracking-wide mb-1">Carbohidratos</p>
                                            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{customPortionNutrients.carbohydrate.toFixed(1)}</p>
                                            <p className="text-xs text-muted">gramos</p>
                                        </div>

                                        {/* Grasas */}
                                        <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg text-center backdrop-blur-sm border border-rose-200/30 hover:scale-105 transition-transform duration-200">
                                            <p className="text-xs text-muted uppercase tracking-wide mb-1">Grasas</p>
                                            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{customPortionNutrients.fat.toFixed(1)}</p>
                                            <p className="text-xs text-muted">gramos</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-muted italic">Ingrese un tamaño de porción válido para ver los nutrientes</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </main>
                </article>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="text-6xl opacity-30">🍽️</div>
                    <p className="text-xl text-muted">No hay comida seleccionada</p>
                    <p className="text-sm text-muted/70">Selecciona un alimento para ver sus detalles nutricionales</p>
                </div>
            )}
        </div>
    )
}
