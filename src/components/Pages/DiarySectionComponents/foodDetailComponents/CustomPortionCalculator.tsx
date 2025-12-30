// components/food/detail/CustomPortionCalculator.tsx

import CustomPortionResults from "./CustomPortionResults"

interface CustomPortionCalculatorProps {
    portionSize: number
    portionUnit: string
    availableUnits: string[]
    nutrients: {
        protein: number
        fat: number
        carbohydrate: number
        calories: number
    } | null
    onPortionSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onPortionUnitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function CustomPortionCalculator({
    portionSize,
    portionUnit,
    availableUnits,
    nutrients,
    onPortionSizeChange,
    onPortionUnitChange
}: CustomPortionCalculatorProps) {
    return (
        <section className="bg-linear-to-br from-surface-gray to-surface-gray/30 p-6 rounded-2xl border border-accent/30 shadow-lg">
            <h3 className="text-4xl font-bold mb-5 flex items-center gap-2">
                <span>⚖️</span>
                Calcular mi porción
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Tamaño de porción */}
                <div className="space-y-2">
                    <label
                        htmlFor="portionSize"
                        className="block text-2xl font-semibold text-foreground/80 my-4"
                    >
                        Tamaño de porción
                    </label>
                    <input
                        type="number"
                        id="portionSize"
                        name="portionSize"
                        value={portionSize}
                        onChange={onPortionSizeChange}
                        min="0"
                        step="0.1"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-2xl font-medium shadow-sm hover:shadow-md"
                        placeholder="100"
                    />
                </div>

                {/* Unidad de porción */}
                <div className="space-y-2">
                    <label
                        htmlFor="portionUnit"
                        className="block text-2xl font-semibold text-foreground/80 my-4"
                    >
                        Unidad
                    </label>
                    <select
                        name="portionUnit"
                        id="portionUnit"
                        value={portionUnit}
                        onChange={onPortionUnitChange}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-2xl font-medium shadow-sm hover:shadow-md cursor-pointer"
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
            <CustomPortionResults
                portionSize={portionSize}
                portionUnit={portionUnit}
                nutrients={nutrients}
            />
        </section>
    )
}