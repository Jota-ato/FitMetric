
interface MacrosGridProps {
    calories: number,
    protein: number,
    carbs: number,
    fats: number
}

export default function MacrosGrid({ calories, protein, carbs, fats }: MacrosGridProps) {
    return (
        <div className="flex flex-col gap-4 my-4">
            <h3 className="text-center text-xl md:text-2xl text-muted">Macronutrientes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-4 p-8">
                <div className="border flex justify-center items-center py-4 rounded-xl border-muted">
                    <p className="text-xl md:text-2xl text-muted">Calorías: <span className="font-bold">{calories.toFixed(2)}</span></p>
                </div>
                <div className="border flex justify-center items-center py-4 rounded-xl dark:border-red-200 border-red-500">
                    <p className="text-xl md:text-2xl dark:text-red-200 text-red-500">Proteínas: <span className="font-bold">{protein.toFixed(2)}g</span></p>
                </div>
                <div className="border flex justify-center items-center py-4 rounded-xl dark:border-orange-200 border-orange-500">
                    <p className="text-xl md:text-2xl dark:text-orange-200 text-orange-500">Carbohidratos: <span className="font-bold">{carbs.toFixed(2)}g</span></p>
                </div>
                <div className="border flex justify-center items-center py-4 rounded-xl dark:border-yellow-200 border-yellow-500">
                    <p className="text-xl md:text-2xl dark:text-yellow-200 text-yellow-500">Grasas: <span className="font-bold">{fats.toFixed(2)}g</span></p>
                </div>
            </div>
        </div>
    )
}
