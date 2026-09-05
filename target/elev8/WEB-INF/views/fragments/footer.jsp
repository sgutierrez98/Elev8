<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-main">
      <div>
        <div class="footer-brand-name">ELEV8</div>
        <p class="footer-brand-tagline">Tu tienda de ropa deportiva de alto rendimiento.<br>Tecnología, estilo y comodidad para cada entrenamiento.</p>
        <div class="footer-social">
          <a href="#" class="social-link" aria-label="Instagram">📷</a>
          <a href="#" class="social-link" aria-label="Facebook">📘</a>
          <a href="#" class="social-link" aria-label="TikTok">🎵</a>
          <a href="#" class="social-link" aria-label="YouTube">▶️</a>
        </div>
        <p style="font-size:.8rem;color:rgba(255,255,255,.5);margin-top:1.25rem;font-weight:600;">Suscríbete y obtén 10% OFF en tu primera compra</p>
        <form class="newsletter-form" aria-label="Newsletter" onsubmit="event.preventDefault();alert('✅ ¡Suscrito!');">
          <input type="email" class="newsletter-input" placeholder="tu@email.com" aria-label="Correo electrónico" required>
          <button type="submit" class="btn btn-primary btn-sm">Suscribir</button>
        </form>
      </div>
      <div>
        <h4 class="footer-col-title">Tienda</h4>
        <nav class="footer-links" aria-label="Tienda">
          <a href="${pageContext.request.contextPath}/productos">Todos los productos</a>
          <a href="${pageContext.request.contextPath}/productos?categoria=camisetas">Camisetas</a>
          <a href="${pageContext.request.contextPath}/productos?categoria=pantalonetas">Pantalonetas</a>
          <a href="${pageContext.request.contextPath}/productos?categoria=licras">Licras</a>
          <a href="${pageContext.request.contextPath}/productos?oferta=true">Ofertas</a>
        </nav>
      </div>
      <div>
        <h4 class="footer-col-title">Ayuda</h4>
        <nav class="footer-links" aria-label="Ayuda">
          <a href="#">Envíos y entregas</a>
          <a href="#">Devoluciones</a>
          <a href="#">Guía de tallas</a>
          <a href="#">Preguntas frecuentes</a>
          <a href="#">Contacto</a>
        </nav>
      </div>
      <div>
        <h4 class="footer-col-title">Mi cuenta</h4>
        <nav class="footer-links" aria-label="Mi cuenta">
          <a href="${pageContext.request.contextPath}/auth/login">Iniciar sesión</a>
          <a href="${pageContext.request.contextPath}/auth/register">Crear cuenta</a>
          <a href="${pageContext.request.contextPath}/carrito">Mi carrito</a>
        </nav>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 Elev8 Sportswear · GA7-220501096-AA2-EV02 · SENA ADSO</span>
      <div class="payment-icons">
        <span class="pay-icon">💳 Visa</span>
        <span class="pay-icon">💳 MC</span>
        <span class="pay-icon">🏦 PSE</span>
        <span class="pay-icon">📱 Nequi</span>
        <span class="pay-icon">💸 Efecty</span>
      </div>
    </div>
  </div>
</footer>