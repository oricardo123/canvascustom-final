/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        HomeContainer2TextBox: "rgba(189, 189, 189, 0.3)",
        FooterColor: "rgba(115, 62, 29, 1)",
      },
      textColor: {
        FooterColor: "rgba(115, 62, 29, 1)",
      },
      mixBlendMode: {
        screen: "screen",
        "color-burn": "color-burn",
      },
      screens: {
        xs: "300px",
      },
    },
  },
  variants: {
    extend: {
      mixBlendMode: ["responsive"],
    },
  },
  plugins: [],
};
