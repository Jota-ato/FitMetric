/**
 * Custom hook to manage the theme state and toggle between light and dark modes.
 */
import { useState, useEffect } from "react"

export const useTheme = () => {
    /**
     * First try to get the theme from localStorage, if not try to get the theme from the system
     */
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme) return savedTheme
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    })

    /**
     * Update the document's class and localStorage when the theme changes
     */
    useEffect(() => {
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    /**
     * Toggle the theme between light and dark
     */
    const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light")

    return { theme, toggleTheme }
}