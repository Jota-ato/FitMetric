import MainScreen from "./components/MainScreen"
import FloatingThemeButton from "./components/FloatingThemeButton"
import { useEffect, useState } from "react"
import RegistationForm from "./components/RegistationForm"
import { usePageStore } from "./stores/PageStore"
import DetailInformationForm from "./components/DetailInformationForm"

function App() {

    const [starting, setStarting] = useState(true)
    const step = usePageStore(state => state.step)

    useEffect(() => {
        setTimeout(() => {
            setStarting(false)
        }, 2000)
    }, [])

    if (starting) return <MainScreen />

    return (
        <>
            {step === 1 ? <RegistationForm /> : step === 2 ? <DetailInformationForm /> : <h1>Step 3</h1>}
            <FloatingThemeButton />
        </>
    )
}

export default App
