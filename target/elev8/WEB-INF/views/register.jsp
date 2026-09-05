<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Crear Cuenta – Elev8 Sportswear</title>
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
          <div class="auth-tab" role="tab" aria-selected="false" onclick="window.location.href='${pageContext.request.contextPath}/auth/login'">Iniciar sesión</div>
          <div class="auth-tab active" role="tab" aria-selected="true">Crear cuenta</div>
        </div>

        <div id="registerPanel" role="tabpanel">
          <h1 class="auth-title">Crear cuenta</h1>
          <p class="auth-subtitle">Únete y obtén 10% en tu primera compra 🎁</p>
          
          <c:if test="${not empty param.error}">
            <div class="alert alert-danger" style="margin-bottom:1rem;">${param.error}</div>
          </c:if>
          
          <form class="auth-form" action="${pageContext.request.contextPath}/auth/register" method="post" novalidate>
            <div class="auth-form-row">
              <div class="form-group">
                <label class="form-label" for="regNom">Nombre</label>
                <input class="form-input" type="text" id="regNom" name="firstName" placeholder="Santiago" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="regApe">Apellido</label>
                <input class="form-input" type="text" id="regApe" name="lastName" placeholder="García" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="regEmail">Correo electrónico</label>
              <input class="form-input" type="email" id="regEmail" name="email" placeholder="tu@email.com" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="regPhone">Teléfono</label>
              <input class="form-input" type="tel" id="regPhone" name="phone" placeholder="310 123 4567">
            </div>
            <div class="form-group">
              <label class="form-label" for="regPass">Contraseña</label>
              <div class="input-group">
                <input class="form-input" type="password" id="regPass" name="password" placeholder="Mínimo 6 caracteres" required minlength="6">
                <span class="input-group-icon" onclick="togglePass('regPass')">👁</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="regPass2">Confirmar contraseña</label>
              <div class="input-group">
                <input class="form-input" type="password" id="regPass2" name="confirmPassword" placeholder="Repite la contraseña" required>
                <span class="input-group-icon" onclick="togglePass('regPass2')">👁</span>
              </div>
            </div>
            <label class="check-label">
              <input type="checkbox" required>
              Acepto los <a href="#" style="color:var(--red);">Términos</a> y la <a href="#" style="color:var(--red);">Política de privacidad</a>
            </label>
            <button type="submit" class="btn btn-primary btn-full btn-lg">Crear cuenta gratuita</button>
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