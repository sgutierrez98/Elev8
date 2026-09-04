<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${empty product ? 'Nuevo' : 'Editar'} Producto – Elev8 Sportswear</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
  <style>
    .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; }
    .form-grid .full-width { grid-column:1/-1; }
    .form-grid .form-group { display:flex; flex-direction:column; gap:4px; }
    .form-grid .form-group label { font-weight:600; font-size:var(--text-sm); color:var(--gray-700); }
    .form-grid .form-group .form-input { padding:10px 14px; border:1.5px solid var(--gray-300); border-radius:var(--r-md); font-size:var(--text-sm); }
    .form-grid .form-group .form-input:focus { border-color:var(--red); outline:none; box-shadow:0 0 0 3px rgba(233,69,96,0.1); }
    .tag-group { display:flex; gap:8px; flex-wrap:wrap; }
    .tag { display:inline-flex; align-items:center; gap:4px; background:var(--gray-100); padding:4px 10px; border-radius:var(--r-sm); font-size:var(--text-xs); }
    .tag-remove { cursor:pointer; color:var(--red); font-weight:700; }
  </style>
</head>
<body>
  <jsp:include page="/WEB-INF/views/fragments/navbar.jsp"/>

  <main class="page-content">
    <div class="container">
      <div style="max-width:800px;margin:0 auto;">
        <h1 style="font-size:var(--text-3xl);font-weight:900;color:var(--navy);margin:2rem 0;">${empty product ? 'Nuevo Producto' : 'Editar Producto'}</h1>

        <c:if test="${not empty error}">
          <div class="alert alert-danger" style="margin-bottom:1rem;">${error}</div>
        </c:if>

        <div class="card" style="padding:2rem;">
          <form action="${pageContext.request.contextPath}/productos/${empty product ? 'guardar' : 'actualizar/' += product.id}" method="post">
            <div class="form-grid">
              <!-- SKU -->
              <div class="form-group">
                <label for="sku">SKU *</label>
                <input type="text" id="sku" name="sku" class="form-input" value="${product.sku}" placeholder="ELV-CAM-001" required>
              </div>

              <!-- Nombre -->
              <div class="form-group">
                <label for="name">Nombre *</label>
                <input type="text" id="name" name="name" class="form-input" value="${product.name}" placeholder="Camiseta Dry-Fit Pro" required>
              </div>

              <!-- Categoría -->
              <div class="form-group">
                <label for="categoryId">Categoría *</label>
                <select id="categoryId" name="categoryId" class="form-input" required>
                  <option value="">Seleccionar...</option>
                  <option value="camisetas" ${product.categoryId == 'camisetas' ? 'selected' : ''}>👕 Camisetas</option>
                  <option value="pantalonetas" ${product.categoryId == 'pantalonetas' ? 'selected' : ''}>🩳 Pantalonetas</option>
                  <option value="licras" ${product.categoryId == 'licras' ? 'selected' : ''}>🩱 Licras</option>
                  <option value="chaquetas" ${product.categoryId == 'chaquetas' ? 'selected' : ''}>🧥 Chaquetas</option>
                  <option value="accesorios" ${product.categoryId == 'accesorios' ? 'selected' : ''}>🎒 Accesorios</option>
                </select>
              </div>

              <!-- Emoji -->
              <div class="form-group">
                <label for="emoji">Emoji</label>
                <input type="text" id="emoji" name="emoji" class="form-input" value="${product.emoji}" placeholder="👕">
              </div>

              <!-- Precio -->
              <div class="form-group">
                <label for="price">Precio *</label>
                <input type="number" id="price" name="price" class="form-input" value="${product.price}" placeholder="89900" step="100" required>
              </div>

              <!-- Precio Anterior -->
              <div class="form-group">
                <label for="oldPrice">Precio Anterior (Oferta)</label>
                <input type="number" id="oldPrice" name="oldPrice" class="form-input" value="${product.oldPrice}" placeholder="109900" step="100">
              </div>

              <!-- Marca -->
              <div class="form-group">
                <label for="brand">Marca</label>
                <input type="text" id="brand" name="brand" class="form-input" value="${product.brand}" placeholder="Elev8">
              </div>

              <!-- Badge -->
              <div class="form-group">
                <label for="badge">Badge</label>
                <select id="badge" name="badge" class="form-input">
                  <option value="">Ninguno</option>
                  <option value="POPULAR" ${product.badge == 'POPULAR' ? 'selected' : ''}>🔥 Popular</option>
                  <option value="NUEVO" ${product.badge == 'NUEVO' ? 'selected' : ''}>✨ Nuevo</option>
                  <option value="OFERTA" ${product.badge == 'OFERTA' ? 'selected' : ''}>🏷 Oferta</option>
                </select>
              </div>

              <!-- Stock -->
              <div class="form-group">
                <label for="stock">Stock</label>
                <input type="number" id="stock" name="stock" class="form-input" value="${product.stock}" placeholder="50">
              </div>

              <!-- Tallas -->
              <div class="form-group full-width">
                <label>Tallas</label>
                <div class="tag-group" id="sizeTags">
                  <c:forEach var="size" items="${product.sizes}">
                    <span class="tag">${size} <span class="tag-remove" onclick="this.parentElement.remove()">✕</span></span>
                  </c:forEach>
                </div>
                <div style="display:flex;gap:8px;margin-top:8px;">
                  <input type="text" id="sizeInput" class="form-input" placeholder="Ej: M" style="width:80px;">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="addTag('sizeInput','sizeTags','sizes')">Agregar</button>
                </div>
                <input type="hidden" id="sizes" name="sizes" value="${product.sizes.stream().toArray().join(',')}">
              </div>

              <!-- Colores -->
              <div class="form-group full-width">
                <label>Colores (Código Hex)</label>
                <div class="tag-group" id="colorTags">
                  <c:forEach var="color" items="${product.colors}">
                    <span class="tag">
                      <span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${color};border:1px solid #ddd;"></span>
                      ${color}
                      <span class="tag-remove" onclick="this.parentElement.remove()">✕</span>
                    </span>
                  </c:forEach>
                </div>
                <div style="display:flex;gap:8px;margin-top:8px;">
                  <input type="text" id="colorInput" class="form-input" placeholder="Ej: #0F0F14" style="width:150px;">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="addTag('colorInput','colorTags','colors')">Agregar</button>
                </div>
                <input type="hidden" id="colors" name="colors" value="${product.colors.stream().toArray().join(',')}">
              </div>

              <!-- Descripción -->
              <div class="form-group full-width">
                <label for="description">Descripción</label>
                <textarea id="description" name="description" class="form-input" rows="4" style="resize:vertical;">${product.description}</textarea>
              </div>
            </div>

            <div style="display:flex;gap:1rem;margin-top:2rem;">
              <button type="submit" class="btn btn-primary btn-lg">${empty product ? 'Crear Producto' : 'Actualizar Producto'}</button>
              <a href="${pageContext.request.contextPath}/productos/admin" class="btn btn-outline btn-lg">Cancelar</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>

  <jsp:include page="/WEB-INF/views/fragments/footer.jsp"/>
  <script src="${pageContext.request.contextPath}/js/main.js"></script>
  <script>
    function addTag(inputId, containerId, hiddenId) {
      const input = document.getElementById(inputId);
      const container = document.getElementById(containerId);
      const hidden = document.getElementById(hiddenId);
      const value = input.value.trim();
      
      if (value) {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.innerHTML = `${value} <span class="tag-remove" onclick="this.parentElement.remove(); updateHidden('${hiddenId}','${containerId}')">✕</span>`;
        container.appendChild(tag);
        input.value = '';
        updateHidden(hiddenId, containerId);
      }
    }
    
    function updateHidden(hiddenId, containerId) {
      const container = document.getElementById(containerId);
      const hidden = document.getElementById(hiddenId);
      const tags = container.querySelectorAll('.tag');
      const values = Array.from(tags).map(t => t.textContent.replace('✕', '').trim());
      hidden.value = values.join(',');
    }
    
    document.addEventListener('DOMContentLoaded', function() {
      updateHidden('sizes', 'sizeTags');
      updateHidden('colors', 'colorTags');
    });
  </script>
</body>
</html>