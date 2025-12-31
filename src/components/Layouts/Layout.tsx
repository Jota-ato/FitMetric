import { Outlet, useLocation, useNavigate } from "react-router"
import Nav from "./Nav"
import FloatingThemeButton from "../FloatingThemeButton"
import Footer from "./Footer"
import { useTheme } from "../../hooks/useTheme"
import { usePageStore } from "../../stores/PageStore"

export default function Layout() {
    useTheme()

    const isBasic = usePageStore(state => state.isBasicInfoFull)
    const { pathname } = useLocation()
    const navigate = useNavigate()
    if (!isBasic && pathname !== '/') {
        navigate('/')
    }

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
