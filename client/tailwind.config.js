/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      extend: {
          colors: {
              customBackground: "#272932", // Your custom color
          },
          fontFamily: {
              alexBrush: ["Alex Brush", "cursive"],
              roboto: ["Roboto", "sans-serif"],
              montserrat: ["Montserrat", "sans-serif"],
          },
          fontWeight: {
              light: 300,
              regular: 400,
              medium: 500,
              bold: 700,
              black: 900,
          },
      },
  },
  plugins: [
      // eslint-disable-next-line no-undef
      require("@tailwindcss/forms"),
      // eslint-disable-next-line no-undef
      require("daisyui"),
  ],
  daisyui: {
      themes: [
          {
              synthwave: {
                  "primary": "#ff3eaa", // Customize colors directly here
                  "secondary": "#c058f3",
                  "accent": "#272932",
                  "base-100": "#272932", // Your custom background color
                  // You can add more color overrides here as needed
              },
          },
          "light",
      ],
  },
};
