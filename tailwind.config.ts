import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      black: '#080202',
      white: '#F7F7F7', 

      darkPurple: {
        950: '#231d29',
        900: '#2e2737',
        800: '#3a3145',
        700: '#463b53',
        600: '#514561',
        500: '#5d4e6e',
        400: '#68587c',
        300: '#74628A',
        200: '#827296',
        100: '#9081a1',
        50: '#9e91ad',
      },

      purple: {
        950: '#1c172d',
        900: '#2a2243',
        800: '#382e5a',
        700: '#473971',
        600: '#554487',
        500: '#63509e',
        400: '#63509e',
        300: '#7f67cb',
        200: '#8d72e1',
        100: '#9880e4',
        50: '#a48ee7',
      },

      blue: {
        950: '#0e1019',
        900: '#1c2033',
        800: '#2a2f4c',
        700: '#383f66',
        600: '#474f80',
        500: '#555f99',
        400: '#636fb3',
        300: '#717ecc',
        200: '#8d72e1',
        100: '#8d9eff',
        50: '#98a8ff',
      },

      lightBlue: {
        950: '#121619',
        900: '#252d33',
        800: '#37434c',
        700: '#4a5a66',
        600: '#5d7080',
        500: '#6f8699',
        400: '#829db3',
        300: '#94b3cc',
        200: '#a7cae6',
        100: '#b9e0ff',
        50: '#c0e3ff',
      }
    },
    extend: {
      fontFamily:{
        inter: 'Inter, sans-serif'
      }
    },
  },
  plugins: [],
}
export default config
