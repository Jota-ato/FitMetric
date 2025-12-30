import { usdaStore } from "../../../stores/usdaStore"
import { type ChangeEvent, useEffect, useState } from "react"
import useDebounce from "../../../hooks/useDebounce"

export default function SearchFood() {

    const [searchQuery, setSearchQuery] = useState("")
    const debouncedValue = useDebounce(searchQuery, 1000)
    const searchFoods = usdaStore(state => state.searchFoods)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        console.log(debouncedValue)
    }

    useEffect(() => {
        if (debouncedValue) {
            searchFoods(debouncedValue)
        }
    }, [debouncedValue, searchFoods])

    return (
        <section className="w-[90%] max-w-440 h-[90%] mx-auto p-8 bg-surface-gray rounded-xl">
            <h2 className="text-4xl text-center font-bold">Buscar comida</h2>
            <form action="">
                <input
                    type="text"
                    placeholder="Buscar comida"
                    className="w-full mt-8 p-4 rounded-xl border border-surface-gray-dark text-2xl"
                    onChange={handleChange}
                />
            </form>
        </section>
    )
}
