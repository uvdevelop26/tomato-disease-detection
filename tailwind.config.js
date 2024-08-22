/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue, js, ts, jsx, tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#415F4A',
        'light-green-two' : '#D1DED5'
      },
      backgroundImage: {
        'hero-pattern': "url('./src/images/fondo_inicio.jpg')",
        'nature-image': "url('./src/images/nature_2.jpg')"

      },
      borderRadius: {
        '4xl': '8rem'
      },
      container: {
        center: true, // Centra el contenedor automáticamente
        padding: {
          DEFAULT: '1rem', // Padding por defecto
          sm: '2rem', // Padding para pantallas pequeñas (640px)
          lg: '4rem', // Padding para pantallas grandes (1024px)
          xl: '5rem', // Padding para pantallas extra grandes (1280px)
          '2xl': '6rem', // Padding para pantallas 2XL (1536px)
        },
        screens: {
          sm: '640px', // Ancho máximo para pantallas pequeñas
          md: '768px', // Ancho máximo para pantallas medianas
          lg: '1024px', // Ancho máximo para pantallas grandes
          xl: '1280px', // Ancho máximo para pantallas extra grandes
          '2xl': '1536px', // Ancho máximo para pantallas 2XL
        },
        fontFamily: {
          sans: ['Lato', 'sans-serif'], // Reemplaza 'Roboto' con la fuente que hayas elegido
        },
      }
    },
  },
  plugins: [],
}

