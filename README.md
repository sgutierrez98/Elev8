<!-- ============================================================
     ELEV8 SPORTSWEAR - README.md
     ============================================================ -->

<div align="center">

<!-- Badges -->
![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/Servlets-6.0-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Kotlin](https://img.shields.io/badge/Kotlin-1.9-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)

<!-- Logo y Título -->
# 🏋️ ELEV8 SPORTSWEAR

### Tienda de Ropa Deportiva de Alto Rendimiento

**Sistema completo con Frontend Web, Backend Java, API REST y App Móvil Android**

[Características](#-características) •
[Tecnologías](#-tecnologías-utilizadas) •
[Instalación](#-instalación-y-configuración) •
[API](#-api-endpoints) •
[Pruebas](#-pruebas)

---

**Proyecto Formativo SENA - ADSO**  
**GA6-220501096-AA4-EV03 | GA7 | GA8 | GA9**

</div>

---

## 📌 **Descripción del Proyecto**

**Elev8 Sportswear** es una solución de software completa para la gestión de una tienda de ropa deportiva de alto rendimiento. El sistema implementa una **arquitectura de tres capas** que integra:

- 🌐 **Frontend Web** con React (SPA) y JSP
- ☕ **Backend Java** con Servlets y JSP
- 🚀 **API REST** con Node.js y Express
- 📱 **App Móvil Android** con Kotlin
- 🗄️ **Bases de datos** PostgreSQL y MongoDB

La aplicación permite a los usuarios **explorar productos, agregar al carrito, realizar compras y gestionar su cuenta**, mientras que los administradores pueden **gestionar productos, categorías y pedidos**.

---

## 🎯 **Características**

### 👤 **Módulo de Autenticación**
- ✅ Registro de usuarios con validación de email único
- ✅ Inicio de sesión con JWT (JSON Web Tokens)
- ✅ Cierre de sesión seguro
- ✅ Hash de contraseñas con BCrypt
- ✅ Roles de usuario (USER / ADMIN)

### 🛍️ **Módulo de Productos**
- ✅ Catálogo completo de productos
- ✅ Filtros por categoría, precio y valoración
- ✅ Búsqueda de productos
- ✅ Productos populares y en oferta
- ✅ Detalle de producto con imágenes y especificaciones
- ✅ CRUD de productos (solo administradores)

### 🛒 **Módulo de Carrito**
- ✅ Agregar productos al carrito
- ✅ Actualizar cantidades
- ✅ Eliminar productos
- ✅ Vaciar carrito
- ✅ Cálculo automático de subtotal y envío
- ✅ Persistencia en sesión

### 📦 **Módulo de Pedidos**
- ✅ Creación de pedidos desde el carrito
- ✅ Generación de número de pedido único
- ✅ Historial de pedidos del usuario
- ✅ Cancelación de pedidos
- ✅ Estados de pedido (PENDING, PAID, SHIPPED, DELIVERED, CANCELLED)

### 🎨 **Módulo de Administración**
- ✅ Panel de administración
- ✅ Gestión de productos (crear, editar, eliminar)
- ✅ Gestión de categorías
- ✅ Visualización de pedidos
- ✅ Dashboard con estadísticas

### 📱 **App Móvil Android**
- ✅ Pantalla de bienvenida
- ✅ Listado de productos desde API
- ✅ Navegación entre pantallas
- ✅ Diseño responsive con Material Design

---

## 🛠️ **Tecnologías Utilizadas**

### **Frontend Web**
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| React | 18.2.0 | Biblioteca para interfaces de usuario |
| React Router | 6.28.1 | Enrutamiento SPA |
| Axios | 1.7.9 | Cliente HTTP |
| CSS3 | - | Estilos personalizados |
| JSP | 3.1.1 | Java Server Pages |
| JSTL | 3.0.0 | JSP Standard Tag Library |

### **Backend Java**
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| Java | 17 | Lenguaje de programación |
| Jakarta Servlet | 6.0.0 | API de Servlets |
| Maven | 3.9+ | Gestor de dependencias |
| Apache Tomcat | 10.1+ | Servidor de aplicaciones |

### **API REST**
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| Node.js | 18.x | Entorno de ejecución |
| Express | 4.18.2 | Framework web |
| MongoDB | 6.x | Base de datos NoSQL |
| Mongoose | 8.0.0 | ODM para MongoDB |
| JWT | 9.0.2 | Autenticación con tokens |
| BCrypt | 5.1.1 | Hash de contraseñas |

### **App Móvil**
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| Kotlin | 1.9.0 | Lenguaje de programación |
| Android SDK | API 34 | SDK de Android |
| Retrofit | 2.9.0 | Cliente HTTP para Android |
| Coroutines | 1.7.3 | Programación asíncrona |
| Material Design | 1.11.0 | Componentes de UI |

### **Base de Datos**
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| PostgreSQL | 15+ | Base de datos relacional |
| MongoDB | 6+ | Base de datos NoSQL |

### **Herramientas de Desarrollo**
| Herramienta | Descripción |
|-------------|-------------|
| Git | Control de versiones |
| GitHub | Repositorio remoto |
| Visual Studio Code | IDE principal |
| Android Studio | IDE para Android |
| Postman | Testing de API |
| MongoDB Compass | GUI para MongoDB |
| pgAdmin | GUI para PostgreSQL |

---

## 🏗️ **Arquitectura del Sistema**
┌─────────────────────────────────────────────────────────────────────────────┐
│ ELEV8 SPORTSWEAR │
│ Arquitectura por Capas │
├─────────────────────────────────────────────────────────────────────────────┤
│ │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ CAPA DE PRESENTACIÓN │ │
│ │ ┌──────────────────────────────┐ ┌──────────────────────────────┐ │ │
│ │ │ REACT (SPA) │ │ JSP (Servidor) │ │ │
│ │ │ - Componentes (Atoms/Mol/Org)│ │ - Vistas (JSP) │ │ │
│ │ │ - Pages (7) │ │ - Fragments (Navbar/Footer) │ │ │
│ │ │ - Services (4) │ │ - Admin Dashboard │ │ │
│ │ └──────────────────────────────┘ └──────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│ │ │
│ ▼ │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ CAPA DE SERVICIOS │ │
│ │ ┌──────────────────────────────────────────────────────────────┐ │ │
│ │ │ API NODE.JS (REST) │ │ │
│ │ │ - Controllers (5) - Models (5) - Routes (5) │ │ │
│ │ │ - Middleware (1) - Express - JWT Auth │ │ │
│ │ └──────────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│ │ │
│ ▼ │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ CAPA DE NEGOCIO │ │
│ │ ┌──────────────────────────────────────────────────────────────┐ │ │
│ │ │ SERVICIOS JAVA │ │ │
│ │ │ - Services (4) - DTOs (4) - Factory (1) │ │ │
│ │ │ - Validadores - Reglas de Negocio │ │ │
│ │ └──────────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│ │ │
│ ▼ │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ CAPA DE PERSISTENCIA │ │
│ │ ┌──────────────────────────────┐ ┌──────────────────────────────┐ │ │
│ │ │ PostgreSQL (SQL) │ │ MongoDB (NoSQL) │ │ │
│ │ │ - Users │ │ - Users (Auth) │ │ │
│ │ │ - Products │ │ - Products │ │ │
│ │ │ - Categories │ │ - Categories │ │ │
│ │ │ - Orders │ │ - Carts │ │ │
│ │ │ - Order_Items │ │ - Orders │ │ │
│ │ └──────────────────────────────┘ └──────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│ │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ APP MÓVIL ANDROID │ │
│ │ ┌──────────────────────────────────────────────────────────────┐ │ │
│ │ │ - Kotlin + Android Studio │ │ │
│ │ │ - Consume API REST (Node.js) │ │ │
│ │ │ - Lista de productos funcional │ │ │
│ │ └──────────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────────────────────┘

---

## 📁 **Estructura del Proyecto**
Elev8/
│
├── 📁 api/ # API REST (Node.js + Express + MongoDB)
│ ├── 📁 src/
│ │ ├── 📁 config/
│ │ │ └── 📄 database.js
│ │ ├── 📁 models/
│ │ │ ├── 📄 User.js
│ │ │ ├── 📄 Product.js
│ │ │ ├── 📄 Category.js
│ │ │ ├── 📄 Cart.js
│ │ │ └── 📄 Order.js
│ │ ├── 📁 controllers/
│ │ │ ├── 📄 authController.js
│ │ │ ├── 📄 productController.js
│ │ │ ├── 📄 categoryController.js
│ │ │ ├── 📄 cartController.js
│ │ │ └── 📄 orderController.js
│ │ ├── 📁 middleware/
│ │ │ └── 📄 auth.js
│ │ ├── 📁 routes/
│ │ │ ├── 📄 authRoutes.js
│ │ │ ├── 📄 productRoutes.js
│ │ │ ├── 📄 categoryRoutes.js
│ │ │ ├── 📄 cartRoutes.js
│ │ │ └── 📄 orderRoutes.js
│ │ └── 📄 app.js
│ ├── 📄 .env.example
│ ├── 📄 package.json
│ ├── 📄 README.md
│ └── 📄 ENDPOINT.md
│
├── 📁 src/ # Backend Java (Servlets + JSP)
│ ├── 📁 main/
│ │ ├── 📁 java/
│ │ │ └── 📁 com/elev8/
│ │ │ ├── 📁 presentation/
│ │ │ │ ├── 📁 controller/
│ │ │ │ └── 📁 view/
│ │ │ ├── 📁 business/
│ │ │ │ ├── 📁 service/
│ │ │ │ ├── 📁 dto/
│ │ │ │ └── 📁 factory/
│ │ │ ├── 📁 persistence/
│ │ │ │ ├── 📁 dao/
│ │ │ │ └── 📁 model/
│ │ │ └── 📁 security/
│ │ │ ├── 📁 auth/
│ │ │ └── 📁 config/
│ │ ├── 📁 resources/
│ │ │ ├── 📄 db.properties
│ │ │ └── 📁 db/
│ │ │ └── 📄 schema.sql
│ │ └── 📁 webapp/
│ │ ├── 📁 WEB-INF/
│ │ ├── 📁 admin/
│ │ ├── 📁 css/
│ │ ├── 📁 js/
│ │ ├── 📄 index.jsp
│ │ ├── 📄 catalogue.jsp
│ │ ├── 📄 product.jsp
│ │ ├── 📄 cart.jsp
│ │ ├── 📄 checkout.jsp
│ │ ├── 📄 login.jsp
│ │ └── 📄 register.jsp
│ └── 📁 test/
│ └── 📁 java/
│ └── 📁 com/elev8/
│
├── 📁 src/main/frontend/ # Frontend React
│ ├── 📁 src/
│ │ ├── 📁 components/
│ │ │ ├── 📁 atoms/
│ │ │ ├── 📁 molecules/
│ │ │ └── 📁 organisms/
│ │ ├── 📁 pages/
│ │ ├── 📁 services/
│ │ ├── 📁 hooks/
│ │ ├── 📁 context/
│ │ ├── 📁 styles/
│ │ ├── 📁 utils/
│ │ ├── 📄 App.js
│ │ └── 📄 index.js
│ ├── 📄 package.json
│ └── 📄 .env
│
├── 📁 app/ # App Móvil Android
│ └── 📁 src/main/java/com/elev8/sportswear/
│ ├── 📄 MainActivity.kt
│ ├── 📄 ProductListActivity.kt
│ ├── 📄 ProductAdapter.kt
│ └── 📁 data/
│ ├── 📁 model/
│ └── 📁 network/
│
├── 📄 pom.xml # Dependencias Maven
├── 📄 schema.sql # Script PostgreSQL
├── 📄 .gitignore # Archivos ignorados por Git
├── 📄 README.md # Documentación principal
└── 📄 ENLACE_REPOSITORIO.txt # Enlace al repositorio

---

## 📋 **Requisitos Previos**

Antes de comenzar, asegúrate de tener instalado:

| Software | Versión Mínima | Verificación |
|----------|----------------|--------------|
| Java JDK | 17 | `java -version` |
| Maven | 3.9+ | `mvn -version` |
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| PostgreSQL | 15+ | `psql --version` |
| MongoDB | 6+ | `mongod --version` |
| Apache Tomcat | 10.1+ | - |
| Git | 2.40+ | `git --version` |
| Android Studio | Última | - |

---

## 🚀 **Instalación y Configuración**

### **1. Clonar el repositorio**

```bash
git clone https://github.com/sgutierrez98/Elev8.git
cd Elev8 2. Configurar PostgreSQL
bash
# Iniciar PostgreSQL
net start postgresql-x64-15

# Crear la base de datos y las tablas
psql -U postgres -f schema.sql
3. Configurar MongoDB
bash
# Iniciar MongoDB
net start MongoDB

# O manualmente
mongod --dbpath "C:\data\db"
4. Configurar la API Node.js
bash
cd api

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Editar .env con tus credenciales
notepad .env
Contenido del .env:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elev8_db
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:8080
5. Configurar el Backend Java
bash
# Editar configuración de base de datos
cd src/main/resources
notepad db.properties
Contenido del db.properties:

properties
db.driver=org.postgresql.Driver
db.url=jdbc:postgresql://localhost:5432/elev8_db
db.username=postgres
db.password=123456
db.pool.size=5
db.pool.maxSize=15
db.pool.timeout=30000
6. Configurar el Frontend React
bash
cd src/main/frontend

# Instalar dependencias
npm install

# Crear archivo .env
echo PUBLIC_URL=/elev8/react > .env
echo REACT_APP_API_URL=http://localhost:8080/elev8 >> .env
echo REACT_APP_AUTH_URL=http://localhost:5000 >> .env

```markdown
---

## ▶️ **Ejecución del Proyecto**

### **Opción 1: Scripts automatizados (Recomendado)**

```bash
# Iniciar todos los servicios
./start-all.bat

# Detener todos los servicios
./stop-all.bat

# Compilar y desplegar
./build-deploy.bat
Opción 2: Manual (Paso a paso)
2.1 Iniciar la API Node.js
bash
cd api
npm start
Deberías ver:

text
✅ Servidor API corriendo en http://localhost:5000
📋 Endpoints disponibles:
   🔐 Auth: http://localhost:5000/api/auth
   📦 Products: http://localhost:5000/api/products
   🛒 Cart: http://localhost:5000/api/cart
   📋 Orders: http://localhost:5000/api/orders
2.2 Compilar y desplegar el Backend Java
bash
# Compilar
mvn clean package

# Copiar WAR a Tomcat
copy target\elev8.war "C:\Program Files\Apache Software Foundation\Tomcat 10.0\webapps\"

# Iniciar Tomcat
cd "C:\Program Files\Apache Software Foundation\Tomcat 10.0\bin"
catalina.bat run
2.3 Iniciar el Frontend React
bash
cd src/main/frontend
npm start
3. Acceder a la aplicación
Servicio	URL
Backend Java	http://localhost:8080/elev8/
API Node.js	http://localhost:5000/
React (Desarrollo)	http://localhost:3000/
React (Producción)	http://localhost:8080/elev8/react/
🔌 API Endpoints
Autenticación
Método	Endpoint	Descripción	Autenticación
POST	/api/auth/register	Registro de usuario	❌ Pública
POST	/api/auth/login	Inicio de sesión	❌ Pública
GET	/api/auth/verify	Verificar token	✅ Privada
GET	/api/auth/profile	Obtener perfil	✅ Privada
PUT	/api/auth/profile	Actualizar perfil	✅ Privada
Productos
Método	Endpoint	Descripción	Autenticación
GET	/api/products	Listar productos	❌ Pública
GET	/api/products/popular	Productos populares	❌ Pública
GET	/api/products/onsale	Productos en oferta	❌ Pública
GET	/api/products/:id	Detalle de producto	❌ Pública
GET	/api/products/related/:id	Productos relacionados	❌ Pública
POST	/api/products	Crear producto	✅ Admin
PUT	/api/products/:id	Actualizar producto	✅ Admin
DELETE	/api/products/:id	Eliminar producto	✅ Admin
Carrito
Método	Endpoint	Descripción	Autenticación
GET	/api/cart	Obtener carrito	✅ Privada
POST	/api/cart/items	Agregar al carrito	✅ Privada
PUT	/api/cart/items/:index	Actualizar item	✅ Privada
DELETE	/api/cart/items/:index	Eliminar item	✅ Privada
DELETE	/api/cart/clear	Vaciar carrito	✅ Privada
Pedidos
Método	Endpoint	Descripción	Autenticación
POST	/api/orders	Crear pedido	✅ Privada
GET	/api/orders	Listar pedidos	✅ Privada
GET	/api/orders/:id	Obtener pedido	✅ Privada
PUT	/api/orders/:id/cancel	Cancelar pedido	✅ Privada
Ejemplo de uso
bash
# Registro
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@elev8.com","password":"123456","firstName":"Test"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@elev8.com","password":"123456"}'

# Obtener productos
curl http://localhost:5000/api/products
🧪 Pruebas
Pruebas Unitarias
bash
# Java (JUnit 5)
mvn test

# React (Jest)
cd src/main/frontend
npm test

# Node.js (Mocha)
cd api
npm test
Pruebas de Integración
Las pruebas de integración se realizan con Postman:

Importar la colección: Elev8_API_Tests.json

Configurar el entorno: Elev8 Local

Ejecutar las pruebas

Resultados:

✅ 10 pruebas ejecutadas

✅ 10 pruebas aprobadas

✅ 100% de éxito

Casos de Prueba
#	Caso	Endpoint	Resultado
001	Registro de Usuario	POST /api/auth/register	✅ Aprobado
002	Inicio de Sesión	POST /api/auth/login	✅ Aprobado
003	Verificación de Token	GET /api/auth/verify	✅ Aprobado
004	Listar Productos	GET /api/products	✅ Aprobado
005	Detalle de Producto	GET /api/products/:id	✅ Aprobado
006	Agregar al Carrito	POST /api/cart/items	✅ Aprobado
007	Obtener Carrito	GET /api/cart	✅ Aprobado
008	Crear Pedido	POST /api/orders	✅ Aprobado
009	Error de Login	POST /api/auth/login	✅ Aprobado
010	Error de Registro Duplicado	POST /api/auth/register	✅ Aprobado
🚢 Despliegue
Despliegue Local
bash
# 1. Compilar el proyecto
mvn clean package

# 2. Desplegar en Tomcat
cp target/elev8.war "C:\Program Files\Apache Software Foundation\Tomcat 10.0\webapps\"

# 3. Iniciar Tomcat
cd "C:\Program Files\Apache Software Foundation\Tomcat 10.0\bin"
catalina.bat run
