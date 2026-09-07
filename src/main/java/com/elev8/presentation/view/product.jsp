<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${product.name} – Elev8 Sportswear</title>
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/main.css">
</head>
<body>

    <jsp:include page="/WEB-INF/fragments/navbar.jsp" />

    <main class="page-content">
        <div class="container">
            <nav style="font-size:.875rem;color:var(--gray-500);padding:16px 0;">
                <a href="<%= request.getContextPath() %>/" style="color:var(--gray-500);">Inicio</a>
                <span style="margin:0 8px;">›</span>
                <a href="<%= request.getContextPath() %>/catalogue" style="color:var(--gray-500);">Catálogo</a>
                <span style="margin:0 8px;">›</span>
                <span style="color:var(--gray-800);font-weight:500;">${product.name}</span>
            </nav>

            <c:if test="${not empty sessionScope.successMessage}">
                <div style="background:var(--green-light);color:var(--success);padding:12px 16px;border-radius:var(--r-md);margin-bottom:16px;border-left:4px solid var(--success);">
                    ✅ ${sessionScope.successMessage}
                </div>
                <c:remove var="successMessage" scope="session" />
            </c:if>

            <c:if test="${empty product}">
                <div style="background:var(--white);border-radius:var(--r-lg);padding:60px;text-align:center;box-shadow:var(--shadow-sm);">
                    <div style="font-size:4rem;margin-bottom:16px;">❌</div>
                    <h3 style="color:var(--navy);font-size:1.25rem;">Producto no encontrado</h3>
                    <p style="color:var(--gray-500);margin:16px 0;">El producto que buscas no existe.</p>
                    <a href="<%= request.getContextPath() %>/catalogue" class="btn btn-primary">Ver catálogo</a>
                </div>
            </c:if>

            <c:if test="${not empty product}">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;padding:32px 0;">
                    <!-- Imagen -->
                    <div>
                        <div style="background:var(--gray-100);border-radius:var(--r-lg);aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:10rem;">
                            ${product.emoji}
                        </div>
                    </div>

                    <!-- Info -->
                    <div>
                        <p style="color:var(--red);font-weight:700;text-transform:uppercase;font-size:.75rem;letter-spacing:.1em;">${product.category}</p>
                        <h1 style="font-size:2.5rem;font-weight:900;color:var(--navy);margin:8px 0;">${product.name}</h1>

                        <div style="display:flex;align-items:center;gap:16px;margin:16px 0;">
                            <span style="font-size:2rem;font-weight:900;color:var(--red);">${product.priceFormatted}</span>
                            <c:if test="${product.oldPrice > 0}">
                                <span style="font-size:1rem;color:var(--gray-500);text-decoration:line-through;">${product.oldPriceFormatted}</span>
                                <span style="background:var(--success);color:var(--white);padding:2px 12px;border-radius:var(--r-full);font-weight:700;font-size:.8rem;">-${product.discount}%</span>
                            </c:if>
                        </div>

                        <p style="color:var(--gray-700);line-height:1.8;margin:24px 0;">${product.description}</p>

                        <div style="margin:24px 0;">
                            <p style="font-weight:600;color:var(--navy);margin-bottom:8px;">Tallas disponibles</p>
                            <div style="display:flex;gap:8px;">
                                <span style="border:1.5px solid var(--gray-300);border-radius:4px;padding:8px 16px;font-weight:600;">S</span>
                                <span style="border:1.5px solid var(--navy);border-radius:4px;padding:8px 16px;font-weight:600;background:var(--navy);color:var(--white);">M</span>
                                <span style="border:1.5px solid var(--gray-300);border-radius:4px;padding:8px 16px;font-weight:600;">L</span>
                                <span style="border:1.5px solid var(--gray-300);border-radius:4px;padding:8px 16px;font-weight:600;">XL</span>
                            </div>
                        </div>

                        <form action="<%= request.getContextPath() %>/cart" method="post">
                            <input type="hidden" name="action" value="add">
                            <input type="hidden" name="productId" value="${product.id}">
                            <input type="hidden" name="quantity" value="1">
                            <button type="submit" class="btn btn-primary btn-lg" style="width:100%;">🛒 Agregar al carrito</button>
                        </form>

                        <!-- Garantías -->
                        <div style="display:flex;flex-direction:column;gap:12px;margin-top:24px;">
                            <div style="display:flex;align-items:center;gap:12px;background:var(--gray-100);padding:12px 16px;border-radius:var(--r-md);">
                                <span style="font-size:1.2rem;">🚚</span>
                                <span style="font-size:.875rem;">Envío gratis en compras mayores a $150.000</span>
                            </div>
                            <div style="display:flex;align-items:center;gap:12px;background:var(--gray-100);padding:12px 16px;border-radius:var(--r-md);">
                                <span style="font-size:1.2rem;">↩️</span>
                                <span style="font-size:.875rem;">30 días para devoluciones sin preguntas</span>
                            </div>
                            <div style="display:flex;align-items:center;gap:12px;background:var(--gray-100);padding:12px 16px;border-radius:var(--r-md);">
                                <span style="font-size:1.2rem;">🔒</span>
                                <span style="font-size:.875rem;">Pago 100% seguro y encriptado</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Productos relacionados -->
                <c:if test="${not empty relatedProducts}">
                    <section style="padding:40px 0;border-top:1px solid var(--gray-200);">
                        <h2 style="font-size:1.5rem;font-weight:800;color:var(--navy);margin-bottom:24px;">También te puede gustar</h2>
                        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;">
                            <c:forEach var="related" items="${relatedProducts}">
                                <div style="background:var(--white);border-radius:var(--r-lg);box-shadow:var(--shadow-sm);overflow:hidden;transition:transform .2s, box-shadow .2s;" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='var(--shadow-sm)'">
                                    <a href="<%= request.getContextPath() %>/product?id=${related.id}" style="text-decoration:none;color:inherit;">
                                        <div style="background:var(--gray-100);aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:4rem;">
                                            ${related.emoji}
                                        </div>
                                        <div style="padding:16px;">
                                            <p style="font-size:.72rem;color:var(--gray-500);text-transform:uppercase;">${related.category}</p>
                                            <h3 style="font-size:.95rem;font-weight:700;color:var(--navy);">${related.name}</h3>
                                            <div style="display:flex;align-items:center;gap:10px;margin:8px 0;">
                                                <span style="color:var(--red);font-weight:700;font-size:1.2rem;">${related.priceFormatted}</span>
                                                <c:if test="${related.oldPrice > 0}">
                                                    <span style="color:var(--gray-500);text-decoration:line-through;font-size:.85rem;">${related.oldPriceFormatted}</span>
                                                </c:if>
                                            </div>
                                        </div>
                                    </a>
                                    <div style="padding:0 16px 16px 16px;">
                                        <form action="<%= request.getContextPath() %>/cart" method="post">
                                            <input type="hidden" name="action" value="add">
                                            <input type="hidden" name="productId" value="${related.id}">
                                            <input type="hidden" name="quantity" value="1">
                                            <button type="submit" class="btn btn-primary btn-full btn-sm">🛒 Agregar al carrito</button>
                                        </form>
                                    </div>
                                </div>
                            </c:forEach>
                        </div>
                    </section>
                </c:if>
            </c:if>
        </div>
    </main>

    <jsp:include page="/WEB-INF/fragments/footer.jsp" />

</body>
</html>