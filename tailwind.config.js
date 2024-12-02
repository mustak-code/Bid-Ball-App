/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#6C4BA4",
                cardBg: "#F6F6F6",
                secondaryWhite: "#F0F0F0",
                textColor: "#2B2B2B",
            },
            fontFamily: {
                Kalnia: "Kalnia",
                Do: "Do",
                dmBold: "dmBold",
                dmRegular: "dmRegular",
            },
        },
    },
    plugins: [],
};
