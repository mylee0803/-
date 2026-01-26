/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                wine: {
                    50: '#fdf4f4',
                    100: '#fbe8e8',
                    200: '#f6d5d5',
                    300: '#efafaf',
                    400: '#e57e7e',
                    500: '#d95353',
                    600: '#c33535',
                    700: '#a32626',
                    800: '#872323',
                    900: '#702222',
                    950: '#3d0e0e',
                },
                gold: {
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            },
        },
    },
    plugins: [],
}
