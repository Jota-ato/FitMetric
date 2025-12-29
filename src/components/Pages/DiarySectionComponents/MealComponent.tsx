
interface MealComponentProps {
    mealName: string
}

export default function MealComponent({ mealName }: MealComponentProps) {
    return (
        <article className="bg-surface p-8 rounded-xl border border-surface-">
            <header className="flex justify-between items-center border-b border-surface-gray-dark pb-4">
                <h2 className="text-4xl font-bold">{mealName}</h2>
                <button
                    className="bg-secondary hover:bg-secondary-hover text-text-main px-8 py-4 rounded-xl text-xl font-bold cursor-pointer transition-all duration-300"
                    type="button"
                >
                    Agregar comida
                </button>
            </header>
            <div className="flex flex-col gap-4 mt-4">
                <h3 className="text-center text-2xl text-muted">Macronutrientes</h3>
                <div className="flex flex-row justify-center gap-8">
                    <p className="text-xl md:text-2xl">Calorías: <span className="font-bold">0</span></p>
                    <p className="text-xl md:text-2xl">Proteínas: <span className="font-bold">0</span></p>
                    <p className="text-xl md:text-2xl">Carbohidratos: <span className="font-bold">0</span></p>
                    <p className="text-xl md:text-2xl">Grasas: <span className="font-bold">0</span></p>
                </div>
            </div>
            <div>
                <h3>comidas</h3>
            </div>
        </article>
    )
}
