import MealComponent from "./MealComponent"
import { Outlet, useLocation } from "react-router"
import Modal from "../../Modal"
import { useMemo } from "react"

export default function DiaryComponent() {

    const { pathname } = useLocation()
    const showModal = useMemo(() => pathname === "/diary/searchFood", [pathname])

    return (
        <section className="w-[90%] max-w-440 mx-auto mb-8">
            <h1 className="my-8 text-center text-6xl font-bold">Diario</h1>
            <div className="space-y-8">
                <MealComponent mealName="Desayuno" />
                <MealComponent mealName="Almuerzo" />
                <MealComponent mealName="Cena" />
                <MealComponent mealName="Snack" />
            </div>
            {showModal && <Modal>
                <Outlet />
            </Modal>
            }

        </section>
    )
}
