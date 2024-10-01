/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
       
        colors: {
          colorButton: '#617AFA',  // Màu tùy chỉnh
          bgTheme:'#FAFAFA'
        },
      },
    },
    plugins: [],
  }