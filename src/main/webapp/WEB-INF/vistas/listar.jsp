<%-- 
    Vista de listado de productos - Elev8 Sportswear.
    Elementos de JSP utilizados:
      - Directiva taglib (JSTL core)
      - c:choose / c:when / c:otherwise
      - c:forEach para recorrer la lista de productos
      - Expression Language (EL) para acceder a los atributos de request
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Elev8 Sportswear - Listado de Productos</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
</head>
<body>
<header>
    <h1>ELEV8 <span>SPORTSWEAR</span> — Modulo Web de Productos</h1>
</header>
<main>
    <h2>Catalogo de productos</h2>

    <a class="boton" href="${pageContext.request.contextPath}/productos?accion=nuevo">
        + Nuevo producto
    </a>

    <c:choose>
        <c:when test="${empty listaProductos}">
            <p style="margin-top:20px;">No hay productos registrados todavia.</p>
        </c:when>
        <c:otherwise>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Talla</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                <c:forEach var="producto" items="${listaProductos}">
                    <tr>
                        <td>${producto.idProducto}</td>
                        <td>${producto.nombreProducto}</td>
                        <td>${producto.categoria}</td>
                        <td>${producto.talla}</td>
                        <td>${producto.marca}</td>
                        <td>$${producto.precioUnitario}</td>
                        <td>${producto.stockDisponible}</td>
                        <td>
                            <a class="enlace-accion"
                               href="${pageContext.request.contextPath}/productos?accion=editar&id=${producto.idProducto}">
                                Editar
                            </a>
                            <a class="enlace-accion eliminar"
                               href="${pageContext.request.contextPath}/eliminarProducto?id=${producto.idProducto}"
                               onclick="return confirm('¿Eliminar este producto del catalogo?');">
                                Eliminar
                            </a>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
        </c:otherwise>
    </c:choose>
</main>
</body>
</html>
