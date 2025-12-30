import { useNavigate } from "react-router";
import type { USDASFood } from "../../../types/usdaTypes";
import MacrosGrid from "./MacrosGrid";


export default function FoodOverview({ food }: { food: USDASFood }) {

    const navigate = useNavigate()
    const nutrients = food.foodNutrients.filter(nutrient => nutrient.nutrientId === 1003 || nutrient.nutrientId === 1004 || nutrient.nutrientId === 1005 || nutrient.nutrientId === 1008)
    const owner = food.brandOwner ? food.brandOwner : "Articulo natural"
    const hasServingSize = food.servingSize && food.servingSizeUnit
    const servingSize = hasServingSize ? `${food.servingSize}${food.servingSizeUnit}` : "100g"

    return (
        <article className="p-4 border border-surface-gray-dark rounded-xl">
            <header>
                <h2 className="text-2xl capitalize text-center">{food.description}</h2>
            </header>
            <main>
                <MacrosGrid
                    calories={nutrients.find(nutrient => nutrient.nutrientId === 1008)?.value || 0}
                    protein={nutrients.find(nutrient => nutrient.nutrientId === 1003)?.value || 0}
                    carbs={nutrients.find(nutrient => nutrient.nutrientId === 1005)?.value || 0}
                    fats={nutrients.find(nutrient => nutrient.nutrientId === 1004)?.value || 0}
                />
            </main>
            <footer>
                <div className="flex justify-between items-center">
                    <p className="text-xl md:text-2xl">Porcion: <span className="font-bold">{servingSize}</span></p>
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
