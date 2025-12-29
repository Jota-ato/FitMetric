import { USDAFoodService } from "../../../services/USDAFoodService"

export default function DiaryComponent() {
    USDAFoodService.searchFoods('rice')


    return (
        <section>
            <h1>Diario</h1>
        </section>
    )
}
