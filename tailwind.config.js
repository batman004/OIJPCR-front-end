module.exports = {
  corePlugins: {
    preflight: true
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'oijpcr-blue': '#2B2BD6',
      },
      height: {
        '8xl': '90rem'
      },
    }
  }
}
