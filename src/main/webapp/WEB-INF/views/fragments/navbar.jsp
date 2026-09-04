<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<nav class="navbar" id="elev8-navbar" role="navigation" aria-label="Navegación principal">
  <div class="container navbar-inner">
    <a href="${pageContext.request.contextPath}/" class="navbar-logo" aria-label="Elev8 Sportswear inicio">
      <span class="navbar-logo-main">ELEV8</span>
      <span class="navbar-logo-sub">Sportswear</span>
    </a>
    <nav class="navbar-nav">
      <a href="${pageContext.request.contextPath}/" class="nav-link ${param.page == 'home' ? 'active' : ''}">Inicio</a>
      <div class="nav-dropdown">
        <a href="${pageContext.request.contextPath}/productos" class="nav-link ${param.page == 'catalogue' ? 'active' : ''}">Catálogo ▾</a>
        <div class="dropdown-menu" role="menu">
          <a href="${pageContext.request.contextPath}/productos?categoria=camisetas" class="dropdown-item" role="menuitem">
            <span class="dropdown-icon" style="background:#E8EEFF">👕</span>Camisetas
          </a>
          <a href="${pageContext.request.contextPath}/productos?categoria=pantalonetas" class="dropdown-item" role="menuitem">
            <span class="dropdown-icon" style="background:#FFE8E8">🩳</span>Pantalonetas
          </a>
          <a href="${pageContext.request.contextPath}/productos?categoria=licras" class="dropdown-item" role="menuitem">
            <span class="dropdown-icon" style="background:#E8FFE8">🩱</span>Licras
          </a>
          <a href="${pageContext.request.contextPath}/productos?categoria=chaquetas" class="dropdown-item" role="menuitem">
            <span class="dropdown-icon" style="background:#FFFDE8">🧥</span>Chaquetas
          </a>
          <a href="${pageContext.request.contextPath}/productos?categoria=accesorios" class="dropdown-item" role="menuitem">
            <span class="dropdown-icon" style="background:#F3E8FF">🎒</span>Accesorios
          </a>
        </div>
      </div>
      <a href="${pageContext.request.contextPath}/productos?oferta=true" class="nav-link">Ofertas</a>
      <c:if test="${sessionScope.userRole == 'ADMIN'}">
        <a href="${pageContext.request.contextPath}/productos/admin" class="nav-link">Admin</a>
      </c:if>
    </nav>
    <div class="navbar-search">
      <span class="navbar-search-icon" aria-hidden="true">🔍</span>
      <form action="${pageContext.request.contextPath}/productos" method="get">
        <input class="navbar-search-input" type="search" name="buscar" placeholder="Buscar productos..." aria-label="Buscar productos" autocomplete="off">
      </form>
    </div>
    <div class="navbar-actions">
      <c:choose>
        <c:when test="${sessionScope.user != null}">
          <span class="nav-icon-btn" style="color:rgba(255,255,255,0.8);font-size:0.8rem;">👤 ${sessionScope.userName}</span>
          <a href="${pageContext.request.contextPath}/auth/logout" class="nav-icon-btn" aria-label="Cerrar sesión">🚪</a>
        </c:when>
        <c:otherwise>
          <a href="${pageContext.request.contextPath}/auth/login" class="nav-icon-btn" aria-label="Mi cuenta">👤</a>
        </c:otherwise>
      </c:choose>
      <a href="${pageContext.request.contextPath}/carrito" class="nav-icon-btn" aria-label="Carrito">
        🛒
        <c:if test="${sessionScope.cartCount != null && sessionScope.cartCount > 0}">
          <span class="nav-badge cart-badge">${sessionScope.cartCount}</span>
        </c:if>
      </a>
      <button class="nav-burger" id="burgerBtn" aria-label="Menú" aria-expanded="false" aria-controls="mobileNav">☰</button>
    </div>
  </div>
</nav>
<div class="mobile-nav" id="mobileNav" role="dialog" aria-label="Menú móvil">
  <a href="${pageContext.request.contextPath}/" class="nav-link">🏠 Inicio</a>
  <a href="${pageContext.request.contextPath}/productos" class="nav-link">🗂 Catálogo</a>
  <a href="${pageContext.request.contextPath}/productos?oferta=true" class="nav-link">🏷 Ofertas</a>
  <a href="${pageContext.request.contextPath}/carrito" class="nav-link">🛒 Carrito</a>
  <c:choose>
    <c:when test="${sessionScope.user != null}">
      <a href="${pageContext.request.contextPath}/auth/logout" class="nav-link">🚪 Cerrar sesión</a>
    </c:when>
    <c:otherwise>
      <a href="${pageContext.request.contextPath}/auth/login" class="nav-link">👤 Mi cuenta</a>
    </c:otherwise>
  </c:choose>
</div>