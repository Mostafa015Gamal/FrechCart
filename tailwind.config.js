const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html", flowbite.content()],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  plugins: [flowbite.plugin()],
};
