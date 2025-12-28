import { Github, Instagram, Linkedin, Mail } from "lucide-react"
import { Link } from "react-router"

export default function Footer() {
    return (
        <footer className="text-main bg-surface p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-[90%] max-w-440 mx-auto min-h-44">
                <div>
                    <h2 className="font-bold text-4xl md:text-5xl">FitMetric</h2>
                    <p className="text-muted text-xl md:text-2xl">FitMetric &copy; {new Date().getFullYear()}</p>
                    <p className="text-muted text-xl md:text-2xl">Un seguidor sencillo de calorías y macronutrientes</p>
                </div>
                <div>
                    <h2 className="font-bold text-4xl mb-4">Navegación</h2>
                    <nav className="grid grid-cols-2 gap-4">
                        <Link className="text-2xl font-bold hover:text-primary transition-all duration-300 ease-in-out" to="/">Home</Link>
                        <Link className="text-2xl font-bold hover:text-primary transition-all duration-300 ease-in-out" to="/profile">Perfil</Link>
                        <Link className="text-2xl font-bold hover:text-primary transition-all duration-300 ease-in-out" to="/diary">Diario</Link>
                        <Link className="text-2xl font-bold hover:text-primary transition-all duration-300 ease-in-out" to="/reports">Informes</Link>
                    </nav>
                </div>
                <div>
                    <h2 className="font-bold text-4xl mb-4">Contacto</h2>
                    <div className="flex gap-6">
                        <a target="_blank" className="p-2 bg-surface-gray rounded-lg border border-surface-gray-dark h-12 w-12 flex items-center justify-center hover:border-primary transition-all duration-300 ease-in-out hover:text-primary" href="https://github.com/Jota-ato"><Github /></a>
                        <a target="_blank" className="p-2 bg-surface-gray rounded-lg border border-surface-gray-dark h-12 w-12 flex items-center justify-center hover:border-primary transition-all duration-300 ease-in-out hover:text-primary" href="https://www.instagram.com/jota.ato/?next=%2Fliten.maur%2F"><Instagram /></a>
                        <a target="_blank" className="p-2 bg-surface-gray rounded-lg border border-surface-gray-dark h-12 w-12 flex items-center justify-center hover:border-primary transition-all duration-300 ease-in-out hover:text-primary" href="https://www.linkedin.com/in/julio-c%C3%A9sar-zavala-blanco-35baa8365/"><Linkedin /></a>
                        <a target="_blank" className="p-2 bg-surface-gray rounded-lg border border-surface-gray-dark h-12 w-12 flex items-center justify-center hover:border-primary transition-all duration-300 ease-in-out hover:text-primary" href="mailto:julioc-01@outlook.com"><Mail /></a>
                    </div>
                </div>

            </div>
        </footer>
    )
}
