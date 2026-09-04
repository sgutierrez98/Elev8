<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Carrito – Elev8 Sportswear</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
</head>
<body>
  <jsp:include page="/WEB-INF/views/fragments/navbar.jsp"/>

  <main class="page-content">
    <div class="container">
      <nav class="breadcrumb" aria-label="Ruta de navegación">
        <a href="${pageContext.request.contextPath}/">Inicio</a>
        <span class="breadcrumb-sep" aria-hidden="true">›</span>
        <span class="breadcrumb-current">Mi Carrito</span>
      </nav>

      <h1 style="font-size:var(--text-3xl);font-weight:900;color:var(--navy);margin-bottom:var(--sp-6);">
        Mi Carrito <span style="font-size:var(--text-xl);color:var(--gray-500);font-weight:400;">(${cartCount} artículo${cartCount != 1 ? 's' : ''})</span>
      </h1>

      <div class="cart-page-layout">
        <div>
          <div class="cart-table-head">
            <span>Producto</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span>Subtotal</span>
            <span></span>
          </div>

          <c:choose>
            <c:when test="${empty cart}">
              <div class="cart-empty">
                <div class="empty-icon">🛒</div>
                <h3 style="color:var(--navy);">Tu carrito está vacío</h3>
                <p style="color:var(--gray-500);margin:1rem 0;">Agrega productos para empezar</p>
                <a href="${pageContext.request.contextPath}/productos" class="btn btn-primary">Ver catálogo</a>
              </div>
            </c:when>
            <c:otherwise>
              <c:forEach var="item" items="${cart}" varStatus="status">
                <div class="cart-item" id="ci-${status.index}">
                  <div style="display:flex;align-items:center;gap:1rem;">
                    <div class="cart-thumb">${item.emoji}</div>
                    <div>
                      <div class="cart-name">${item.name}</div>
                      <div class="cart-meta">Talla: ${item.size}</div>
                    </div>
                  </div>
                  <div class="cart-unit"><fmt:formatNumber value="${item.price}" type="currency" currencySymbol="$"/></div>
                  <form action="${pageContext.request.contextPath}/carrito/actualizar" method="post" style="display:flex;align-items:center;gap:0.5rem;">
                    <input type="hidden" name="index" value="${status.index}">
                    <div class="qty-stepper" role="group" aria-label="Cantidad">
                      <button type="submit" name="quantity" value="${item.quantity - 1}" class="qty-btn" ${item.quantity <= 1 ? 'disabled' : ''}>−</button>
                      <span class="qty-num">${item.quantity}</span>
                      <button type="submit" name="quantity" value="${item.quantity + 1}" class="qty-btn">+</button>
                    </div>
                  </form>
                  <div class="cart-subtotal price"><fmt:formatNumber value="${item.price * item.quantity}" type="currency" currencySymbol="$"/></div>
                  <form action="${pageContext.request.contextPath}/carrito/eliminar" method="post">
                    <input type="hidden" name="index" value="${status.index}">
                    <button type="submit" class="cart-remove" aria-label="Eliminar">✕</button>
                  </form>
                </div>
              </c:forEach>

              <div style="display:flex;justify-content:space-between;margin-top:var(--sp-6);">
                <a href="${pageContext.request.contextPath}/productos" class="btn btn-ghost">← Seguir comprando</a>
                <form action="${pageContext.request.contextPath}/carrito/vaciar" method="post" onsubmit="return confirm('¿Vaciar el carrito?');">
                  <button type="submit" class="btn btn-outline">🗑 Vaciar carrito</button>
                </form>
              </div>
            </c:otherwise>
          </c:choose>
        </div>

        <aside class="order-summary" aria-label="Resumen del pedido">
          <h2 class="summary-title">Resumen del pedido</h2>

          <div class="summary-row">
            <span>Subtotal</span>
            <span id="summarySubtotal"><fmt:formatNumber value="${cartTotal}" type="currency" currencySymbol="$"/></span>
          </div>
          <div class="summary-row">
            <span>Envío</span>
            <span id="summaryShipping" style="color:var(--success);font-weight:700;">
              <c:choose>
                <c:when test="${cartTotal >= 150000}">GRATIS</c:when>
                <c:otherwise><fmt:formatNumber value="8000" type="currency" currencySymbol="$"/></c:otherwise>
              </c:choose>
            </span>
          </div>
          <div class="summary-row summary-row-total">
            <span>Total</span>
            <span class="price">
              <fmt:formatNumber value="${cartTotal + (cartTotal >= 150000 ? 0 : 8000)}" type="currency" currencySymbol="$"/>
            </span>
          </div>

          <a href="${pageContext.request.contextPath}/checkout" class="btn btn-primary btn-full" style="margin-top:1.5rem;font-size:var(--text-base);">Proceder al pago →</a>
          <p style="font-size:.75rem;color:var(--success);text-align:center;margin-top:1rem;">🔒 Compra 100% segura y encriptada</p>
        </aside>
      </div>
    </div>
  </main>

  <jsp:include page="/WEB-INF/views/fragments/footer.jsp"/>
  <script src="${pageContext.request.contextPath}/js/main.js"></script>
</body>
</html>