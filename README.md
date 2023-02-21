# 🚀 Reactive TODO List - Componentes reactivos con RxJS 

Este repositorio ofrece una lista de TODOS reactiva construida con **Angular** y **RxJS**, 
con el propósito de servir de ejemplo para la creación de componentes reactivos.

Además, el repositorio sirve de ejemplo al artículo de mi blog que trata 
sobre [como construir componentes reactivos con RxJS](https://crisdev-blog.netlify.app/blog/02-rxjs-reactive-components/).

## ️🏗 Estructura del proyecto

El proyecto cuenta con una API REST construida en Node y Express, y un cliente SPA construido con Angular.

## 🤖 API REST

Primero debemos instalar las dependencias del proyecto con el comando

```bash
npm install
```

Para poner en marcha la API REST debemos ejecutar el comando 

```bash
npm start
```

La API cuenta además con una serie de tests e2e, que podemos ejecutar con

```
npm test
```

Por último, notar que la API REST no persiste los TODOS en una base de datos, por lo que no es necesario configurar
ningún servicio adicional.

## 🔥 Cliente SPA

Primero debemos instalar las dependencias del proyecto con el comando

```bash
npm install
```

Para poner en marcha el cliente SPA debemos ejecutar el comando 

```bash
npm start
```

Por último, notar que la API REST debe de estar operativa para que el cliente SPA funcione correctamente.
