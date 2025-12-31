
interface MacrosGridProps {
    calories: number,
    protein: number,
    carbs: number,
    fats: number
}

export default function MacrosGrid({ calories, protein, carbs, fats }: MacrosGridProps) {
    return (
        <article className="flex flex-col gap-4 my-4">
            <header className="text-center text-xl md:text-2xl text-muted">Macronutrientes</header>
            <section className="grid grid-cols-2 md:grid-cols-4 justify-center gap-4 p-8">
                <div className="border flex justify-center items-center rounded-xl border-muted">
                    <p className="text-xl md:text-2xl py-4 text-muted">Calorías: <span className="font-bold">{calories}</span></p>
                </div>
                <div className="border flex justify-center items-center rounded-xl border-red-500 dark:border-red-200">
                    <p className="text-xl md:text-2xl py-4 text-red-500 dark:text-red-200">Proteínas: <span className="font-bold">{protein}g</span></p>
                </div>
                <div className="border flex justify-center items-center rounded-xl border-orange-500 dark:border-orange-200">
                    <p className="text-xl md:text-2xl py-4 text-orange-500 dark:text-orange-200">Carbohidratos: <span className="font-bold">{carbs}g</span></p>
                </div>
                <div className="border flex justify-center items-center rounded-xl border-yellow-500 dark:border-yellow-200">
                    <p className="text-xl md:text-2xl py-4 text-yellow-500 dark:text-yellow-200">Grasas: <span className="font-bold">{fats}g</span></p>
                </div>
            </section>
        </article>
    )
}
