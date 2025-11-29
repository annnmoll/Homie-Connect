/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Background images for different pages
      backgroundImage: {
        "login-bg": "url('../src/assets/background.jpg')",
        // "signup-bg": "url('./assets/signup-bg.jpg')",
        // "forgot-password-bg": "url('./assets/forgot-password-bg.jpg')",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
          "-webkit-overflow-scrolling": "touch",
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* Hide scrollbar in Chrome, Safari, and Opera */,
          },
        },
      });
    },
  ],
};
