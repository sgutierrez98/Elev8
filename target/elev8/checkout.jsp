<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout – Elev8 Sportswear</title>
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/main.css">
</head>
<body>

    <jsp:include page="/WEB-INF/fragments/navbar.jsp" />

    <main class="page-content">
        <div class="container">
            <nav style="font-size:.875rem;color:var(--gray-500);padding:16px 0;">
                <a href="<%= request.getContextPath() %>/" style="color:var(--gray-500);">Inicio</a>
                <span style="margin:0 8px;">›</span>
                <a href="<%= request.getContextPath() %>/cart" style="color:var(--gray-500);">Carrito</a>
                <span style="margin:0 8px;">›</span>
                <span style="color:var(--gray-800);font-weight:500;">Checkout</span>
            </nav>

            <h1 style="font-size:2rem;font-weight:900;color:var(--navy);margin-bottom:32px;">✅ Finalizar compra</h1>

            <c:if test="${not empty errorMessage}">
                <div style="background:var(--red-light);color:var(--red-dark);padding:12px 16px;border-radius:var(--r-md);margin-bottom:16px;border-left:4px solid var(--red);">
                    ❌ ${errorMessage}
                </div>
            </c:if>

            <c:if test="${empty cartItems}">
                <div style="background:var(--white);border-radius:var(--r-lg);padding:60px;text-align:center;box-shadow:var(--shadow-sm);">
                    <div style="font-size:4rem;margin-bottom:16px;">🛒</div>
                    <h3 style="color:var(--navy);font-size:1.25rem;">No hay productos en el carrito</h3>
                    <p style="color:var(--gray-500);margin:16px 0;">Agrega productos para continuar</p>
                    <a href="<%= request.getContextPath() %>/catalogue" class="btn btn-primary">Ver catálogo</a>
                </div>
            </c:if>

            <c:if test="${not empty cartItems}">
                <div style="display:grid;grid-template-columns:1fr 340px;gap:32px;">
                    <!-- Formulario -->
                    <div>
                        <form action="<%= request.getContextPath() %>/checkout" method="post" id="checkoutForm">
                            <!-- Datos personales -->
                            <div style="background:var(--white);border-radius:var(--r-lg);padding:24px;box-shadow:var(--shadow-sm);margin-bottom:24px;">
                                <h2 style="font-size:1.1rem;font-weight:800;color:var(--navy);margin-bottom:16px;">1. Datos personales</h2>
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                                    <div class="form-group">
                                        <label class="form-label" for="firstName">Nombre *</label>
                                        <input class="form-input" type="text" id="firstName" name="firstName" value="${user.firstName}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="lastName">Apellido *</label>
                                        <input class="form-input" type="text" id="lastName" name="lastName" value="${user.lastName}" required>
                                    </div>
                                </div>
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;">
                                    <div class="form-group">
                                        <label class="form-label" for="email">Correo electrónico *</label>
                                        <input class="form-input" type="email" id="email" name="email" value="${user.email}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="phone">Teléfono *</label>
                                        <input class="form-input" type="tel" id="phone" name="phone" value="${user.phone}" required>
                                    </div>
                                </div>
                            </div>

                            <!-- Dirección de envío -->
                            <div style="background:var(--white);border-radius:var(--r-lg);padding:24px;box-shadow:var(--shadow-sm);margin-bottom:24px;">
                                <h2 style="font-size:1.1rem;font-weight:800;color:var(--navy);margin-bottom:16px;">2. Dirección de envío</h2>
                                <div class="form-group">
                                    <label class="form-label" for="address">Dirección *</label>
                                    <input class="form-input" type="text" id="address" name="address" placeholder="Calle 123 # 45-67" required>
                                </div>
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;">
                                    <div class="form-group">
                                        <label class="form-label" for="city">Ciudad *</label>
                                        <input class="form-input" type="text" id="city" name="city" placeholder="Bogotá" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="department">Departamento *</label>
                                        <input class="form-input" type="text" id="department" name="department" placeholder="Cundinamarca" required>
                                    </div>
                                </div>
                            </div>

                            <!-- Método de pago -->
                            <div style="background:var(--white);border-radius:var(--r-lg);padding:24px;box-shadow:var(--shadow-sm);">
                                <h2 style="font-size:1.1rem;font-weight:800;color:var(--navy);margin-bottom:16px;">3. Método de pago</h2>
                                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
                                    <div style="border:2px solid var(--red);border-radius:var(--r-md);padding:16px;text-align:center;cursor:pointer;background:var(--red-light);" onclick="selectPayment(this, 'tarjeta')">
                                        <div style="font-size:2rem;">💳</div>
                                        <div style="font-weight:600;font-size:.8rem;">Tarjeta</div>
                                    </div>
                                    <div style="border:2px solid var(--gray-300);border-radius:var(--r-md);padding:16px;text-align:center;cursor:pointer;" onclick="selectPayment(this, 'pse')">
                                        <div style="font-size:2rem;">🏦</div>
                                        <div style="font-weight:600;font-size:.8rem;">PSE</div>
                                    </div>
                                    <div style="border:2px solid var(--gray-300);border-radius:var(--r-md);padding:16px;text-align:center;cursor:pointer;" onclick="selectPayment(this, 'nequi')">
                                        <div style="font-size:2rem;">📱</div>
                                        <div style="font-weight:600;font-size:.8rem;">Nequi</div>
                                    </div>
                                </div>
                                <input type="hidden" name="paymentMethod" id="paymentMethod" value="tarjeta">
                            </div>

                            <button type="submit" class="btn btn-primary btn-full btn-lg" style="margin-top:24px;font-size:1rem;">
                                ✅ Confirmar pedido
                            </button>
                        </form>
                    </div>

                    <!-- Resumen -->
                    <div style="background:var(--white);border-radius:var(--r-lg);padding:24px;box-shadow:var(--shadow-md);height:fit-content;position:sticky;top:90px;">
                        <h2 style="font-size:1.1rem;font-weight:800;color:var(--navy);margin-bottom:16px;padding-bottom:16px;border-bottom:2px solid var(--gray-100);">Resumen del pedido</h2>

                        <div style="max-height:300px;overflow-y:auto;margin-bottom:16px;">
                            <c:forEach var="item" items="${cartItems}">
                                <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--gray-100);">
                                    <span style="font-size:1.5rem;">${item.emoji}</span>
                                    <div style="flex:1;">
                                        <div style="font-size:.875rem;font-weight:600;">${item.name}</div>
                                        <div style="font-size:.75rem;color:var(--gray-500);">Cant: ${item.quantity}</div>
                                    </div>
                                    <span style="font-weight:700;color:var(--red);"><fmt:formatNumber value="${item.subtotal}" type="currency" currencySymbol="$" maxFractionDigits="0"/></span>
                                </div>
                            </c:forEach>
                        </div>

                        <div style="display:flex;justify-content:space-between;padding:8px 0;">
                            <span style="color:var(--gray-600);">Subtotal</span>
                            <span style="font-weight:700;"><fmt:formatNumber value="${subtotal}" type="currency" currencySymbol="$" maxFractionDigits="0"/></span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--gray-100);">
                            <span style="color:var(--gray-600);">Envío</span>
                            <span style="font-weight:700;color:var(--success);">
                                <c:choose>
                                    <c:when test="${shipping == 0}">GRATIS</c:when>
                                    <c:otherwise><fmt:formatNumber value="${shipping}" type="currency" currencySymbol="$" maxFractionDigits="0"/></c:otherwise>
                                </c:choose>
                            </span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:16px 0;font-size:1.2rem;font-weight:900;">
                            <span style="color:var(--navy);">Total</span>
                            <span style="color:var(--red);"><fmt:formatNumber value="${total}" type="currency" currencySymbol="$" maxFractionDigits="0"/></span>
                        </div>

                        <p style="font-size:.75rem;color:var(--success);text-align:center;margin-top:8px;">🔒 Transacción 100% segura</p>
                    </div>
                </div>
            </c:if>
        </div>
    </main>

    <jsp:include page="/WEB-INF/fragments/footer.jsp" />

    <script>
        function selectPayment(el, method) {
            document.querySelectorAll('[onclick="selectPayment"]').forEach(e => {
                e.style.borderColor = 'var(--gray-300)';
                e.style.background = 'transparent';
            });
            el.style.borderColor = 'var(--red)';
            el.style.background = 'var(--red-light)';
            document.getElementById('paymentMethod').value = method;
        }
    </script>

</body>
</html>