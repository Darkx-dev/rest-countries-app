const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(dropdown|menu|divider|popover|button|ripple|spinner).js",
  ],
  theme: {
    extend: {
      colors: {
        darkblue: {
          1: "#2b3945",
          2: "#202c37",
          3: "#111517",
        },
        gray: {
          1: "#858585",
          2: "#fafafa",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {},
    }),
  ],
};
