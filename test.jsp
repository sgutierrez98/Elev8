<html>
<head><title>Prueba Tomcat</title></head>
<body>
    <h1>¡Tomcat funciona correctamente!</h1>
    <p>Fecha y hora: <%= new java.util.Date() %></p>
    <p>Versión de Java: <%= System.getProperty("java.version") %></p>
</body>
</html>