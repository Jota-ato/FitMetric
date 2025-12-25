import { useTheme } from "./hooks/useTheme"

function App() {
    const { toggleTheme } = useTheme()

    return (
        <>
            <h1 className="text-3xl text-center">FitMetric</h1>
            <button
                className="bg-primary text-text-main p-2 rounded-xl"
                onClick={toggleTheme}>Toggle Theme</button>
        </>
    )
}

export default App
