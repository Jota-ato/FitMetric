import { Outlet } from "react-router"
import Nav from "./Nav"
import FloatingThemeButton from "./FloatingThemeButton"

export default function Layout() {
    return (
        <>
            <Nav />
            <main>
                <Outlet />
            </main>
            <FloatingThemeButton />
        </>
    )
}
