<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Carrito – Elev8 Sportswear</title>
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/main.css">
</head>
<body>

    <jsp:include page="/WEB-INF/fragments/navbar.jsp" />

    <main class="page-content">
        <div class="container">
            <h1 style="font-size:2rem;font-weight:900;color:var(--navy);margin:32px 0;">🛒 Mi Carrito</h1>

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

            <c:choose>
                <c:when test="${empty cartItems}">
                    <div style="background:var(--white);border-radius:var(--r-lg);padding:60px;text-align:center;box-shadow:var(--shadow-sm);">
                        <div style="font-size:4rem;margin-bottom:16px;">🛒</div>
                        <h3 style="color:var(--navy);font-size:1.25rem;">Tu carrito está vacío</h3>
                        <p style="color:var(--gray-500);margin:16px 0;">Agrega productos para empezar</p>
                        <a href="<%= request.getContextPath() %>/catalogue" class="btn btn-primary">Ver catálogo</a>
                    </div>
                </c:when>
                <c:otherwise>
                    <div style="display:grid;grid-template-columns:1fr 320px;gap:32px;">
                        <!-- Lista de productos -->
                        <div>
                            <div style="display:grid;grid-template-columns:3fr 1fr 1fr 1fr 40px;gap:16px;padding:12px 16px;background:var(--navy);border-radius:var(--r-md);color:var(--white);font-weight:700;font-size:.875rem;">
                                <span>Producto</span>
                                <span>Precio</span>
                                <span>Cantidad</span>
                                <span>Subtotal</span>
                                <span></span>
                            </div>

                            <c:forEach var="item" items="${cartItems}" varStatus="status">
                                <div style="display:grid;grid-template-columns:3fr 1fr 1fr 1fr 40px;gap:16px;align-items:center;padding:16px;background:var(--white);border-radius:var(--r-md);margin-top:8px;box-shadow:var(--shadow-sm);">
                                    <div style="display:flex;align-items:center;gap:12px;">
                                        <span style="font-size:2rem;">${item.emoji}</span>
                                        <div>
                                            <div style="font-weight:700;color:var(--navy);">${item.name}</div>
                                            <div style="font-size:.75rem;color:var(--gray-500);">
                                                <c:if test="${not empty item.size}">Talla: ${item.size}</c:if>
                                                <c:if test="${not empty item.color}"> · Color: ${item.color}</c:if>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="font-weight:700;">${item.priceFormatted}</div>
                                    <div style="display:flex;align-items:center;gap:8px;">
                                        <form action="<%= request.getContextPath() %>/cart" method="post" style="display:inline;">
                                            <input type="hidden" name="action" value="update">
                                            <input type="hidden" name="index" value="${status.index}">
                                            <input type="hidden" name="quantity" value="${item.quantity - 1}">
                                            <button type="submit" style="width:28px;height:28px;border:1px solid var(--gray-300);border-radius:4px;font-weight:700;cursor:pointer;background:var(--white);" ${item.quantity <= 1 ? 'disabled' : ''}>−</button>
                                        </form>
                                        <span style="font-weight:700;min-width:30px;text-align:center;">${item.quantity}</span>
                                        <form action="<%= request.getContextPath() %>/cart" method="post" style="display:inline;">
                                            <input type="hidden" name="action" value="update">
                                            <input type="hidden" name="index" value="${status.index}">
                                            <input type="hidden" name="quantity" value="${item.quantity + 1}">
                                            <button type="submit" style="width:28px;height:28px;border:1px solid var(--gray-300);border-radius:4px;font-weight:700;cursor:pointer;background:var(--white);">+</button>
                                        </form>
                                    </div>
                                    <div style="font-weight:800;color:var(--red);">${item.subtotalFormatted}</div>
                                    <div>
                                        <form action="<%= request.getContextPath() %>/cart" method="post">
                                            <input type="hidden" name="action" value="remove">
                                            <input type="hidden" name="index" value="${status.index}">
                                            <button type="submit" style="color:var(--gray-400);font-size:1.2rem;cursor:pointer;background:none;border:none;" title="Eliminar">✕</button>
                                        </form>
                                    </div>
                                </div>
                            </c:forEach>

                            <div style="display:flex;justify-content:space-between;margin-top:24px;">
                                <a href="<%= request.getContextPath() %>/catalogue" class="btn btn-ghost" style="color:var(--gray-600);">← Seguir comprando</a>
                                <a href="<%= request.getContextPath() %>/cart?action=clear" class="btn btn-ghost" style="color:var(--red);" onclick="return confirm('¿Vaciar el carrito?')">🗑 Vaciar carrito</a>
                            </div>
                        </div>

                        <!-- Resumen -->
                        <div style="background:var(--white);border-radius:var(--r-lg);padding:24px;box-shadow:var(--shadow-md);height:fit-content;position:sticky;top:90px;">
                            <h2 style="font-size:1.2rem;font-weight:800;color:var(--navy);margin-bottom:16px;padding-bottom:16px;border-bottom:2px solid var(--gray-100);">Resumen del pedido</h2>

                            <div style="display:flex;justify-content:space-between;padding:8px 0;">
                                <span style="color:var(--gray-600);">Subtotal</span>
                                <span style="font-weight:700;"><fmt:formatNumber value="${subtotal}" type="currency" currencySymbol="$" maxFractionDigits="0"/></span>
                            </div>
                            <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--gray-100);">
                                <span style="color:var(--gray-600);">Envío</span>
                                <span style="font-weight:700;color:var(--success);">
                                    <c:choose>
                                        <c:when test="${shipping == 0}">GRATIS</c:when>
                                        <c:otherwise><fmt:formatNumber value="${shipping}" type="currency" currencySymbol="$" maxFractionDigits="0"/></c:otherwise>
                                    </c:choose>
                                </span>
                            </div>
                            <div style="display:flex;justify-content:space-between;padding:16px 0;font-size:1.2rem;font-weight:900;">
                                <span style="color:var(--navy);">Total</span>
                                <span style="color:var(--red);"><fmt:formatNumber value="${total}" type="currency" currencySymbol="$" maxFractionDigits="0"/></span>
                            </div>

                            <a href="<%= request.getContextPath() %>/checkout" class="btn btn-primary btn-full" style="margin-top:16px;">Proceder al pago →</a>

                            <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:16px;">
                                <span style="font-size:.75rem;color:var(--gray-500);">💳 Visa</span>
                                <span style="font-size:.75rem;color:var(--gray-500);">💳 MC</span>
                                <span style="font-size:.75rem;color:var(--gray-500);">🏦 PSE</span>
                                <span style="font-size:.75rem;color:var(--gray-500);">📱 Nequi</span>
                            </div>
                            <p style="font-size:.75rem;color:var(--success);text-align:center;margin-top:8px;">🔒 Compra 100% segura</p>
                        </div>
                    </div>
                </c:otherwise>
            </c:choose>
        </div>
    </main>

    <jsp:include page="/WEB-INF/fragments/footer.jsp" />

</body>
</html>