import { useNavigate } from "react-router";
import type { USDASFood } from "../../../types/usdaTypes";
import MacrosGrid from "./MacrosGrid";

export default function FoodOverview({ food }: { food: USDASFood }) {

    const navigate = useNavigate()

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

    // IDs de Nutrientes USDA (Verifica que coincidan con tu types/usdaTypes.ts si tienes dudas)
    // 1008: Energía (kcal)
    // 1003: Proteína
    // 1005: Carbohidratos (o 1004 según tu archivo de tipos, revisa esto abajo*)
    // 1004: Grasas (o 1005 según tu archivo de tipos*)

    return (
        <article className="p-4 border border-surface-gray-dark rounded-xl">
            <header>
                <h2 className="text-2xl capitalize text-center">{food.description}</h2>
            </header>
            <main>
                <MacrosGrid
                    calories={getNutrientValue(1008)}
                    protein={getNutrientValue(1003)}
                    // Aquí asumí 1005 para Carbs y 1004 para Fats basado en el estándar común,
                    // pero asegúrate de que coincida con lo que usaste en tu type definition.
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
                        onClick={() => navigate(`/diary/foodDetail/${food.fdcId}`)}
                    >Agregar</button>
                </div>
            </footer>
        </article>
    )
}