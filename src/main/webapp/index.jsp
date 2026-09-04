<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elev8 Sportswear – Ropa Deportiva de Alto Rendimiento</title>
    <meta name="description" content="Tienda de ropa deportiva de alto rendimiento.">
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/main.css">
</head>
<body>

    <jsp:include page="/WEB-INF/fragments/navbar.jsp" />

    <main class="page-content">
        <!-- HERO -->
        <section class="hero">
            <div class="container">
                <div class="hero-inner">
                    <div>
                        <h1 class="hero-title">
                            Ropa deportiva <br><span class="hero-title-accent">para superar tus límites</span>
                        </h1>
                        <p class="hero-subtitle">Tecnología Dry-Fit, compresión y estilo. Diseñado para atletas que exigen lo mejor.</p>
                        <div class="hero-actions">
                            <a href="<%= request.getContextPath() %>/catalogue" class="btn btn-primary btn-lg">Ver catálogo</a>
                            <a href="<%= request.getContextPath() %>/catalogue?onSale=true" class="btn btn-outline btn-lg">Ver ofertas</a>
                        </div>
                        <div class="hero-stats" style="display:flex;gap:24px;margin-top:32px;">
                            <div>
                                <span style="display:block;font-size:1.5rem;font-weight:900;color:var(--white);">12+</span>
                                <span style="font-size:.75rem;color:rgba(255,255,255,.5);text-transform:uppercase;">Productos exclusivos</span>
                            </div>
                            <div>
                                <span style="display:block;font-size:1.5rem;font-weight:900;color:var(--white);">4.8★</span>
                                <span style="font-size:.75rem;color:rgba(255,255,255,.5);text-transform:uppercase;">Calificación promedio</span>
                            </div>
                            <div>
                                <span style="display:block;font-size:1.5rem;font-weight:900;color:var(--white);">1K+</span>
                                <span style="font-size:.75rem;color:rgba(255,255,255,.5);text-transform:uppercase;">Clientes satisfechos</span>
                            </div>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="hero-card">
                            <div class="hero-card-emoji">👕</div>
                            <div class="hero-card-name">Camiseta Dry-Fit Pro</div>
                            <div class="hero-card-price">$89.900</div>
                            <a href="<%= request.getContextPath() %>/product?id=1" class="btn btn-primary btn-sm">Ver detalle</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CATEGORÍAS -->
        <section style="padding:40px 0;">
            <div class="container">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
                    <h2 style="font-size:1.75rem;font-weight:800;color:var(--navy);">Categorías</h2>
                    <a href="<%= request.getContextPath() %>/catalogue" style="color:var(--red);font-weight:600;">Ver todos →</a>
                </div>
                <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:16px;">
                    <a href="<%= request.getContextPath() %>/catalogue?category=Camisetas" style="background:#E8EEFF;border-radius:var(--r-lg);padding:20px;text-align:center;transition:transform .2s;text-decoration:none;color:inherit;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
                        👕<br><span style="font-weight:600;font-size:.875rem;">Camisetas</span>
                    </a>
                    <a href="<%= request.getContextPath() %>/catalogue?category=Pantalonetas" style="background:#FFE8E8;border-radius:var(--r-lg);padding:20px;text-align:center;transition:transform .2s;text-decoration:none;color:inherit;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
                        🩳<br><span style="font-weight:600;font-size:.875rem;">Pantalonetas</span>
                    </a>
                    <a href="<%= request.getContextPath() %>/catalogue?category=Licras" style="background:#E8FFE8;border-radius:var(--r-lg);padding:20px;text-align:center;transition:transform .2s;text-decoration:none;color:inherit;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
                        🩱<br><span style="font-weight:600;font-size:.875rem;">Licras</span>
                    </a>
                    <a href="<%= request.getContextPath() %>/catalogue?category=Chaquetas" style="background:#FFFDE8;border-radius:var(--r-lg);padding:20px;text-align:center;transition:transform .2s;text-decoration:none;color:inherit;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
                        🧥<br><span style="font-weight:600;font-size:.875rem;">Chaquetas</span>
                    </a>
                    <a href="<%= request.getContextPath() %>/catalogue?category=Accesorios" style="background:#F3E8FF;border-radius:var(--r-lg);padding:20px;text-align:center;transition:transform .2s;text-decoration:none;color:inherit;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
                        🎒<br><span style="font-weight:600;font-size:.875rem;">Accesorios</span>
                    </a>
                </div>
            </div>
        </section>

        <!-- PRODUCTOS POPULARES -->
        <section style="padding:40px 0;background:var(--white);">
            <div class="container">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
                    <h2 style="font-size:1.75rem;font-weight:800;color:var(--navy);">⭐ Más populares</h2>
                    <a href="<%= request.getContextPath() %>/catalogue" style="color:var(--red);font-weight:600;">Ver todos →</a>
                </div>
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;">
                    <c:forEach var="product" items="${popularProducts}">
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
                                <a href="<%= request.getContextPath() %>/cart" class="btn btn-primary btn-full btn-sm">🛒 Agregar al carrito</a>
                            </div>
                        </div>
                    </c:forEach>
                </div>
            </div>
        </section>
    </main>

    <jsp:include page="/WEB-INF/fragments/footer.jsp" />

</body>
</html>