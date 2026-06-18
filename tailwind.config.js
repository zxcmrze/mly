/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'beach': {
          50: '#fef7f0',
          100: '#fdecd9',
          200: '#fad5b3',
          300: '#f6b880',
          400: '#f0914c',
          500: '#ed7527',
          600: '#df5c19',
          700: '#b94716',
          800: '#953a18',
          900: '#793217',
        },
        'pink': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        'sky': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'cream': {
          50: '#fefdfb',
          100: '#fdfcf8',
          200: '#faf7ef',
          300: '#f5efe0',
          400: '#eddfc8',
          500: '#e4cba5',
          600: '#d9b57f',
          700: '#ca9a5a',
          800: '#ab7f4a',
          900: '#8e6742',
        },
      },
      fontFamily: {
        'cute': ['"Comic Sans MS"', 'cursive', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'cry': 'cry 1s ease-in-out',
        'happy': 'happy 0.8s ease-out',
        'star': 'star 1s ease-out forwards',
        'drop': 'drop 1s ease-in forwards',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        cry: {
          '0%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(5px)' },
          '75%': { transform: 'translateY(-3px)' },
          '100%': { transform: 'translateY(0)' },
        },
        happy: {
          '0%': { transform: 'scale(1) translateY(0)' },
          '30%': { transform: 'scale(1.1) translateY(-20px)' },
          '60%': { transform: 'scale(1) translateY(5px)' },
          '100%': { transform: 'scale(1) translateY(0)' },
        },
        star: {
          '0%': { opacity: '1', transform: 'scale(1) translateY(0)' },
          '100%': { opacity: '0', transform: 'scale(0) translateY(-30px)' },
        },
        drop: {
          '0%': { opacity: '1', transform: 'translateY(-10px)' },
          '100%': { opacity: '0', transform: 'translateY(30px)' },
        },
      },
    },
  },
  plugins: [],
};
