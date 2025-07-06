/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./src/app/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
        "./src/lib/**/*.{ts,tsx}",
        "./src/layout/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    darkMode: "class",
    theme: {
        container: {
            center: true,
            padding: "1rem",
        },
        screens: {
            xs: "450px",
            sm: "575px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            "2xl": "1400px",
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
                heading: ['"Poppins"', 'sans-serif'],
            },
            spacing: {
                '1.5': '0.375rem',
                '4.5': '1.125rem',
                '18': '4.5rem',
                '22': '5.5rem',
            },
            fontSize: {
                'xs-sm': '0.8125rem',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            },
            colors: {
                current: "currentColor",
                transparent: "transparent",
                white: "#FFFFFF",
                black: "#121723",
                dark: "#1D2430",
                primary: "#4A6CF7",
                yellow: "#FBB040",
                "body-color": "#788293",
                "body-color-dark": "#959CB1",
                "gray-dark": "#1E232E",
                "gray-light": "#F0F2F9",
                stroke: "#E3E8EF",
                "stroke-dark": "#353943",
                "bg-color-dark": "#171C28",
                "muted-foreground": "#6B7280", // for subtle text
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                pop: {
                    '0%': { transform: 'scale(0.95)' },
                    '100%': { transform: 'scale(1.05)' },
                },
                // fadeIn: {
                //     '0%': { opacity: 0 },
                //     '100%': { opacity: 1 },
                // },
                fadeIn: {
                    '0%': { opacity: 0, transform: 'scale(0.95)' },
                    '100%': { opacity: 1, transform: 'scale(1)' }
                },
                fadeOut: {
                    '0%': { opacity: 1, transform: 'scale(1)' },
                    '100%': { opacity: 0, transform: 'scale(0.95)' }
                },
                shake: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "20%": { transform: "translateX(-5px)" },
                    "40%": { transform: "translateX(5px)" },
                    "60%": { transform: "translateX(-5px)" },
                    "80%": { transform: "translateX(5px)" },
                },
                flicker: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
            },
            animation: {
                wiggle: 'wiggle 200ms ease-in-out',
                pop: 'pop 150ms ease-in',
                fadeIn: 'fadeIn 300ms ease-in-out',
                shake: "shake 0.4s ease-in-out",
                flicker: "flicker 1.5s infinite",
                bounce: "bounce 1s infinite",
                pulse: "pulse 2s infinite",
                'in': 'fadeIn 150ms ease-out',
                'out': 'fadeOut 150ms ease-in'
            },
            boxShadow: {
                signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
                one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
                two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
                three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
                sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
                "sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
                "feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
                submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
                "submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
                btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
                "btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
                "btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
            },
            dropShadow: {
                three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
            },
            zIndex: {
                60: '60',
                70: '70',
                80: '80',
                90: '90',
                100: '100',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};

export default config;
