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
      mixBlendMode: {
        screen: "screen",
        "color-burn": "color-burn",
      },
      screens: {
        xs: "300px",
      },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
    },
    variants: {
      extend: {
        mixBlendMode: ["responsive"],
      },
    },
  },
  plugins: [],
};
