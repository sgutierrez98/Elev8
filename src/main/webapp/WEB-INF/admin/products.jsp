<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar Productos – Elev8 Sportswear</title>
    <link rel="stylesheet" href="<c:url value='/css/main.css' />">
</head>
<body>
    <jsp:include page="/fragments/navbar.jsp" />

    <main class="page-content">
        <div class="container">
            <c:if test="${not sessionScope.isLoggedIn || sessionScope.user.role != 'ADMIN'}">
                <div class="alert alert-danger" style="margin-bottom:1rem;">
                    <span>🚫</span>
                    <span>No tienes permisos para acceder a esta sección.</span>
                </div>
                <a href="<c:url value='/' />" class="btn btn-primary">Volver al inicio</a>
                <jsp:include page="/fragments/footer.jsp" />
                </body></html>
                <% return; %>
            </c:if>

            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;">
                <h1 style="font-size:var(--text-3xl);font-weight:900;color:var(--navy);">Gestionar Productos</h1>
                <button class="btn btn-primary" onclick="showForm()">➕ Nuevo Producto</button>
            </div>

            <c:if test="${not empty sessionScope.successMessage}">
                <div class="alert alert-success" style="margin-bottom:1rem;">
                    <span>✅</span>
                    <span>${sessionScope.successMessage}</span>
                </div>
                <c:remove var="successMessage" scope="session" />
            </c:if>

            <c:if test="${not empty sessionScope.errorMessage}">
                <div class="alert alert-danger" style="margin-bottom:1rem;">
                    <span>❌</span>
                    <span>${sessionScope.errorMessage}</span>
                </div>
                <c:remove var="errorMessage" scope="session" />
            </c:if>

            <!-- Formulario -->
            <div id="productForm" style="display:none;background:var(--white);border-radius:var(--r-lg);padding:2rem;margin-bottom:2rem;box-shadow:var(--shadow-md);">
                <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--navy);margin-bottom:1rem;" id="formTitle">Nuevo Producto</h2>
                <form action="<c:url value='/admin/products' />" method="post" id="productFormElement">
                    <input type="hidden" name="action" id="formAction" value="create">
                    <input type="hidden" name="id" id="productId" value="">

                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                        <div class="form-group">
                            <label class="form-label" for="sku">SKU *</label>
                            <input class="form-input" type="text" id="sku" name="sku" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="name">Nombre *</label>
                            <input class="form-input" type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="categoryId">Categoría *</label>
                            <select class="form-input form-select" id="categoryId" name="categoryId" required>
                                <option value="">Seleccionar...</option>
                                <c:forEach var="category" items="${categories}">
                                    <option value="${category.id}">${category.name}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="emoji">Emoji</label>
                            <input class="form-input" type="text" id="emoji" name="emoji" placeholder="👕">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="price">Precio *</label>
                            <input class="form-input" type="number" id="price" name="price" step="100" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="oldPrice">Precio Anterior</label>
                            <input class="form-input" type="number" id="oldPrice" name="oldPrice" step="100">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="brand">Marca</label>
                            <input class="form-input" type="text" id="brand" name="brand" placeholder="Elev8">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="stock">Stock *</label>
                            <input class="form-input" type="number" id="stock" name="stock" required>
                        </div>
                        <div class="form-group" style="grid-column:1/-1;">
                            <label class="form-label" for="description">Descripción</label>
                            <textarea class="form-input" id="description" name="description" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="badge">Badge</label>
                            <select class="form-input form-select" id="badge" name="badge">
                                <option value="">Ninguno</option>
                                <option value="POPULAR">POPULAR</option>
                                <option value="NUEVO">NUEVO</option>
                                <option value="OFERTA">OFERTA</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="sizes">Tallas (separadas por coma)</label>
                            <input class="form-input" type="text" id="sizes" name="sizes" placeholder="XS,S,M,L,XL">
                        </div>
                        <div class="form-group" style="grid-column:1/-1;">
                            <label class="form-label" for="colors">Colores (separados por coma)</label>
                            <input class="form-input" type="text" id="colors" name="colors" placeholder="#0F0F14,#1A237E,#B71C1C">
                        </div>
                    </div>

                    <div style="display:flex;gap:1rem;margin-top:1rem;">
                        <button type="submit" class="btn btn-primary">Guardar</button>
                        <button type="button" class="btn btn-ghost" onclick="hideForm()">Cancelar</button>
                    </div>
                </form>
            </div>

            <!-- Tabla de productos -->
            <div class="card" style="overflow-x:auto;">
                <table style="width:100%;border-collapse:collapse;font-size:.875rem;">
                    <thead style="background:var(--navy);color:var(--white);">
                        <tr>
                            <th style="padding:12px;text-align:left;">ID</th>
                            <th style="padding:12px;text-align:left;">SKU</th>
                            <th style="padding:12px;text-align:left;">Nombre</th>
                            <th style="padding:12px;text-align:left;">Categoría</th>
                            <th style="padding:12px;text-align:right;">Precio</th>
                            <th style="padding:12px;text-align:center;">Stock</th>
                            <th style="padding:12px;text-align:center;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach var="product" items="${products}">
                            <tr style="border-bottom:1px solid var(--gray-200);">
                                <td style="padding:12px;">${product.id}</td>
                                <td style="padding:12px;">${product.sku}</td>
                                <td style="padding:12px;">${product.emoji} ${product.name}</td>
                                <td style="padding:12px;">${product.categoryName}</td>
                                <td style="padding:12px;text-align:right;"><fmt:formatNumber value="${product.price}" type="currency" currencySymbol="$" maxFractionDigits="0"/></td>
                                <td style="padding:12px;text-align:center;">${product.stock}</td>
                                <td style="padding:12px;text-align:center;">
                                    <button class="btn btn-sm btn-outline-navy" onclick="editProduct(${product.id})">✏️</button>
                                    <button class="btn btn-sm btn-ghost" onclick="deleteProduct(${product.id})">🗑️</button>
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </div>

            <c:if test="${empty products}">
                <div class="empty-state">
                    <div class="empty-icon">📦</div>
                    <h3>No hay productos</h3>
                    <p>Comienza agregando tu primer producto.</p>
                </div>
            </c:if>
        </div>
    </main>

    <jsp:include page="/fragments/footer.jsp" />

    <script src="<c:url value='/js/main.js' />"></script>
    <script>
        function showForm() {
            document.getElementById('productForm').style.display = 'block';
            document.getElementById('formTitle').textContent = 'Nuevo Producto';
            document.getElementById('formAction').value = 'create';
            document.getElementById('productFormElement').reset();
            document.getElementById('productId').value = '';
            document.getElementById('productForm').scrollIntoView({behavior:'smooth'});
        }

        function hideForm() {
            document.getElementById('productForm').style.display = 'none';
        }

        function editProduct(id) {
            fetch('${pageContext.request.contextPath}/api/products/' + id)
                .then(response => response.json())
                .then(product => {
                    document.getElementById('productForm').style.display = 'block';
                    document.getElementById('formTitle').textContent = 'Editar Producto';
                    document.getElementById('formAction').value = 'update';
                    document.getElementById('productId').value = product.id;
                    document.getElementById('sku').value = product.sku;
                    document.getElementById('name').value = product.name;
                    document.getElementById('categoryId').value = product.categoryId;
                    document.getElementById('emoji').value = product.emoji || '';
                    document.getElementById('price').value = product.price;
                    document.getElementById('oldPrice').value = product.oldPrice || '';
                    document.getElementById('brand').value = product.brand || '';
                    document.getElementById('stock').value = product.stock;
                    document.getElementById('description').value = product.description || '';
                    document.getElementById('badge').value = product.badge || '';
                    document.getElementById('sizes').value = product.sizes ? product.sizes.join(',') : '';
                    document.getElementById('colors').value = product.colors ? product.colors.join(',') : '';
                    document.getElementById('productForm').scrollIntoView({behavior:'smooth'});
                })
                .catch(error => {
                    alert('Error al cargar el producto');
                });
        }

        function deleteProduct(id) {
            if (confirm('¿Estás seguro de eliminar este producto?')) {
                window.location.href = '${pageContext.request.contextPath}/admin/products?action=delete&id=' + id;
            }
        }
    </script>
</body>
</html>