<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Administrar Productos – Elev8 Sportswear</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
  <style>
    .admin-table { width:100%; border-collapse:collapse; background:var(--white); border-radius:var(--r-lg); overflow:hidden; }
    .admin-table th { background:var(--navy); color:var(--white); padding:12px 16px; text-align:left; font-size:var(--text-xs); text-transform:uppercase; letter-spacing:0.06em; }
    .admin-table td { padding:12px 16px; border-bottom:1px solid var(--gray-200); font-size:var(--text-sm); }
    .admin-table tr:hover { background:var(--gray-50); }
    .admin-actions { display:flex; gap:8px; }
    .admin-actions .btn { padding:4px 12px; font-size:var(--text-xs); }
  </style>
</head>
<body>
  <jsp:include page="/WEB-INF/views/fragments/navbar.jsp"/>

  <main class="page-content">
    <div class="container">
      <div style="display:flex;justify-content:space-between;align-items:center;margin:2rem 0;">
        <h1 style="font-size:var(--text-3xl);font-weight:900;color:var(--navy);">Administrar Productos</h1>
        <a href="${pageContext.request.contextPath}/productos/nuevo" class="btn btn-primary">+ Nuevo Producto</a>
      </div>

      <c:if test="${not empty param.success}">
        <div class="alert alert-success" style="margin-bottom:1rem;">${param.success}</div>
      </c:if>

      <div class="card" style="overflow:hidden;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>SKU</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <c:forEach var="product" items="${products}">
              <tr>
                <td>${product.id}</td>
                <td><code>${product.sku}</code></td>
                <td>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="font-size:1.5rem;">${product.emoji}</span>
                    <span>${product.name}</span>
                  </div>
                </td>
                <td>${product.categoryName}</td>
                <td><fmt:formatNumber value="${product.price}" type="currency" currencySymbol="$"/></td>
                <td>${product.stock}</td>
                <td>
                  <c:choose>
                    <c:when test="${product.active}">
                      <span class="badge badge-green">Activo</span>
                    </c:when>
                    <c:otherwise>
                      <span class="badge badge-red">Inactivo</span>
                    </c:otherwise>
                  </c:choose>
                </td>
                <td>
                  <div class="admin-actions">
                    <a href="${pageContext.request.contextPath}/productos/editar/${product.id}" class="btn btn-primary btn-sm">✎ Editar</a>
                    <form action="${pageContext.request.contextPath}/productos/eliminar/${product.id}" method="post" onsubmit="return confirm('¿Eliminar este producto?');">
                      <button type="submit" class="btn btn-outline btn-sm">🗑</button>
                    </form>
                  </div>
                </td>
              </tr>
            </c:forEach>
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <jsp:include page="/WEB-INF/views/fragments/footer.jsp"/>
  <script src="${pageContext.request.contextPath}/js/main.js"></script>
</body>
</html>