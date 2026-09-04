<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Catálogo – Elev8 Sportswear</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
</head>
<body>
  <jsp:include page="/WEB-INF/views/fragments/navbar.jsp">
    <jsp:param name="page" value="catalogue"/>
  </jsp:include>

  <main class="page-content">
    <div class="container">
      <nav class="breadcrumb" aria-label="Ruta de navegación">
        <a href="${pageContext.request.contextPath}/">Inicio</a>
        <span class="breadcrumb-sep" aria-hidden="true">›</span>
        <span class="breadcrumb-current">Catálogo</span>
      </nav>

      <div class="catalogue-layout">
        <!-- FILTROS -->
        <aside class="filter-sidebar" aria-label="Filtros de productos">
          <div class="filter-header">
            <h2 class="filter-title">Filtros</h2>
            <a href="${pageContext.request.contextPath}/productos" class="filter-clear">Limpiar todo</a>
          </div>

          <div class="filter-group">
            <h3 class="filter-group-title">Categoría</h3>
            <form action="${pageContext.request.contextPath}/productos" method="get">
              <div id="catFilters">
                <label class="filter-option">
                  <input type="radio" name="categoria" value="" ${empty param.categoria ? 'checked' : ''} onchange="this.form.submit()">
                  <span>Todos</span>
                  <span class="filter-count">${totalProducts}</span>
                </label>
                <c:forEach var="cat" items="${categories}">
                  <label class="filter-option">
                    <input type="radio" name="categoria" value="${cat.id}" ${param.categoria == cat.id ? 'checked' : ''} onchange="this.form.submit()">
                    <span>${cat.name}</span>
                    <span class="filter-count">${cat.productCount}</span>
                  </label>
                </c:forEach>
              </div>
            </form>
          </div>
        </aside>

        <!-- PRODUCTOS -->
        <div class="catalogue-main">
          <div class="catalogue-toolbar">
            <p class="result-count">${totalProducts} producto${totalProducts != 1 ? 's' : ''} encontrado${totalProducts != 1 ? 's' : ''}</p>
          </div>

          <div class="grid-4">
            <c:forEach var="product" items="${products}">
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

          <c:if test="${empty products}">
            <div class="empty-state">
              <div class="empty-icon">🔍</div>
              <h3>Sin resultados</h3>
              <p>Prueba con otros filtros o busca algo diferente.</p>
              <a href="${pageContext.request.contextPath}/productos" class="btn btn-primary">Limpiar filtros</a>
            </div>
          </c:if>
        </div>
      </div>
    </div>
  </main>

  <jsp:include page="/WEB-INF/views/fragments/footer.jsp"/>
  <script src="${pageContext.request.contextPath}/js/main.js"></script>
</body>
</html>