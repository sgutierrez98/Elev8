<%-- 
    Formulario HTML de registro/edicion de producto - Elev8 Sportswear.
    Este formulario se envia mediante metodo POST al ProductoServlet
    (atributo action="productos"), cumpliendo el requisito de
    "formularios HTML con servlets" y "uso de metodos GET y POST":
    la carga del formulario llega por GET (accion=nuevo/editar) y el
    envio de datos se procesa por POST (doPost del servlet).

    Elementos de JSP utilizados: taglib JSTL, c:if, c:choose, EL.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Elev8 Sportswear - Formulario de Producto</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
</head>
<body>
<header>
    <h1>ELEV8 <span>SPORTSWEAR</span> — Modulo Web de Productos</h1>
</header>
<main>
    <c:choose>
        <c:when test="${not empty producto}">
            <h2>Editar producto</h2>
        </c:when>
        <c:otherwise>
            <h2>Registrar nuevo producto</h2>
        </c:otherwise>
    </c:choose>

   
    <form action="${pageContext.request.contextPath}/productos" method="post">

      
        <input type="hidden" name="idProducto" value="${producto.idProducto}">

        <label for="nombreProducto">Nombre del producto</label>
        <input type="text" id="nombreProducto" name="nombreProducto"
               value="${producto.nombreProducto}" required>

        <label for="categoria">Categoria</label>
        <input type="text" id="categoria" name="categoria"
               value="${producto.categoria}" placeholder="Calzado, Camisetas, Accesorios..." required>

        <label for="talla">Talla</label>
        <input type="text" id="talla" name="talla" value="${producto.talla}" required>

        <label for="marca">Marca</label>
        <input type="text" id="marca" name="marca" value="${producto.marca}" required>

        <label for="precioUnitario">Precio unitario (COP)</label>
        <input type="number" id="precioUnitario" name="precioUnitario" step="0.01" min="0"
               value="${producto.precioUnitario}" required>

        <label for="stockDisponible">Stock disponible</label>
        <input type="number" id="stockDisponible" name="stockDisponible" min="0"
               value="${producto.stockDisponible}" required>

        <br><br>
        <button type="submit" class="boton">Guardar</button>
        <a class="boton boton-secundario" href="${pageContext.request.contextPath}/productos?accion=listar">
            Cancelar
        </a>
    </form>
</main>
</body>
</html>
