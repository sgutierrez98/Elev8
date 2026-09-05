<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard – Elev8 Sportswear</title>
    <link rel="stylesheet" href="<c:url value='/css/main.css' />">
</head>
<body>
    <jsp:include page="/fragments/navbar.jsp" />

    <main class="page-content">
        <div class="container">
            <c:if test="${not sessionScope.isLoggedIn}">
                <div class="alert alert-danger" style="margin-bottom:1rem;">
                    <span>🔒</span>
                    <span>Debes iniciar sesión para acceder al panel de administración.</span>
                </div>
                <a href="<c:url value='/login' />" class="btn btn-primary">Iniciar sesión</a>
                <jsp:include page="/fragments/footer.jsp" />
                </body></html>
                <% return; %>
            </c:if>

            <c:if test="${sessionScope.user.role != 'ADMIN'}">
                <div class="alert alert-danger" style="margin-bottom:1rem;">
                    <span>🚫</span>
                    <span>No tienes permisos de administrador.</span>
                </div>
                <a href="<c:url value='/' />" class="btn btn-primary">Volver al inicio</a>
                <jsp:include page="/fragments/footer.jsp" />
                </body></html>
                <% return; %>
            </c:if>

            <h1 style="font-size:var(--text-3xl);font-weight:900;color:var(--navy);margin-bottom:2rem;">Dashboard</h1>

            <c:if test="${not empty sessionScope.successMessage}">
                <div class="alert alert-success" style="margin-bottom:1rem;">
                    <span>✅</span>
                    <span>${sessionScope.successMessage}</span>
                </div>
                <c:remove var="successMessage" scope="session" />
            </c:if>

            <div class="grid-3" style="margin-bottom:2rem;">
                <div class="card" style="padding:1.5rem;text-align:center;">
                    <div style="font-size:2rem;">📦</div>
                    <h3 style="font-size:1.5rem;font-weight:900;color:var(--navy);">${totalProducts}</h3>
                    <p style="color:var(--gray-500);">Productos</p>
                </div>
                <div class="card" style="padding:1.5rem;text-align:center;">
                    <div style="font-size:2rem;">👥</div>
                    <h3 style="font-size:1.5rem;font-weight:900;color:var(--navy);">${totalUsers}</h3>
                    <p style="color:var(--gray-500);">Usuarios</p>
                </div>
                <div class="card" style="padding:1.5rem;text-align:center;">
                    <div style="font-size:2rem;">📊</div>
                    <h3 style="font-size:1.5rem;font-weight:900;color:var(--navy);">${totalOrders}</h3>
                    <p style="color:var(--gray-500);">Pedidos</p>
                </div>
            </div>

            <div style="display:flex;gap:1rem;flex-wrap:wrap;">
                <a href="<c:url value='/admin/products' />" class="btn btn-primary">Gestionar Productos</a>
                <a href="<c:url value='/admin/users' />" class="btn btn-secondary">Gestionar Usuarios</a>
                <a href="<c:url value='/admin/orders' />" class="btn btn-secondary">Gestionar Pedidos</a>
            </div>
        </div>
    </main>

    <jsp:include page="/fragments/footer.jsp" />

    <script src="<c:url value='/js/main.js' />"></script>
</body>
</html>