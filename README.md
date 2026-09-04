# ELEV8 SPORTSWEAR


## 📌 Descripción

ELEV8 SPORTSWEAR es una tienda de ropa deportiva de alto rendimiento desarrollada con **Java EE** (Servlets y JSP) y **PostgreSQL** como base de datos.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Versión |
|------------|---------|
| Java | 17 |
| Jakarta Servlet | 6.0.0 |
| Jakarta JSP | 3.1.1 |
| JSTL | 3.0.0 |
| PostgreSQL | 15+ |
| BCrypt | 0.4 |
| Maven | 3.9+ |
| Apache Tomcat | 10.1+ |

---

## 📁 Estructura del proyecto
Elev8/
├── .git/
├── .gitignore
├── README.md
├── pom.xml
├── schema.sql
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── elev8/
│       │           ├── config/
│       │           │   └── DatabaseConnection.java
│       │           ├── dao/
│       │           │   ├── ProductDAO.java
│       │           │   ├── UserDAO.java
│       │           │   └── OrderDAO.java
│       │           ├── model/
│       │           │   ├── Product.java
│       │           │   ├── User.java
│       │           │   ├── CartItem.java
│       │           │   ├── Order.java
│       │           │   └── OrderItem.java
│       │           ├── service/
│       │           │   ├── ProductService.java
│       │           │   ├── UserService.java
│       │           │   └── OrderService.java
│       │           └── servlet/
│       │               ├── HomeServlet.java
│       │               ├── CatalogueServlet.java
│       │               ├── ProductServlet.java
│       │               ├── CartServlet.java
│       │               ├── LoginServlet.java
│       │               ├── RegisterServlet.java
│       │               ├── LogoutServlet.java
│       │               └── CheckoutServlet.java
│       └── webapp/
│           ├── WEB-INF/
│           │   ├── web.xml
│           │   └── fragments/
│           │       ├── navbar.jsp
│           │       └── footer.jsp
│           ├── css/
│           │   └── main.css
│           ├── index.jsp
│           ├── catalogue.jsp
│           ├── product.jsp
│           ├── cart.jsp
│           ├── checkout.jsp
│           ├── login.jsp
│           └── register.jsp
└── target/
    └── elev8.war
    ---

## 🚀 Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/elev8-sportswear.git
cd elev8-sportswear