import { USDAFoodService } from "../../../services/USDAFoodService"
import MealComponent from "./MealComponent"

export default function DiaryComponent() {
    USDAFoodService.searchFoods('rice')


    return (
        <section className="w-[90%] max-w-440 mx-auto mb-8">
            <h1 className="my-8 text-center text-6xl font-bold">Diario</h1>
            <div className="space-y-8">
                <MealComponent mealName="Desayuno" />
                <MealComponent mealName="Almuerzo" />
                <MealComponent mealName="Cena" />
                <MealComponent mealName="Snack" />
            </div>
        </section>
    )
}
