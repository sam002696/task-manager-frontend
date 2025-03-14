export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6", // Global primary color (Blue)
        secondary: "#9333ea", // Global secondary color (Purple)
        success: "#22c55e", // Success green
        warning: "#f59e0b", // Warning orange
        danger: "#ef4444", // Danger red
        dark: "#1e293b", // Dark mode background
        light: "#f8fafc", // Light mode background
      },
    },
  },
  plugins: [],
};
