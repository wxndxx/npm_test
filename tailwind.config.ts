import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        'l': '1360px',
      },
      colors: {
        "prim1": "#EFF7FE",
        "prim2": "#A1DEFF",
        "prim3": "#51BEF9",
        "prim4": "#007DBF",
        "prim5": "#00527E",
        "white": "#FFFFFF",
        "gray1": "#F2F2F5",
        "gray2": "#D9D9E3",
        "gray3": "#BEBECB",
        "gray4": "#9A9AA5",
        "gray5": "#5B5B5F",
        "gray6": "#303036",
        "red1": "#FF9292",
        "red2": "#E35656",
        "green1": "#59DD7E",
        "green2": "#59DD7E"
      },
      zIndex: {
        "block": "30",
        "popup": "40",
        "modal": "60"
      },
      textColor: {
        "white1": "#fff",
        "black1": "#303036",
        "gray1": '#9A9AA5',
        "blue1": "#51BEF9",
      },
      borderColor: {
        "gray1": "#F2F2F5",
        "gray2": "#D9D9E3",
      },
      padding: {
        "btn-l": "20px",
        "btn-m": "12px",
        "btn-s": "8px",
      },
      fontSize: {
        "h1": "54px",
        "h2": "36px",
        "h3": "24px",
        "p1": "20px",
        "p2": "16px",
        "p3": "14px",
        "p4": "12px",
      },
      gridTemplateRows: {
        "16": "repeat(16, minmax(0, 1fr))",
        "36": "repeat(36, minmax(0, 1fr))",
        "71": "repeat(71, minmax(0, 1fr))"
      },
      
      // borderRadius: {

      // }
      height: {
        "header-height": "70px"
      },
      screens: {
        's': '0px',

        'xn': '360px',

        'n': '500px',

        'xxs': '600px',

        'special': '850px',
        
        'xs': '960px',
  
        'm': '1120px',
  
        'l': '1360px',

        'xxl': '1500px',
  
        'xl': '1920px',
      },
    },
  },
  plugins: [],
};
export default config;
