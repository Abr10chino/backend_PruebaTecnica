# BoldProductManager Backend

Este proyecto es el **backend de BoldProductManager**, construido con **Node.js**, **Express** y **MongoDB**.  
Su función principal es manejar **productos**, permitiendo crear, consultar y eliminar productos mediante endpoints REST.

---

## Estructura del proyecto

backend/
├─ config/
│  └─ server.js
│  └─ mongo.js
├─ src/
│  ├─ middlewares/
│  │  ├─ validate-PetitionLimit.js
│  │  └─ validateFields.js
│  ├─ products/
│  │  ├─ product.model.js
│  │  ├─ product.controller.js
│  │  └─ product.routes.js
└─ app.js

---

### Modelo de datos

**Producto (`Product`)**

| Campo       | Tipo   | Requerido | Descripción                         |
|------------|--------|-----------|--------------------------------------|
| id         | Number | Sí        | ID único del producto                |
| name       | String | Sí        | Nombre del producto                  |
| description| String | Sí        | Descripción del producto             |
| price      | Number | Sí        | Precio unitario                      |
| stock      | Number | Sí        | Cantidad disponible                  |
| category   | String | Sí        | Categoría del producto               |
| status     | String | No        | Estado del producto: ACTIVE/INACTIVE |

---

## Configuración

Servidor: server.js
Configura Express, middlewares, rutas y la conexión a MongoDB.

Base de datos: mongo.js
Se encarga de conectar a MongoDB usando Mongoose y maneja eventos de conexión, desconexión y reconexión.

Middlewares:

validate-PetitionLimit.js: Limita la cantidad de peticiones por IP.

validateFields.js: Valida los campos que vienen en las peticiones HTTP usando express-validator.

---

## Ruta Base

Todas las rutas están bajo /BoldProductManager/v1/products
