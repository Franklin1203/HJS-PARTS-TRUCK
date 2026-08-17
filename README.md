# HJS-PARTS-TRUCK-API

<p>
API RESTful robusta para la gestión de inventario de repuestos y órdenes de compra,  basado en la tienda de repuestos para camiones HJS-PARTS-TRUCK
</p>

### Para instalar y correr

>Instalar dependencias

```
npm install
```

>Levantar contenedor docker

```
docker compose up -d
```

>Correr proyecto

```
npm run dev
```

### Variables de entorno
```
PORT=3001
DB_HOST=localhost
DB_PORT=5433
DB_NAME=hjspartstruck
DB_USER=hjspartstruck_user
DB_PASSWORD=hjspartstruck_pass
JWT_SECRET=tu-clave-secreta
```


### Admin de prueba
<p>
   admin@hjspartstruck.com / admin123
</p>

### Endpoints para Autenticacion y Autorizacion de usuarios

>Para registrarse
```
POST http://localhost:3001/auth/register'
Body → raw → JSON:
{ "name": "usuario", "email": "usuario@talendig.com", "password": "usuario1234" }
```
>Para iniciar sesion 
```
POST http://localhost:3001/auth/login
Body → raw → JSON:
{  "email": "usuario@talendig.com", "password": "usuario1234" }
```

### Endpoints para manejar los productos

>Para obtener todos los productos
```
GET http://localhost:3001/product
```
>Para obtener producto por id
```
GET http://localhost:3001/product/id
```
>Para crear producto
```
POST http://localhost:3001/product  '
Body → raw → JSON:
{"name":  "testproduct", "descripcion":  "probando", "precio": 1500.00, "stock": 5, "categoryId": 1  }'
Header → Authorization: Bearer <token del usuario (member)>
```
>Para actualizar producto
```
PUT http://localhost:3001/product/id
Body → raw → JSON:
{"name":  "testproduct", "descripcion":  "probando otro", "precio": 1600.00, "stock":  8, "categoryId":  1  }
Header → Authorization: Bearer <token del usuario (member)>
```
>Para cambiar estado del producto
```
PATCH http://localhost:3001/product/id
Body → raw → JSON:
{"descontinuado": "true"}
Authorization: Bearer <token del usuario (admin)>
```

### Endpoints para manejar las ordenes

>Para obtener todas las ordenes
```
GET http://localhost:3001/order
```
>Para obtener orden por id
```
GET http://localhost:3001/order/id
```
>Para crear orden
```
POST http://localhost:3001/order
Body → raw → JSON:
{ products: [{ "productId": 1, "cantidad": 2,  "descuento": 10 }] }
Header → Authorization: Bearer <token del usuario (member)>
```

### Endpoints para manejar las categorias

>Para obtener todas las categorias
```
GET http://localhost:3001/category
```
>Para obtener categoria por id
```
GET http://localhost:3001/category/id
```
>Para crear categoria
```
POST http://localhost:3001/category
Body → raw → JSON:
{"name":  "categoriatest" }
Header → Authorization: Bearer <token del usuario (member)>
```
>Para actualizar categoria
```
PUT http://localhost:3001/category/id
Body → raw → JSON:
{"name":  "categoriaActualizada"  }
Header → Authorization: Bearer <token del usuario (member)>
```
