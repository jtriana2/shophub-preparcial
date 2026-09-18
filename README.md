This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Decisiones de Arquitectura y Cambios del Parcial

### Punto 1 - evoluicion del contexto

En el preparcial el carrito era solamente un arreglo de productos. Para el parcial tuve que agregar cantidades, entonces cambié cada elemento para que tenga el producto y una propiedad quantity
Cuando se agrega un producto reviso primero si ya está en el carrito usando su id (esto porque aprovecho la impelementacion hecha en el pre parcial ). Si ya existe aumento la cantidad, y si no existe lo agrego con cantidad 1.

 Para eliminar productos utilizo filter y para vaciar el carrito simplemente regreso el estado a un arreglo vacío.

### Punto 2 - calculo de totales
tanto total items, como el total price se calculan directamente desde el carrito usando reduce.
Para saber cuántos productos hay sumo los quantity de los elementos. Para el precio total multiplico el precio de cada producto por su cantidad y voy acumulando esos valores.

### Punto 3 - arquitectura del formulairo

El checkout es un componente de cliente porque utiliza estados y eventos de React. Los datos del formulario se guardan juntos dentro de un objeto form manejado con useState, siguiendo la estructura de formulario controlado (Que agarre de las presentaciones). Los inputs usan su atributo name y un handleChange común para actualizar el campo correspondiente. Para el checkbox se utiliza checked porque su valor es booleano, también utilizo un estado touched junto con onBlur para mostrar los errores después de que el usuario abandona el campo. La validación se calcula directamente a partir del estado del formulario y el envío utiliza preventDefault para evitar la recarga de la página.
