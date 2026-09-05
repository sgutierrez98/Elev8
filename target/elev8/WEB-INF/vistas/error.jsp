<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Elev8 Sportswear - Error</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
</head>
<body>
<header>
    <h1>ELEV8 <span>SPORTSWEAR</span> — Modulo Web de Productos</h1>
</header>
<main>
    <h2>Ha ocurrido un error</h2>
    <p class="mensaje-error">${mensajeError}</p>
    <a class="boton" href="${pageContext.request.contextPath}/productos?accion=listar">
        Volver al listado
    </a>
</main>
</body>
</html>
