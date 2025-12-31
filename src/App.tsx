import MainScreen from "./components/MainScreen"
import FloatingThemeButton from "./components/FloatingThemeButton"
import { useEffect, useState } from "react"
import RegistationForm from "./components/Pages/RegistrationPageComponents/RegistationForm"
import { usePageStore } from "./stores/PageStore"
import DetailInformationForm from "./components/Pages/RegistrationPageComponents/DetailInformationForm"
import { useTheme } from "./hooks/useTheme"
import { useNavigate } from "react-router"

function App() {
    useTheme() // This will apply the theme to the app
    const [starting, setStarting] = useState(true)
    const { step } = usePageStore()
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            setStarting(false)
        }, 2000)
    }, [])

    useEffect(() => {
        if (step >= 3) {
            navigate('/profile')
        }
    }, [step, navigate])

    if (starting) return <MainScreen />

    if (step < 3) {
        return (
            <>
                {step === 1 ? <RegistationForm /> : <DetailInformationForm />}
                <FloatingThemeButton />
            </>
        )
    }

    return null
}

export default App
