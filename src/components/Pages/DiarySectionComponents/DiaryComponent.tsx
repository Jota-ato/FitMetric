import MealComponent from "./MealComponent"
import { Outlet } from "react-router"
import Modal from "../../Modal"
import { usePageStore } from "../../../stores/PageStore"
import { useNavigate } from "react-router"

export default function DiaryComponent() {

    const navigate = useNavigate()
    const hasModal = usePageStore(state => state.hasModal)

    return (
        <section className="w-[80%] max-w-340 mx-auto mb-8">
            <h1 className="my-8 text-center text-6xl font-bold">Diario</h1>
            <div className="space-y-8">
                <MealComponent mealLabel="Desayuno" mealType="Breakfast" />
                <MealComponent mealLabel="Almuerzo" mealType="Lunch" />
                <MealComponent mealLabel="Cena" mealType="Dinner" />
                <MealComponent mealLabel="Snack" mealType="Snack" />
            </div>
            {hasModal &&
                <Modal
                    customFunction={() => {
                        navigate('/diary')
                    }}
                >
                    <Outlet />
                </Modal>
            }

        </section>
    )
}
