<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<nav class="navbar" style="position:fixed;top:0;left:0;right:0;height:var(--nav-h);background:var(--navy);z-index:500;box-shadow:0 2px 16px rgba(0,0,0,.25);display:flex;align-items:center;">
    <div class="container" style="display:flex;align-items:center;justify-content:space-between;width:100%;">
        <a href="<%= request.getContextPath() %>/" style="font-size:1.4rem;font-weight:900;color:var(--white);letter-spacing:-.02em;">
            ELEV8 <span style="font-size:.65rem;font-weight:700;color:var(--red);letter-spacing:.18em;text-transform:uppercase;">Sportswear</span>
        </a>
        <div style="display:flex;align-items:center;gap:16px;">
            <a href="<%= request.getContextPath() %>/" style="color:rgba(255,255,255,.8);font-size:.875rem;transition:color .2s;">Inicio</a>
            <a href="<%= request.getContextPath() %>/catalogue" style="color:rgba(255,255,255,.8);font-size:.875rem;transition:color .2s;">Catálogo</a>
            <a href="<%= request.getContextPath() %>/cart" style="color:rgba(255,255,255,.8);font-size:.875rem;transition:color .2s;position:relative;">
                🛒
                <c:if test="${not empty sessionScope.cart}">
                    <span style="position:absolute;top:-8px;right:-12px;background:var(--red);color:var(--white);font-size:.65rem;font-weight:700;border-radius:50%;padding:2px 6px;min-width:18px;text-align:center;">
                        ${sessionScope.cart.size()}
                    </span>
                </c:if>
            </a>

            <c:choose>
                <c:when test="${sessionScope.isLoggedIn}">
                    <span style="color:rgba(255,255,255,.8);font-size:.875rem;">👤 ${sessionScope.user.firstName}</span>
                    <a href="<%= request.getContextPath() %>/logout" style="color:rgba(255,255,255,.8);font-size:.875rem;transition:color .2s;">🚪</a>
                </c:when>
                <c:otherwise>
                    <a href="<%= request.getContextPath() %>/login" style="color:rgba(255,255,255,.8);font-size:.875rem;transition:color .2s;">👤 Iniciar sesión</a>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
</nav>