# Elev8 Sportswear — Módulo de Gestión de Productos

**Evidencia:** GA7-220501096-AA2-EV01 — Codificación de módulos del software
**Aprendiz:** Fabián Santiago Gutiérrez
**Programa:** Análisis y Desarrollo de Software (ADSO) — Ficha 3186615
**Servicio Nacional de Aprendizaje (SENA)**

## 1. Descripción

Este módulo corresponde a la codificación de la funcionalidad de **gestión
del catálogo de productos** de la plataforma de comercio electrónico
**Elev8 Sportswear**. Implementa las cuatro operaciones básicas exigidas
(CRUD: insertar, consultar, actualizar y eliminar) sobre la entidad
`Producto`, conectando a una base de datos **PostgreSQL** mediante
**JDBC (Java Database Connectivity)**.

## 2. Relación con artefactos previos del ciclo de vida del software

| Artefacto previo | Relación con este módulo |
|---|---|
| Diagrama de clases | La clase `Producto` (paquete `modelo`) corresponde a la clase de dominio "Producto" definida en el diagrama de clases. |
| Diagrama de casos de uso | CU-01 Registrar producto, CU-02 Consultar producto(s), CU-03 Actualizar producto, CU-04 Eliminar producto → implementados en `MenuPrincipal` y `ProductoDAO`. |
| Historias de usuario | HU relacionadas con la administración del catálogo (alta, consulta, edición y baja de productos) por parte del rol Administrador. |
| Modelo relacional / ER | La tabla `productos` (script `database/script_creacion_tabla.sql`) respeta los atributos y tipos de dato definidos en el diseño de la base de datos. |
| Informe técnico de plan de trabajo | Tecnologías seleccionadas: Java + JDBC + PostgreSQL para la capa de acceso a datos del backend, en línea con el stack general del proyecto Elev8. |

> **Nota:** el stack principal de Elev8 Sportswear usa Node.js/Express y
> PostgreSQL para el backend. Este módulo se codifica en Java + JDBC por
> ser el lenguaje/tecnología de acceso a datos abordado en el componente
> formativo de esta evidencia (AA2-EV01), y puede tomarse como referencia
> del módulo de acceso a datos o adaptarse como microservicio independiente.

## 3. Estructura del proyecto

```
Elev8_ModuloProductos/
├── pom.xml
├── README.md
├── .gitignore
├── database/
│   └── script_creacion_tabla.sql
└── src/main/
    ├── java/com/elev8/sportswear/
    │   ├── modelo/
    │   │   └── Producto.java
    │   ├── conexion/
    │   │   └── ConexionBD.java
    │   ├── dao/
    │   │   ├── IProductoDAO.java
    │   │   └── ProductoDAO.java
    │   └── vista/
    │       └── MenuPrincipal.java
    └── resources/
        └── config.properties
```

## 4. Estándares de codificación aplicados

| Elemento | Convención | Ejemplo |
|---|---|---|
| Paquetes | minúsculas, dominio invertido | `com.elev8.sportswear.dao` |
| Clases e interfaces | PascalCase | `ProductoDAO`, `IProductoDAO` |
| Métodos | camelCase, verbo + sustantivo | `insertarProducto()`, `consultarProductoPorId()` |
| Variables | camelCase, descriptivas | `nombreProducto`, `stockDisponible` |
| Constantes | UPPER_SNAKE_CASE | `SQL_INSERTAR`, `ARCHIVO_CONFIGURACION` |
| Atributos de clase | privados + getters/setters | `private int idProducto;` |

Buenas prácticas adicionales:
- Uso de `PreparedStatement` en todas las consultas (previene inyección SQL).
- Uso de `try-with-resources` para el cierre automático de `Connection`,
  `PreparedStatement` y `ResultSet`.
- Separación en capas: modelo, acceso a datos (DAO), conexión y vista.
- Manejo explícito de excepciones (`SQLException`, `NumberFormatException`).

## 5. Configuración y ejecución

1. Crear la base de datos en PostgreSQL y ejecutar el script:
   `database/script_creacion_tabla.sql`.
2. Editar `src/main/resources/config.properties` con las credenciales
   reales del entorno:
   ```
   db.url=jdbc:postgresql://localhost:5432/elev8_sportswear_db
   db.user=postgres
   db.password=********
   ```
3. Compilar y ejecutar con Maven:
   ```
   mvn clean package
   mvn exec:java -Dexec.mainClass="com.elev8.sportswear.vista.MenuPrincipal"
   ```
   o ejecutar el jar generado:
   ```
   java -cp target/elev8-modulo-productos.jar:<ruta-driver-postgresql.jar> com.elev8.sportswear.vista.MenuPrincipal
   ```

## 6. Control de versiones

El proyecto se inicializó como repositorio Git local, con commits
independientes por capa (estructura, modelo, conexión, DAO, vista y
documentación), cumpliendo el requisito de uso de herramientas de
versionamiento. El enlace del repositorio remoto (GitHub) se encuentra
en el archivo `ENLACE_REPOSITORIO.txt`.
