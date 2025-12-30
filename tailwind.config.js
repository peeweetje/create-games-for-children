/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'chess-light': '#f0d9b5',
                'chess-dark': '#b58863',
            },
            fontFamily: {
                'sans': ['"Comic Sans MS"', 'cursive', 'sans-serif'], // Child friendly default
            }
        },
    },
    plugins: [],
}
