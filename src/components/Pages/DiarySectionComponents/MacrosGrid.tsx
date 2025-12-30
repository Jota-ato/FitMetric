
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
                <p className="text-xl md:text-3xl">Calorías: <span className="font-bold">{calories}</span></p>
                <p className="text-xl md:text-3xl">Proteínas: <span className="font-bold">{protein}g</span></p>
                <p className="text-xl md:text-3xl">Carbohidratos: <span className="font-bold">{carbs}g</span></p>
                <p className="text-xl md:text-3xl">Grasas: <span className="font-bold">{fats}g</span></p>
            </div>
        </div>
    )
}
