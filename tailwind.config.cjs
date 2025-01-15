/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/views/**/*.html",
        "src/index.html",
        "./src/public/js/**/*.js",
        "./src/middleware/**/*.js",
        "./src/config/**/*.js"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}