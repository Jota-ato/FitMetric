/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--color-bg)',
                surface: 'var(--color-surface)',
                main: 'var(--color-text-main)',
                muted: 'var(--color-text-muted)',
                primary: 'var(--color-primary)',
                primaryHover: 'var(--color-primary-hover)',
                primaryLight: 'var(--color-primary-light)',
                secondary: 'var(--color-secondary)',
                secondaryHover: 'var(--color-secondary-hover)',
                secondaryLight: 'var(--color-secondary-light)',
                shadowCard: 'var(--shadow-card)',
            },
        },
    },
    plugins: [],
}