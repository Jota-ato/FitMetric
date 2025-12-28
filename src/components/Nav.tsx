import { Link } from "react-router"

export default function Nav() {

    return (
        <header className="p-8 flex items-center justify-center">
            <nav className="flex md:gap-16 gap-8 py-2 px-16 bg-surface rounded-full">
                <Link to="/profile" className="p-2 hover:bg-primary hover:rounded-full text-2xl font-bold text-text-main transition-all duration-300 ease-in-out">Yo</Link>
                <Link to="/diary" className="p-2 hover:bg-primary hover:rounded-full text-2xl font-bold text-text-main transition-all duration-300 ease-in-out">Diario</Link>
                <Link to="/reports" className="p-2 hover:bg-primary hover:rounded-full text-2xl font-bold text-text-main transition-all duration-300 ease-in-out">Informes</Link>
            </nav>
        </header>
    )
}
