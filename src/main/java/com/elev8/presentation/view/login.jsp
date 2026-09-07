<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión – Elev8 Sportswear</title>
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/main.css">
</head>
<body>

    <jsp:include page="/WEB-INF/fragments/navbar.jsp" />

    <main class="page-content">
        <div class="container" style="max-width:480px;margin:60px auto;">
            <div style="background:var(--white);border-radius:var(--r-lg);padding:40px;box-shadow:var(--shadow-md);">
                <h1 style="font-size:1.8rem;font-weight:900;color:var(--navy);margin-bottom:8px;">Iniciar Sesión</h1>
                <p style="color:var(--gray-500);margin-bottom:24px;">Ingresa a tu cuenta para continuar</p>

                <c:if test="${not empty error}">
                    <div style="background:var(--red-light);color:var(--red-dark);padding:12px 16px;border-radius:var(--r-md);margin-bottom:16px;border-left:4px solid var(--red);">
                        ❌ ${error}
                    </div>
                </c:if>

                <c:if test="${not empty success}">
                    <div style="background:var(--green-light);color:var(--success);padding:12px 16px;border-radius:var(--r-md);margin-bottom:16px;border-left:4px solid var(--success);">
                        ✅ ${success}
                    </div>
                </c:if>

                <form action="${pageContext.request.contextPath}/login" method="post">
                    <div class="form-group">
                        <label class="form-label" for="email">Correo electrónico</label>
                        <input class="form-input" type="email" id="email" name="email" placeholder="tu@email.com" required autocomplete="email">
                    </div>

                    <div class="form-group" style="margin-top:16px;">
                        <label class="form-label" for="password">Contraseña</label>
                        <input class="form-input" type="password" id="password" name="password" placeholder="••••••••" required autocomplete="current-password">
                    </div>

                    <button type="submit" class="btn btn-primary btn-full btn-lg" style="margin-top:24px;">Iniciar sesión</button>
                </form>

                <p style="text-align:center;margin-top:16px;font-size:.875rem;color:var(--gray-500);">
                    ¿No tienes cuenta? <a href="${pageContext.request.contextPath}/register" style="color:var(--red);font-weight:600;">Regístrate aquí</a>
                </p>
            </div>
        </div>
    </main>

    <jsp:include page="/WEB-INF/fragments/footer.jsp" />

</body>
</html>