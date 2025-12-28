import { Link, useLocation } from "react-router"

export default function Nav() {

    const { pathname } = useLocation()

    return (
        <header className="p-8 flex items-center justify-center">
            <nav className="flex md:gap-16 gap-8 py-2 px-16 bg-surface rounded-full">
                <Link to="/profile" className={pathname === "/profile" ? "p-2 bg-secondary rounded-full text-2xl font-bold text-text-main transition-all duration-300 ease-in-out" : "p-2 hover:bg-secondary hover:rounded-full text-2xl font-bold text-text-main transition-all duration-300 ease-in-out"}>Yo</Link>
                <Link to="/diary" className={pathname === "/diary" ? "p-2 bg-secondary rounded-full text-2xl font-bold text-text-main transition-all duration-300 ease-in-out" : "p-2 hover:bg-secondary hover:rounded-full text-2xl font-bold text-text-main transition-all duration-300 ease-in-out"}>Diario</Link>
                <Link to="/reports" className={pathname === "/reports" ? "p-2 bg-secondary rounded-full text-2xl font-bold text-text-main transition-all duration-300 ease-in-out" : "p-2 hover:bg-secondary hover:rounded-full text-2xl font-bold text-text-main transition-all duration-300 ease-in-out"}>Informes</Link>
            </nav>
        </header>
    )
}
