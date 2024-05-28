
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({addUtilities}) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar":{
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style":"none",
          "scrollbar-width":"none",
        },
        ".scrollbar-y::-webkit-scrollbar-track":{
          width:"10px",
          "background-color": "#888",
          "border-radius":"5px",
        },
        ".scrollbar-y::-webkit-scrollbar":{
          width:"10px",
        },
        ".scrollbar-y::-webkit-thumb":{
          "background-color": "#000",
          "border-radius":"5px",
        },
        ".scrollbar-y::-webkit-scrollbar-thumb:hover":{
          "background-color": "#555",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

