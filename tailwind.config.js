import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                banglaTitle: ["BanglaFont", "Hind Siliguri", "sans-serif"],
                bangla: ["Noto Serif Bengali", "serif"],
            },
        },
        fontSize: {
            sm: ["14px", "20px"],
            base: ["16px", "24px"],
            lg: ["18px", "28px"],
            xl: ["24px", "32px"],
        },
    },

    plugins: [forms],
};
