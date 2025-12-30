import MealComponent from "./MealComponent"
import { Outlet } from "react-router"
import Modal from "../../Modal"
import { usePageStore } from "../../../stores/PageStore"

export default function DiaryComponent() {

    const hasModal = usePageStore(state => state.hasModal)

    return (
        <section className="w-[90%] max-w-440 mx-auto mb-8">
            <h1 className="my-8 text-center text-6xl font-bold">Diario</h1>
            <div className="space-y-8">
                <MealComponent mealLabel="Desayuno" mealType="Breakfast" />
                <MealComponent mealLabel="Almuerzo" mealType="Lunch" />
                <MealComponent mealLabel="Cena" mealType="Dinner" />
                <MealComponent mealLabel="Snack" mealType="Snack" />
            </div>
            {hasModal &&
                <Modal>
                    <Outlet />
                </Modal>
            }

        </section>
    )
}
