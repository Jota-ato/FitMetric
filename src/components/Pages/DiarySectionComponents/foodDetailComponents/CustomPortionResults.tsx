// components/food/detail/CustomPortionResults.tsx

interface CustomPortionResultsProps {
    portionSize: number
    portionUnit: string
    nutrients: {
        protein: number
        fat: number
        carbohydrate: number
        calories: number
    } | null
}

export default function CustomPortionResults({
    portionSize,
    portionUnit,
    nutrients
}: CustomPortionResultsProps) {
    return (
        <div className="mt-6 bg-linear-gradient-to-br from-accent/15 via-accent/10 to-accent/5 p-5 rounded-xl border-2 border-accent/30 shadow-inner">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-accent-dark dark:text-accent">
                <span>🎯</span>
                Nutrientes en tu porción: {portionSize} {portionUnit}
            </h4>
            {nutrients ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Calorías */}
                    <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg text-center backdrop-blur-sm border border-accent/10 hover:scale-105 transition-transform duration-200">
                        <p className="text-xs text-muted uppercase tracking-wide mb-1">Calorías</p>
                        <p className="text-2xl font-bold text-accent">{nutrients.calories.toFixed(1)}</p>
                        <p className="text-xs text-muted">kcal</p>
                    </div>

                    {/* Proteínas */}
                    <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg text-center backdrop-blur-sm border border-blue-200/30 hover:scale-105 transition-transform duration-200">
                        <p className="text-xs text-muted uppercase tracking-wide mb-1">Proteínas</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{nutrients.protein.toFixed(1)}</p>
                        <p className="text-xs text-muted">gramos</p>
                    </div>

                    {/* Carbohidratos */}
                    <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg text-center backdrop-blur-sm border border-amber-200/30 hover:scale-105 transition-transform duration-200">
                        <p className="text-xs text-muted uppercase tracking-wide mb-1">Carbohidratos</p>
                        <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{nutrients.carbohydrate.toFixed(1)}</p>
                        <p className="text-xs text-muted">gramos</p>
                    </div>

                    {/* Grasas */}
                    <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg text-center backdrop-blur-sm border border-rose-200/30 hover:scale-105 transition-transform duration-200">
                        <p className="text-xs text-muted uppercase tracking-wide mb-1">Grasas</p>
                        <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{nutrients.fat.toFixed(1)}</p>
                        <p className="text-xs text-muted">gramos</p>
                    </div>
                </div>
            ) : (
                <div className="text-center py-4">
                    <p className="text-muted italic">Ingrese un tamaño de porción válido para ver los nutrientes</p>
                </div>
            )}
        </div>
    )
}