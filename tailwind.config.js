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
            },
        },
    },
    plugins: [],
}