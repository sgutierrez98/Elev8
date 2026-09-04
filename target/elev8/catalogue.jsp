<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo – Elev8 Sportswear</title>
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/main.css">
</head>
<body>

    <jsp:include page="/WEB-INF/fragments/navbar.jsp" />

    <main class="page-content">
        <div class="container">
            <h1 style="font-size:2rem;font-weight:900;color:var(--navy);margin:32px 0;">📦 Catálogo de Productos</h1>

            <c:if test="${not empty sessionScope.successMessage}">
                <div style="background:var(--green-light);color:var(--success);padding:12px 16px;border-radius:var(--r-md);margin-bottom:16px;border-left:4px solid var(--success);">
                    ✅ ${sessionScope.successMessage}
                </div>
                <c:remove var="successMessage" scope="session" />
            </c:if>

            <c:if test="${not empty sessionScope.errorMessage}">
                <div style="background:var(--red-light);color:var(--red-dark);padding:12px 16px;border-radius:var(--r-md);margin-bottom:16px;border-left:4px solid var(--red);">
                    ❌ ${sessionScope.errorMessage}
                </div>
                <c:remove var="errorMessage" scope="session" />
            </c:if>

            <p style="margin-bottom:20px;color:var(--gray-500);">${totalProducts} productos encontrados</p>

            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;">
                <c:forEach var="product" items="${products}">
                    <div style="background:var(--white);border-radius:var(--r-lg);box-shadow:var(--shadow-sm);overflow:hidden;transition:transform .2s, box-shadow .2s;" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='var(--shadow-sm)'">
                        <a href="<%= request.getContextPath() %>/product?id=${product.id}" style="text-decoration:none;color:inherit;">
                            <div style="background:var(--gray-100);aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:4rem;position:relative;">
                                ${product.emoji}
                                <c:if test="${not empty product.badge}">
                                    <span style="position:absolute;top:10px;left:10px;background:var(--red);color:var(--white);font-size:.7rem;padding:2px 10px;border-radius:var(--r-full);font-weight:700;">${product.badge}</span>
                                </c:if>
                                <c:if test="${product.discount > 0}">
                                    <span style="position:absolute;top:10px;right:10px;background:var(--success);color:var(--white);font-size:.7rem;padding:2px 10px;border-radius:var(--r-full);font-weight:700;">-${product.discount}%</span>
                                </c:if>
                            </div>
                            <div style="padding:16px;">
                                <p style="font-size:.72rem;color:var(--gray-500);text-transform:uppercase;">${product.category}</p>
                                <h3 style="font-size:.95rem;font-weight:700;color:var(--navy);">${product.name}</h3>
                                <div style="display:flex;align-items:center;gap:10px;margin:8px 0;">
                                    <span style="color:var(--red);font-weight:700;font-size:1.2rem;">${product.priceFormatted}</span>
                                    <c:if test="${product.oldPrice > 0}">
                                        <span style="color:var(--gray-500);text-decoration:line-through;font-size:.85rem;">${product.oldPriceFormatted}</span>
                                    </c:if>
                                </div>
                            </div>
                        </a>
                        <div style="padding:0 16px 16px 16px;">
                            <form action="<%= request.getContextPath() %>/cart" method="post">
                                <input type="hidden" name="action" value="add">
                                <input type="hidden" name="productId" value="${product.id}">
                                <input type="hidden" name="quantity" value="1">
                                <button type="submit" class="btn btn-primary btn-full btn-sm">🛒 Agregar al carrito</button>
                            </form>
                        </div>
                    </div>
                </c:forEach>
            </div>

            <c:if test="${empty products}">
                <div style="background:var(--white);border-radius:var(--r-lg);padding:60px;text-align:center;box-shadow:var(--shadow-sm);">
                    <div style="font-size:4rem;margin-bottom:16px;">🔍</div>
                    <h3 style="color:var(--navy);font-size:1.25rem;">No hay productos</h3>
                    <p style="color:var(--gray-500);margin:16px 0;">No se encontraron productos con los filtros seleccionados.</p>
                    <a href="<%= request.getContextPath() %>/catalogue" class="btn btn-primary">Ver todos</a>
                </div>
            </c:if>

            <div style="margin-top:32px;text-align:center;">
                <a href="<%= request.getContextPath() %>/" class="btn btn-outline" style="color:var(--navy);border-color:var(--navy);">← Volver al inicio</a>
            </div>
        </div>
    </main>

    <jsp:include page="/WEB-INF/fragments/footer.jsp" />

</body>
</html>