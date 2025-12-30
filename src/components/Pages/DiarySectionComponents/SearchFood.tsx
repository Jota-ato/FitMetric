import { usdaStore } from "../../../stores/usdaStore"
import { type ChangeEvent, useEffect, useState } from "react"
import Spinner from "../../Spinner"
import useDebounce from "../../../hooks/useDebounce"
import FoodOverview from "./FoodOverview"

export default function SearchFood() {

    const [searchQuery, setSearchQuery] = useState("")
    const debouncedValue = useDebounce(searchQuery, 1000)
    const searchFoods = usdaStore(state => state.searchFoods)
    const resetFoods = usdaStore(state => state.resetFoods)
    const isLoading = usdaStore(state => state.isLoading)
    const foods = usdaStore(state => state.foods)


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
        if (debouncedValue) {
            resetFoods()
            searchFoods(debouncedValue)
        }
    }, [debouncedValue, searchFoods, resetFoods])

    return (
        <section className="w-[90%] max-w-440 h-[90%] mx-auto overflow-y-auto p-8 bg-surface-gray rounded-xl">
            <h2 className="text-4xl text-center font-bold">Buscar comida</h2>
            <form action="">
                <input
                    type="text"
                    placeholder="Buscar comida"
                    className="w-full mt-8 p-4 rounded-xl border border-surface-gray-dark text-2xl"
                    onChange={handleChange}
                />
            </form>
            <div> {/* Aqui van los resultados */}
                {searchQuery === "" ?
                    <p className="text-center text-xl md:text-2xl font-bold my-8 text-muted">Busca algo para empezar</p>
                    :
                    isLoading ?
                        <div className="w-full h-full flex items-center justify-center my-20 p-8">
                            <Spinner />
                        </div>
                        : foods.length ?
                            <div className="space-y-8 my-8">
                                {foods.map(food => (
                                    <FoodOverview
                                        key={food.fdcId}
                                        food={food} />
                                ))}
                            </div>
                            :
                            <p className="text-center text-xl md:text-2xl font-bold my-8 text-muted">No hay resultados</p>
                }
            </div>
        </section>
    )
}
