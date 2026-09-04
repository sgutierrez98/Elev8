<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Cuenta – Elev8 Sportswear</title>
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/main.css">
</head>
<body>

    <jsp:include page="/WEB-INF/fragments/navbar.jsp" />

    <main class="page-content">
        <div class="container" style="max-width:480px;margin:60px auto;">
            <div style="background:var(--white);border-radius:var(--r-lg);padding:40px;box-shadow:var(--shadow-md);">
                <h1 style="font-size:1.8rem;font-weight:900;color:var(--navy);margin-bottom:8px;">Crear Cuenta</h1>
                <p style="color:var(--gray-500);margin-bottom:24px;">Únete y obtén 10% en tu primera compra 🎁</p>

                <c:if test="${not empty error}">
                    <div style="background:var(--red-light);color:var(--red-dark);padding:12px 16px;border-radius:var(--r-md);margin-bottom:16px;border-left:4px solid var(--red);">
                        ❌ ${error}
                    </div>
                </c:if>

                <form action="${pageContext.request.contextPath}/register" method="post">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                        <div class="form-group">
                            <label class="form-label" for="firstName">Nombre *</label>
                            <input class="form-input" type="text" id="firstName" name="firstName" placeholder="Santiago" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="lastName">Apellido</label>
                            <input class="form-input" type="text" id="lastName" name="lastName" placeholder="García">
                        </div>
                    </div>

                    <div class="form-group" style="margin-top:16px;">
                        <label class="form-label" for="email">Correo electrónico *</label>
                        <input class="form-input" type="email" id="email" name="email" placeholder="tu@email.com" required>
                    </div>

                    <div class="form-group" style="margin-top:16px;">
                        <label class="form-label" for="phone">Teléfono</label>
                        <input class="form-input" type="tel" id="phone" name="phone" placeholder="310 123 4567">
                    </div>

                    <div class="form-group" style="margin-top:16px;">
                        <label class="form-label" for="password">Contraseña *</label>
                        <input class="form-input" type="password" id="password" name="password" placeholder="Mínimo 6 caracteres" required minlength="6">
                    </div>

                    <div class="form-group" style="margin-top:16px;">
                        <label class="form-label" for="confirmPassword">Confirmar contraseña *</label>
                        <input class="form-input" type="password" id="confirmPassword" name="confirmPassword" placeholder="Repite la contraseña" required>
                    </div>

                    <button type="submit" class="btn btn-primary btn-full btn-lg" style="margin-top:24px;">Crear cuenta gratuita</button>
                </form>

                <p style="text-align:center;margin-top:16px;font-size:.875rem;color:var(--gray-500);">
                    ¿Ya tienes cuenta? <a href="${pageContext.request.contextPath}/login" style="color:var(--red);font-weight:600;">Inicia sesión</a>
                </p>
            </div>
        </div>
    </main>

    <jsp:include page="/WEB-INF/fragments/footer.jsp" />

</body>
</html>