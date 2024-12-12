/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector','[data-theme="darkAlgorithm"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      // AlibabaPuHuiTiBold: ['"AlibabaPuHuiTi Bold"'],
    },
    extend: {
      transitionTimingFunction: {
        'easeOutQuart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'easeOutBack': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      zIndex: {
        ...(Array.from({ length: 101 }).fill(null).map((_, index) => ({ index }))).reduce((pre, { index }) => ({ ...pre, [index]: index }), {}),
      },
    },
  },
  plugins: [],
}
