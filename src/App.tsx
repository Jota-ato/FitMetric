import MainScreen from "./components/MainScreen"
import FloatingThemeButton from "./components/FloatingThemeButton"
import { useEffect, useState } from "react"
import RegistationForm from "./components/RegistationForm"

function App() {

    const [starting, setStarting] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setStarting(false)
        }, 3000)
    }, [])

    return (
        <>
            {starting ? <MainScreen /> : <RegistationForm />}
            <FloatingThemeButton />
        </>
    )
}

export default App
