
import CenterContainer from "./CenterContainer";

export default function MainScreen() {
    /**
     * Main screen to show logo and brand name
     */

    return (
        <CenterContainer>
            <div className="flex flex-col items-center gap-6 animate-fade-in">
                {/* Logo */}
                <div className="relative group">
                    <img
                        src="/logo.webp"
                        alt="FitMetric Logo"
                        className="w-32 h-32 relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-300 ease-in"
                    />
                </div>

                {/* Brand Name */}
                <h1 className="text-6xl font-bold bg-linear-to-r from-primary via-primary-dark to-secondary bg-clip-text text-transparent animate-gradient">
                    FitMetric
                </h1>

                {/* Tagline */}
                <p className="text-2xl text-gray-400 dark:text-gray-500 font-light tracking-wide">
                    Track. Measure. Transform.
                </p>
            </div>
        </CenterContainer>
    )
}
