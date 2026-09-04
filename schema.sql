-- ============================================================
-- ELEV8 SPORTSWEAR – Database Schema (PostgreSQL)
-- ============================================================

-- Crear base de datos
CREATE DATABASE elev8_db;

\c elev8_db;

-- ============================================================
-- TABLA: categories
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(10),
    bg_color VARCHAR(20),
    accent_color VARCHAR(20),
    active BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- TABLA: products
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    category_id VARCHAR(50) NOT NULL,
    emoji VARCHAR(10),
    price DECIMAL(12,2) NOT NULL,
    old_price DECIMAL(12,2),
    rating DECIMAL(3,2) DEFAULT 0,
    reviews INT DEFAULT 0,
    badge VARCHAR(50),
    brand VARCHAR(100),
    description TEXT,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- ============================================================
-- TABLA: product_sizes
-- ============================================================
CREATE TABLE IF NOT EXISTS product_sizes (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    size VARCHAR(20) NOT NULL,
    stock INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE(product_id, size)
);

-- ============================================================
-- TABLA: product_colors
-- ============================================================
CREATE TABLE IF NOT EXISTS product_colors (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    color_code VARCHAR(20) NOT NULL,
    color_name VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE(product_id, color_code)
);

-- ============================================================
-- INSERTS INICIALES
-- ============================================================

-- Categorías
INSERT INTO categories (id, name, icon, bg_color, accent_color) VALUES
('camisetas', 'Camisetas', '👕', '#E8EEFF', '#1A1A2E'),
('pantalonetas', 'Pantalonetas', '🩳', '#FFE8E8', '#C62828'),
('licras', 'Licras', '🩱', '#E8FFE8', '#2E7D32'),
('chaquetas', 'Chaquetas', '🧥', '#FFFDE8', '#F57F17'),
('accesorios', 'Accesorios', '🎒', '#F3E8FF', '#6A1B9A');

-- Productos
INSERT INTO products (sku, name, category_id, emoji, price, old_price, rating, reviews, badge, brand, description, stock) VALUES
('ELV-CAM-001', 'Camiseta Dry-Fit Pro', 'camisetas', '👕', 89900, 109900, 4.8, 124, 'POPULAR', 'Elev8', 'Camiseta de alto rendimiento con tecnología de secado rápido y protección UV UPF 30+.', 50),
('ELV-CAM-002', 'Camiseta Compresión Elite', 'camisetas', '👕', 109900, NULL, 4.5, 87, 'NUEVO', 'Elev8', 'Camiseta de compresión para entrenamiento de fuerza.', 30),
('ELV-PAN-001', 'Pantaloneta Running Elite', 'pantalonetas', '🩳', 75000, 90000, 4.6, 203, 'OFERTA', 'Elev8', 'Pantaloneta ligera con bolsillos laterales y tecnología de ventilación.', 40),
('ELV-PAN-002', 'Pantaloneta Ciclismo Pro', 'pantalonetas', '🩳', 98000, NULL, 4.3, 56, NULL, 'Elev8', 'Pantaloneta acolchada para ciclismo de ruta y montaña.', 25),
('ELV-LIC-001', 'Licra Compresión Total', 'licras', '🩱', 120000, 145000, 4.7, 178, 'OFERTA', 'Elev8', 'Licra de compresión graduada para fuerza y recuperación muscular.', 35),
('ELV-LIC-002', 'Licra Running Mujer', 'licras', '🩱', 95000, NULL, 4.5, 94, 'NUEVO', 'Elev8', 'Licra de alto rendimiento para running con bolsillo trasero.', 20),
('ELV-CHA-001', 'Chaqueta Cortaviento Sport', 'chaquetas', '🧥', 185000, 220000, 4.4, 67, 'OFERTA', 'Elev8', 'Chaqueta resistente al viento con empaque compacto.', 15),
('ELV-CHA-002', 'Chaqueta Térmica Pro', 'chaquetas', '🧥', 220000, NULL, 4.6, 43, 'NUEVO', 'Elev8', 'Chaqueta térmica para entrenamientos en clima frío.', 10),
('ELV-ACC-001', 'Medias Deportivas Pro', 'accesorios', '🧦', 25000, 30000, 4.8, 412, 'POPULAR', 'Elev8', 'Medias con amortiguación reforzada en talón y puntera.', 100),
('ELV-ACC-002', 'Gorra Deportiva Elev8', 'accesorios', '🧢', 45000, NULL, 4.4, 88, NULL, 'Elev8', 'Gorra con visera curva, material Dry-Fit y ajuste velcro.', 60),
('ELV-ACC-003', 'Guantes Training Pro', 'accesorios', '🥊', 55000, NULL, 4.2, 34, 'NUEVO', 'Elev8', 'Guantes de entrenamiento con protección de palma y dedos libres.', 45),
('ELV-ACC-004', 'Morral Deportivo Elev8', 'accesorios', '🎒', 135000, 160000, 4.5, 71, 'OFERTA', 'Elev8', 'Morral deportivo 28L con compartimiento para laptop.', 20);

-- Tallas
INSERT INTO product_sizes (product_id, size, stock) VALUES
(1, 'XS', 10), (1, 'S', 15), (1, 'M', 20), (1, 'L', 15), (1, 'XL', 10),
(2, 'S', 8), (2, 'M', 12), (2, 'L', 10), (2, 'XL', 8), (2, 'XXL', 5),
(3, 'XS', 10), (3, 'S', 15), (3, 'M', 20), (3, 'L', 15), (3, 'XL', 10),
(4, 'S', 10), (4, 'M', 12), (4, 'L', 10), (4, 'XL', 8),
(5, 'XS', 8), (5, 'S', 12), (5, 'M', 10), (5, 'L', 8),
(6, 'XS', 6), (6, 'S', 8), (6, 'M', 10), (6, 'L', 6),
(7, 'XS', 5), (7, 'S', 5), (7, 'M', 8), (7, 'L', 5), (7, 'XL', 3), (7, 'XXL', 2),
(8, 'S', 4), (8, 'M', 6), (8, 'L', 4), (8, 'XL', 3),
(9, 'Única', 50),
(10, 'Única', 30),
(11, 'S/M', 15), (11, 'L/XL', 12),
(12, 'Única', 10);

-- Colores
INSERT INTO product_colors (product_id, color_code, color_name) VALUES
(1, '#0F0F14', 'Negro'), (1, '#1A237E', 'Azul marino'), (1, '#B71C1C', 'Rojo'), (1, '#B0BEC5', 'Gris'),
(2, '#0F0F14', 'Negro'), (2, '#1A237E', 'Azul marino'), (2, '#37474F', 'Gris oscuro'),
(3, '#0F0F14', 'Negro'), (3, '#1A237E', 'Azul marino'), (3, '#2E7D32', 'Verde'),
(4, '#0F0F14', 'Negro'), (4, '#B0BEC5', 'Gris'),
(5, '#0F0F14', 'Negro'), (5, '#880E4F', 'Borgoña'), (5, '#1A237E', 'Azul marino'),
(6, '#880E4F', 'Borgoña'), (6, '#1A237E', 'Azul marino'), (6, '#0F0F14', 'Negro'),
(7, '#B71C1C', 'Rojo'), (7, '#0F0F14', 'Negro'), (7, '#1A237E', 'Azul marino'),
(8, '#0F0F14', 'Negro'), (8, '#37474F', 'Gris oscuro'), (8, '#B0BEC5', 'Gris'),
(9, '#FFFFFF', 'Blanco'), (9, '#0F0F14', 'Negro'), (9, '#B0BEC5', 'Gris'),
(10, '#0F0F14', 'Negro'), (10, '#1A237E', 'Azul marino'), (10, '#B71C1C', 'Rojo'),
(11, '#0F0F14', 'Negro'), (11, '#B71C1C', 'Rojo'),
(12, '#0F0F14', 'Negro'), (12, '#37474F', 'Gris oscuro'), (12, '#B71C1C', 'Rojo');