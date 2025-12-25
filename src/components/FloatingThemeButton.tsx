import { useTheme } from "../hooks/useTheme";

export default function FloatingThemeButton() {
    /**
     * @type {"dark" | "light"}
     * Fixed buttom to toggle theme
     */
    const { theme, toggleTheme } = useTheme()
    return (
        <div className="fixed bottom-4 right-4">
            <button className="p-4 rounded-full bg-primary text-white cursor-pointer" onClick={toggleTheme}>{theme === "dark" ? "🌞" : "🌙"}</button>
        </div>
    )
}
