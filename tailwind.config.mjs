/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'poppins': ['Poppins', ...defaultTheme.fontFamily.serif],
				'quicksand': ['Quicksand', ...defaultTheme.fontFamily.serif],
			},
			colors: {
				'primary': '#CB1B1A',
				'gray': '#949494',
				'light-gray': '#EAEAEA',
				'white': '#FFFFFF',
				'black': '#000000',
				"dark-blue": '#03052C',
				"cream": '#FCFAD3',
			}
		},
	},
	plugins: [],
}
