import { useNavigate, useParams } from "react-router";
import type { USDASFood } from "../../../types/usdaTypes";
import MacrosGrid from "./MacrosGrid";

export default function FoodOverview({ food }: { food: USDASFood }) {

    const navigate = useNavigate()
    const params = useParams()

    // 1. Detectamos si hay información de porción
    const hasServingSize = food.servingSize && food.servingSizeUnit

    // 2. Calculamos el factor de escala.
    // Si la comida tiene porción (ej. 45g), dividimos por 100 para sacar la proporción (0.45).
    // Si no tiene porción definida, asumimos que es 100g (factor = 1).
    const factor = hasServingSize && food.servingSize ? (food.servingSize / 100) : 1;

    // 3. String para mostrar en la UI
    const servingSizeLabel = hasServingSize ? `${food.servingSize}${food.servingSizeUnit}` : "100g"

    const owner = food.brandOwner ? food.brandOwner : "Articulo natural"

    // 4. Función auxiliar para obtener el valor del nutriente YA ESCALADO
    const getNutrientValue = (id: number) => {
        const nutrient = food.foodNutrients.find(n => n.nutrientId === id);
        return parseInt((nutrient ? nutrient.value * factor : 0).toString());
    };

    return (
        <article className="p-4 border border-surface-gray-dark rounded-xl">
            <header>
                <h2 className="text-2xl capitalize text-center">{food.description}</h2>
            </header>
            <main>
                <MacrosGrid
                    calories={getNutrientValue(1008)}
                    protein={getNutrientValue(1003)}
                    carbs={getNutrientValue(1005)}
                    fats={getNutrientValue(1004)}
                />
            </main>
            <footer>
                <div className="flex justify-between items-center">
                    <p className="text-xl md:text-2xl">Porcion: <span className="font-bold">{servingSizeLabel}</span></p>
                    <p className="text-xl md:text-2xl">Marca: <span className="font-bold">{owner}</span></p>
                    <button
                        className="bg-secondary hover:bg-secondary-hover text-text-main px-8 py-4 rounded-xl text-xl font-bold cursor-pointer transition-all duration-300"
                        type="button"
                        onClick={() => navigate(`/diary/${params.mealType}/foodDetail/${food.fdcId}`)}
                    >Agregar</button>
                </div>
            </footer>
        </article>
    )
}