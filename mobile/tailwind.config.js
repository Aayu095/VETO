/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0F172A", // Slate 900
                safe: "#10B981",    // Emerald 500
                risk: "#F59E0B",    // Amber 500
                danger: "#EF4444",  // Red 500
                background: "#F8FAFC", // Slate 50
            }
        },
    },
    plugins: [],
}
