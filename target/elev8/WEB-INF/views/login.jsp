<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iniciar Sesión – Elev8 Sportswear</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
</head>
<body>
  <div class="auth-page">
    <div class="auth-brand">
      <div class="auth-brand-logo">ELEV8</div>
      <div class="auth-brand-sub">Sportswear</div>
      <p class="auth-brand-text">Tu tienda de ropa deportiva de alto rendimiento. Tecnología y estilo para cada entrenamiento.</p>
      <div class="auth-brand-emoji">👕</div>
    </div>

    <div class="auth-form-panel">
      <div class="auth-box">
        <div class="auth-tabs" role="tablist">
          <div class="auth-tab active" role="tab" aria-selected="true">Iniciar sesión</div>
          <div class="auth-tab" role="tab" aria-selected="false" onclick="window.location.href='${pageContext.request.contextPath}/auth/register'">Crear cuenta</div>
        </div>

        <div id="loginPanel" role="tabpanel">
          <h1 class="auth-title">Bienvenido de nuevo</h1>
          <p class="auth-subtitle">Ingresa a tu cuenta para continuar</p>
          
          <c:if test="${not empty param.error}">
            <div class="alert alert-danger" style="margin-bottom:1rem;">${param.error}</div>
          </c:if>
          <c:if test="${not empty param.success}">
            <div class="alert alert-success" style="margin-bottom:1rem;">${param.success}</div>
          </c:if>
          
          <form class="auth-form" action="${pageContext.request.contextPath}/auth/login" method="post" novalidate>
            <div class="form-group">
              <label class="form-label" for="loginEmail">Correo electrónico</label>
              <input class="form-input" type="email" id="loginEmail" name="email" placeholder="tu@email.com" required autocomplete="email">
            </div>
            <div class="form-group">
              <label class="form-label" for="loginPass">Contraseña</label>
              <div class="input-group">
                <input class="form-input" type="password" id="loginPass" name="password" placeholder="••••••••" required autocomplete="current-password">
                <span class="input-group-icon" onclick="togglePass('loginPass')" aria-label="Mostrar/ocultar contraseña">👁</span>
              </div>
              <a href="#" style="font-size:.75rem;color:var(--red);font-weight:600;text-align:right;display:block;margin-top:.25rem;">¿Olvidaste tu contraseña?</a>
            </div>
            <label class="check-label"><input type="checkbox" name="remember"> Recordarme</label>
            <button type="submit" class="btn btn-primary btn-full btn-lg">Iniciar sesión</button>
            <div class="auth-divider"><span>O continúa con</span></div>
            <div class="social-btns">
              <button type="button" class="social-btn">📧 Google</button>
              <button type="button" class="social-btn">📘 Facebook</button>
            </div>
          </form>
        </div>
        <p style="text-align:center;margin-top:1.5rem;font-size:.75rem;color:var(--gray-400);">🔒 Tus datos están protegidos con cifrado SSL</p>
      </div>
    </div>
  </div>

  <script>
    function togglePass(id) {
      const i = document.getElementById(id);
      i.type = i.type === 'password' ? 'text' : 'password';
    }
  </script>
</body>
</html>