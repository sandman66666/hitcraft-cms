module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'sm-bg': "url('/assets/images/bg/sm_bg.png')",
        'md-bg': "url('/assets/images/bg/md_bg.png')",
        '2xl-bg': "url('/assets/images/bg/2xl_bg.png')",
      },
      colors: {
        primary: "#1a73e8",
        secondary: "#4285f4",
      },
      zIndex: {
        50: "50",
        20: "20",
      },
    },
  },
  plugins: [],
};
