Archivo ENDPOINT - API de Autenticación
Elev8 Sportswear - API Endpoints
📋 Resumen de Endpoints
#	Método	Endpoint	Descripción	Autenticación
1	POST	/api/auth/register	Registro de nuevo usuario	❌ Pública
2	POST	/api/auth/login	Inicio de sesión	❌ Pública
3	GET	/api/auth/verify	Verificar token JWT	✅ Privada
4	GET	/api/auth/profile	Obtener perfil de usuario	✅ Privada
5	PUT	/api/auth/profile	Actualizar perfil de usuario	✅ Privada
6	POST	/api/auth/logout	Cerrar sesión	✅ Privada
📄 1. Registro de Usuario
POST /api/auth/register
Registra un nuevo usuario en la plataforma.

Headers
Header	Valor	Obligatorio
Content-Type	application/json	✅ Sí
Body (JSON)
Campo	Tipo	Obligatorio	Descripción
email	string	✅ Sí	Correo electrónico del usuario
password	string	✅ Sí	Contraseña (mínimo 6 caracteres)
firstName	string	✅ Sí	Nombre del usuario
lastName	string	❌ No	Apellido del usuario
phone	string	❌ No	Número de teléfono
Ejemplo de Petición
http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
    "email": "juan.perez@elev8.com",
    "password": "123456",
    "firstName": "Juan",
    "lastName": "Pérez",
    "phone": "3101234567"
}
Respuesta Exitosa (201 Created)
json
{
    "success": true,
    "message": "Usuario registrado correctamente",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "65f7a1b2c3d4e5f6g7h8i9j0",
        "email": "juan.perez@elev8.com",
        "firstName": "Juan",
        "lastName": "Pérez",
        "phone": "3101234567",
        "role": "USER",
        "isActive": true,
        "createdAt": "2024-09-05T14:30:00.000Z",
        "updatedAt": "2024-09-05T14:30:00.000Z"
    }
}
Respuestas de Error
400 Bad Request - Email Duplicado

json
{
    "success": false,
    "message": "El correo electrónico ya está registrado"
}
400 Bad Request - Campos Faltantes

json
{
    "success": false,
    "message": "Faltan campos obligatorios: email, password, firstName"
}
400 Bad Request - Contraseña Corta

json
{
    "success": false,
    "message": "La contraseña debe tener al menos 6 caracteres"
}
500 Internal Server Error

json
{
    "success": false,
    "message": "Error al registrar usuario",
    "error": "Mensaje de error detallado"
}
📄 2. Inicio de Sesión
POST /api/auth/login
Inicia sesión de un usuario registrado.

Headers
Header	Valor	Obligatorio
Content-Type	application/json	✅ Sí
Body (JSON)
Campo	Tipo	Obligatorio	Descripción
email	string	✅ Sí	Correo electrónico del usuario
password	string	✅ Sí	Contraseña del usuario
Ejemplo de Petición
http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
    "email": "juan.perez@elev8.com",
    "password": "123456"
}
Respuesta Exitosa (200 OK)
json
{
    "success": true,
    "message": "Autenticación satisfactoria",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "65f7a1b2c3d4e5f6g7h8i9j0",
        "email": "juan.perez@elev8.com",
        "firstName": "Juan",
        "lastName": "Pérez",
        "phone": "3101234567",
        "role": "USER",
        "isActive": true,
        "lastLogin": "2024-09-05T15:30:00.000Z"
    }
}
Respuestas de Error
401 Unauthorized - Credenciales Incorrectas

json
{
    "success": false,
    "message": "Correo o contraseña incorrectos"
}
400 Bad Request - Campos Faltantes

json
{
    "success": false,
    "message": "Email y contraseña son obligatorios"
}
401 Unauthorized - Usuario Inactivo

json
{
    "success": false,
    "message": "Usuario desactivado. Contacta al administrador."
}
📄 3. Verificar Token
GET /api/auth/verify
Verifica si un token JWT es válido y devuelve los datos del usuario.

Headers
Header	Valor	Obligatorio
Authorization	Bearer <token>	✅ Sí
Ejemplo de Petición
http
GET http://localhost:5000/api/auth/verify
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Respuesta Exitosa (200 OK)
json
{
    "success": true,
    "user": {
        "_id": "65f7a1b2c3d4e5f6g7h8i9j0",
        "email": "juan.perez@elev8.com",
        "firstName": "Juan",
        "lastName": "Pérez",
        "phone": "3101234567",
        "role": "USER",
        "isActive": true
    }
}
Respuestas de Error
401 Unauthorized - Token No Proporcionado

json
{
    "success": false,
    "message": "Token no proporcionado. Acceso denegado."
}
401 Unauthorized - Token Inválido

json
{
    "success": false,
    "message": "Token inválido"
}
401 Unauthorized - Token Expirado

json
{
    "success": false,
    "message": "Token expirado. Inicia sesión nuevamente."
}
📄 4. Obtener Perfil
GET /api/auth/profile
Obtiene el perfil completo del usuario autenticado.

Headers
Header	Valor	Obligatorio
Authorization	Bearer <token>	✅ Sí
Ejemplo de Petición
http
GET http://localhost:5000/api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Respuesta Exitosa (200 OK)
json
{
    "success": true,
    "user": {
        "_id": "65f7a1b2c3d4e5f6g7h8i9j0",
        "email": "juan.perez@elev8.com",
        "firstName": "Juan",
        "lastName": "Pérez",
        "phone": "3101234567",
        "role": "USER",
        "isActive": true,
        "createdAt": "2024-09-05T14:30:00.000Z",
        "updatedAt": "2024-09-05T14:30:00.000Z",
        "lastLogin": "2024-09-05T15:30:00.000Z"
    }
}
Respuestas de Error
401 Unauthorized - Token No Proporcionado

json
{
    "success": false,
    "message": "Token no proporcionado. Acceso denegado."
}
404 Not Found - Usuario No Encontrado

json
{
    "success": false,
    "message": "Usuario no encontrado"
}
📄 5. Actualizar Perfil
PUT /api/auth/profile
Actualiza el perfil del usuario autenticado.

Headers
Header	Valor	Obligatorio
Content-Type	application/json	✅ Sí
Authorization	Bearer <token>	✅ Sí
Body (JSON)
Campo	Tipo	Obligatorio	Descripción
firstName	string	❌ No	Nuevo nombre
lastName	string	❌ No	Nuevo apellido
phone	string	❌ No	Nuevo teléfono
Ejemplo de Petición
http
PUT http://localhost:5000/api/auth/profile
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
    "firstName": "Juan Carlos",
    "phone": "3109876543"
}
Respuesta Exitosa (200 OK)
json
{
    "success": true,
    "message": "Perfil actualizado correctamente",
    "user": {
        "_id": "65f7a1b2c3d4e5f6g7h8i9j0",
        "email": "juan.perez@elev8.com",
        "firstName": "Juan Carlos",
        "lastName": "Pérez",
        "phone": "3109876543",
        "role": "USER",
        "isActive": true,
        "updatedAt": "2024-09-05T16:00:00.000Z"
    }
}
📄 6. Cerrar Sesión
POST /api/auth/logout
Cierra la sesión del usuario (invalida el token en el lado del cliente).

Headers
Header	Valor	Obligatorio
Authorization	Bearer <token>	✅ Sí
Ejemplo de Petición
http
POST http://localhost:5000/api/auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Respuesta Exitosa (200 OK)
json
{
    "success": true,
    "message": "Sesión cerrada correctamente"
}
Respuestas de Error
401 Unauthorized - Token No Proporcionado

json
{
    "success": false,
    "message": "Token no proporcionado"
}
📊 Tabla de Códigos de Estado
Código	Significado	Uso
200	OK	Petición exitosa
201	Created	Recurso creado exitosamente
400	Bad Request	Error en los datos enviados
401	Unauthorized	No autenticado o token inválido
403	Forbidden	No autorizado (permisos insuficientes)
404	Not Found	Recurso no encontrado
500	Internal Server Error	Error en el servidor
📋 Ejemplos de Uso con cURL
Registro de Usuario
bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@elev8.com","password":"123456","firstName":"Test","lastName":"User"}'
Inicio de Sesión
bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@elev8.com","password":"123456"}'
Verificar Token
bash
curl -X GET http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer <TOKEN>"
Obtener Perfil
bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <TOKEN>"
📁 Colección Postman
Variables de Entorno
Variable	Valor	Descripción
baseUrl	http://localhost:5000	URL base de la API
authToken	<token>	Token JWT obtenido en login
Importar Colección
json
{
  "info": {
    "name": "Elev8 Auth API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"email\": \"usuario@elev8.com\",\n    \"password\": \"123456\",\n    \"firstName\": \"Nombre\",\n    \"lastName\": \"Apellido\",\n    \"phone\": \"3101234567\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/auth/register",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "register"]
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"email\": \"usuario@elev8.com\",\n    \"password\": \"123456\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/auth/login",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "login"]
        }
      }
    },
    {
      "name": "Verify Token",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{authToken}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/auth/verify",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "verify"]
        }
      }
    },
    {
      "name": "Get Profile",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{authToken}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/auth/profile",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "profile"]
        }
      }
    }
  ]
}
<div style="text-align: center; margin-top: 40px;">
Fin del Archivo ENDPOINT

</div>
