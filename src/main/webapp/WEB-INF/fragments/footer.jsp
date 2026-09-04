<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<footer style="background:var(--navy);color:rgba(255,255,255,.7);padding:40px 0;margin-top:40px;">
    <div class="container" style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:40px;">
        <div>
            <div style="font-size:1.8rem;font-weight:900;color:var(--white);">ELEV8</div>
            <p style="font-size:.875rem;color:rgba(255,255,255,.5);margin-top:8px;">Tu tienda de ropa deportiva de alto rendimiento.</p>
        </div>
        <div>
            <h4 style="font-size:.78rem;font-weight:700;color:var(--white);text-transform:uppercase;margin-bottom:18px;">Tienda</h4>
            <a href="<%= request.getContextPath() %>/catalogue" style="display:block;font-size:.875rem;color:rgba(255,255,255,.5);margin-bottom:8px;transition:color .2s;">Todos los productos</a>
            <a href="<%= request.getContextPath() %>/catalogue" style="display:block;font-size:.875rem;color:rgba(255,255,255,.5);margin-bottom:8px;transition:color .2s;">Ofertas</a>
        </div>
        <div>
            <h4 style="font-size:.78rem;font-weight:700;color:var(--white);text-transform:uppercase;margin-bottom:18px;">Mi cuenta</h4>
            <a href="<%= request.getContextPath() %>/login" style="display:block;font-size:.875rem;color:rgba(255,255,255,.5);margin-bottom:8px;transition:color .2s;">Iniciar sesión</a>
            <a href="<%= request.getContextPath() %>/register" style="display:block;font-size:.875rem;color:rgba(255,255,255,.5);margin-bottom:8px;transition:color .2s;">Crear cuenta</a>
        </div>
    </div>
    <div class="container" style="border-top:1px solid rgba(255,255,255,.1);padding-top:20px;margin-top:20px;font-size:.78rem;color:rgba(255,255,255,.35);text-align:center;">
        © 2025 Elev8 Sportswear · SENA ADSO · GA6-220501096-AA4-EV03
    </div>
</footer>