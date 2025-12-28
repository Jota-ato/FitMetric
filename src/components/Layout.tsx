import { Outlet } from "react-router"
import Nav from "./Nav"
import FloatingThemeButton from "./FloatingThemeButton"
import Footer from "./Footer"
import { useTheme } from "../hooks/useTheme"

export default function Layout() {
    useTheme()

    return (
        <>
            <Nav />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <FloatingThemeButton />
            <Footer />
        </>
    )
}
