/** @type {import('tailwindcss').Config} */
module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			bezheviy: '#F5F5F5',
			orangeviy: '#F99417',
			fioletoviy: '#4D4C7D',
			temnoFioletoviy: '#363062',
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
