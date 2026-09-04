<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis Favoritos – Elev8 Sportswear</title>
    <link rel="stylesheet" href="<c:url value='/css/main.css' />">
</head>
<body>
    <jsp:include page="/fragments/navbar.jsp" />

    <main class="page-content">
        <div class="container">
            <nav class="breadcrumb" aria-label="Ruta de navegación">
                <a href="<c:url value='/' />">Inicio</a>
                <span class="breadcrumb-sep" aria-hidden="true">›</span>
                <span class="breadcrumb-current">Mis Favoritos</span>
            </nav>

            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;">
                <h1 style="font-size:var(--text-3xl);font-weight:900;color:var(--navy);">
                    Mis Favoritos <span id="wishCount" style="font-size:var(--text-xl);color:var(--gray-500);font-weight:400;"></span>
                </h1>
                <c:if test="${not empty wishlist}">
                    <button class="btn btn-outline btn-sm" onclick="clearWishlist()">🗑 Limpiar todo</button>
                </c:if>
            </div>

            <c:if test="${not empty sessionScope.successMessage}">
                <div class="alert alert-success" style="margin-bottom:1rem;">
                    <span>✅</span>
                    <span>${sessionScope.successMessage}</span>
                </div>
                <c:remove var="successMessage" scope="session" />
            </c:if>

            <c:if test="${not empty sessionScope.errorMessage}">
                <div class="alert alert-danger" style="margin-bottom:1rem;">
                    <span>❌</span>
                    <span>${sessionScope.errorMessage}</span>
                </div>
                <c:remove var="errorMessage" scope="session" />
            </c:if>

            <c:choose>
                <c:when test="${empty wishlist}">
                    <div class="empty-state">
                        <div class="empty-icon">❤️</div>
                        <h3>Tu lista de favoritos está vacía</h3>
                        <p style="color:var(--gray-500);margin:1rem 0;">Guarda los productos que te gustan para comprarlos después.</p>
                        <a href="<c:url value='/catalogue' />" class="btn btn-primary">Ver catálogo</a>
                    </div>
                </c:when>
                <c:otherwise>
                    <div class="grid-4" id="wishGrid">
                        <c:forEach var="product" items="${wishlist}">
                            <article class="card product-card" data-id="${product.id}">
                                <div class="prod-img-wrap">
                                    <div class="prod-img-inner">${product.emoji}</div>
                                    <c:if test="${not empty product.badge}">
                                        <span class="badge badge-red prod-badge">${product.badge}</span>
                                    </c:if>
                                    <c:if test="${product.discountPercentage > 0}">
                                        <span class="badge badge-green prod-badge" style="top:10px;left:${not empty product.badge ? '72px' : '10px'}">-${product.discountPercentage}%</span>
                                    </c:if>
                                    <button class="prod-wish active" onclick="removeFromWishlist(${product.id}, this)" aria-label="Quitar de favoritos">❤️</button>
                                    <div class="prod-overlay">
                                        <a href="<c:url value='/product?id=${product.id}' />" class="btn btn-primary btn-sm">Ver detalle</a>
                                    </div>
                                </div>
                                <div class="prod-info">
                                    <p class="prod-category">${product.categoryName}</p>
                                    <h3 class="prod-name">
                                        <a href="<c:url value='/product?id=${product.id}' />">${product.name}</a>
                                    </h3>
                                    <div class="prod-prices">
                                        <span class="price"><fmt:formatNumber value="${product.price}" type="currency" currencySymbol="$" maxFractionDigits="0"/></span>
                                        <c:if test="${not empty product.oldPrice}">
                                            <span class="price-old"><fmt:formatNumber value="${product.oldPrice}" type="currency" currencySymbol="$" maxFractionDigits="0"/></span>
                                        </c:if>
                                    </div>
                                    <form action="<c:url value='/cart' />" method="post">
                                        <input type="hidden" name="action" value="add">
                                        <input type="hidden" name="productId" value="${product.id}">
                                        <input type="hidden" name="quantity" value="1">
                                        <button type="submit" class="btn btn-primary btn-full btn-sm">🛒 Agregar al carrito</button>
                                    </form>
                                </div>
                            </article>
                        </c:forEach>
                    </div>
                </c:otherwise>
            </c:choose>
        </div>
    </main>

    <jsp:include page="/fragments/footer.jsp" />

    <script src="<c:url value='/js/main.js' />"></script>
    <script>
        function updateWishCount() {
            const count = document.querySelectorAll('.product-card').length;
            const el = document.getElementById('wishCount');
            if (el) {
                el.textContent = count > 0 ? `(${count})` : '';
            }
        }

        function removeFromWishlist(productId, btn) {
            if (confirm('¿Quitar este producto de favoritos?')) {
                fetch('${pageContext.request.contextPath}/wishlist?action=remove&productId=' + productId, {
                    method: 'POST'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const card = btn.closest('.product-card');
                        if (card) {
                            card.style.transition = 'all 0.3s';
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.9)';
                            setTimeout(() => {
                                card.remove();
                                updateWishCount();
                                const remaining = document.querySelectorAll('.product-card').length;
                                if (remaining === 0) {
                                    location.reload();
                                }
                            }, 300);
                        }
                        Toast.show('💔 Eliminado de favoritos');
                    }
                })
                .catch(() => {
                    // Fallback
                    location.reload();
                });
            }
        }

        function clearWishlist() {
            if (confirm('¿Eliminar todos los productos de favoritos?')) {
                fetch('${pageContext.request.contextPath}/wishlist?action=clear', {
                    method: 'POST'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        location.reload();
                    }
                })
                .catch(() => {
                    location.reload();
                });
            }
        }

        // Actualizar contador al cargar
        document.addEventListener('DOMContentLoaded', function() {
            updateWishCount();
        });
    </script>
</body>
</html>