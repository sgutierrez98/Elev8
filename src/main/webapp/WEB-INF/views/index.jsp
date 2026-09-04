<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elev8 Sportswear – Ropa Deportiva de Alto Rendimiento</title>
  <meta name="description" content="Tienda de ropa deportiva de alto rendimiento. Tecnología, estilo y comodidad para cada entrenamiento.">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
</head>
<body>
  <jsp:include page="/WEB-INF/views/fragments/navbar.jsp">
    <jsp:param name="page" value="home"/>
  </jsp:include>

  <main class="page-content">
    <!-- HERO -->
    <section class="hero" aria-labelledby="heroTitle">
      <div class="hero-bg">
        <div class="hero-circle c1"></div>
        <div class="hero-circle c2"></div>
        <div class="hero-circle c3"></div>
      </div>
      <div class="container">
        <div class="hero-inner">
          <div>
            <span class="hero-eyebrow">🔥 Colección 2025</span>
            <h1 class="hero-title" id="heroTitle">
              Ropa deportiva <br><span class="hero-title-accent">para superar tus límites</span>
            </h1>
            <p class="hero-subtitle">Tecnología Dry-Fit, compresión y estilo. Diseñado para atletas que exigen lo mejor.</p>
            <div class="hero-actions">
              <a href="${pageContext.request.contextPath}/productos" class="btn btn-primary btn-lg">Ver catálogo</a>
              <a href="${pageContext.request.contextPath}/productos?oferta=true" class="btn btn-outline btn-lg">Ver ofertas</a>
            </div>
            <div class="hero-stats">
              <div><span class="hero-stat-num">12+</span><span class="hero-stat-lbl">Productos exclusivos</span></div>
              <span class="hero-stat-sep" aria-hidden="true"></span>
              <div><span class="hero-stat-num">4.8★</span><span class="hero-stat-lbl">Calificación promedio</span></div>
              <span class="hero-stat-sep" aria-hidden="true"></span>
              <div><span class="hero-stat-num">1K+</span><span class="hero-stat-lbl">Clientes satisfechos</span></div>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-card">
              <div class="hero-card-emoji">👕</div>
              <div class="hero-card-name">Camiseta Dry-Fit Pro</div>
              <div class="hero-card-price">$89.900</div>
              <a href="${pageContext.request.contextPath}/productos/detalle/1" class="btn btn-primary btn-sm">Ver detalle</a>
            </div>
            <div class="hero-float f1">🔥 -20%</div>
            <div class="hero-float f2">🚚 Envío gratis</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORÍAS -->
    <section class="categories-section" aria-labelledby="categoriesTitle">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" id="categoriesTitle">Categorías</h2>
          <a href="${pageContext.request.contextPath}/productos" class="section-link">Ver todos →</a>
        </div>
        <div class="categories-grid">
          <c:forEach var="cat" items="${categories}">
            <a href="${pageContext.request.contextPath}/productos?categoria=${cat.id}" 
               class="cat-card" style="--cat-bg:${cat.bgColor};--cat-accent:${cat.accentColor}">
              <span class="cat-icon">${cat.icon}</span>
              <div>
                <div class="cat-name">${cat.name}</div>
                <div class="cat-count">${cat.productCount} productos</div>
              </div>
              <span class="cat-arrow">→</span>
            </a>
          </c:forEach>
        </div>
      </div>
    </section>

    <!-- PRODUCTOS POPULARES -->
    <section class="section section-white" aria-labelledby="popularTitle">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" id="popularTitle">⭐ Más populares</h2>
          <a href="${pageContext.request.contextPath}/productos" class="section-link">Ver todos →</a>
        </div>
        <div class="grid-4">
          <c:forEach var="product" items="${popularProducts}">
            <article class="card product-card" data-id="${product.id}">
              <div class="prod-img-wrap">
                <div class="prod-img-inner">${product.emoji}</div>
                <c:if test="${not empty product.badge}">
                  <span class="badge badge-red prod-badge">${product.badge}</span>
                </c:if>
                <c:if test="${product.discountPercentage > 0}">
                  <span class="badge badge-green prod-badge" style="top:10px;left:${not empty product.badge ? '72px' : '10px'}">-${product.discountPercentage}%</span>
                </c:if>
                <div class="prod-overlay">
                  <a href="${pageContext.request.contextPath}/productos/detalle/${product.id}" class="btn btn-primary btn-sm">Ver detalle</a>
                </div>
              </div>
              <div class="prod-info">
                <p class="prod-category">${product.categoryName}</p>
                <h3 class="prod-name">
                  <a href="${pageContext.request.contextPath}/productos/detalle/${product.id}">${product.name}</a>
                </h3>
                <div class="prod-rating">
                  <span class="stars">${product.rating}★</span>
                  <span class="prod-reviews">(${product.reviews})</span>
                </div>
                <div class="prod-prices">
                  <span class="price">${product.formattedPrice}</span>
                  <c:if test="${not empty product.oldPrice}">
                    <span class="price-old">${product.formattedOldPrice}</span>
                  </c:if>
                </div>
                <form action="${pageContext.request.contextPath}/carrito/agregar" method="post">
                  <input type="hidden" name="productId" value="${product.id}">
                  <input type="hidden" name="quantity" value="1">
                  <input type="hidden" name="size" value="M">
                  <input type="hidden" name="color" value="#0F0F14">
                  <button type="submit" class="btn btn-primary btn-full btn-sm">🛒 Agregar al carrito</button>
                </form>
              </div>
            </article>
          </c:forEach>
        </div>
      </div>
    </section>

    <!-- PROMO BANNER -->
    <section class="promo-banner" aria-labelledby="promoTitle">
      <div class="container">
        <div class="promo-inner">
          <div>
            <span class="promo-eyebrow">💥 Oferta especial</span>
            <h2 class="promo-title" id="promoTitle">Hasta 30% OFF en ropa de compresión</h2>
            <p class="promo-text">Licras y camisetas de compresión para mejorar tu rendimiento. Oferta válida por tiempo limitado.</p>
            <a href="${pageContext.request.contextPath}/productos?categoria=licras" class="btn btn-primary btn-lg">Ver licras</a>
          </div>
          <div class="promo-pills">
            <span class="promo-pill">🔥 20% OFF</span>
            <span class="promo-pill">⚡ Envío gratis</span>
            <span class="promo-pill">🎁 Regalo sorpresa</span>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="features-section" aria-labelledby="featuresTitle">
      <div class="container">
        <h2 class="section-title text-center" style="display:block;text-align:center;margin-bottom:3rem;" id="featuresTitle">¿Por qué elegir Elev8?</h2>
        <div class="grid-3">
          <div class="feature-card"><div class="feature-icon">🧵</div><h3 class="feature-title">Calidad premium</h3><p class="feature-text">Tejidos de alta durabilidad y tecnología Dry-Fit para máximo confort.</p></div>
          <div class="feature-card"><div class="feature-icon">🚚</div><h3 class="feature-title">Envío rápido</h3><p class="feature-text">Entregas en 24-48 horas en todo el país. Seguimiento en tiempo real.</p></div>
          <div class="feature-card"><div class="feature-icon">🔄</div><h3 class="feature-title">Cambios sin preguntas</h3><p class="feature-text">30 días para cambiar o devolver tu producto sin complicaciones.</p></div>
        </div>
      </div>
    </section>
  </main>

  <jsp:include page="/WEB-INF/views/fragments/footer.jsp"/>

  <script src="${pageContext.request.contextPath}/js/main.js"></script>
</body>
</html>