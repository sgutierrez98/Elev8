-- ============================================================
-- Elev8 Sportswear
-- Script de creacion de tabla: productos
-- Base de datos: PostgreSQL
-- Coherente con el modelo relacional / diagrama entidad-relacion
-- elaborado en las evidencias previas de diseño de base de datos.
-- ============================================================

CREATE TABLE IF NOT EXISTS productos (
    id_producto        SERIAL PRIMARY KEY,
    nombre_producto     VARCHAR(100)   NOT NULL,
    categoria           VARCHAR(50)    NOT NULL,
    talla               VARCHAR(10)    NOT NULL,
    marca               VARCHAR(50)    NOT NULL,
    precio_unitario     NUMERIC(10,2)  NOT NULL CHECK (precio_unitario >= 0),
    stock_disponible    INTEGER        NOT NULL CHECK (stock_disponible >= 0)
);

-- Datos de ejemplo para pruebas del modulo CRUD
INSERT INTO productos (nombre_producto, categoria, talla, marca, precio_unitario, stock_disponible)
VALUES
    ('Camiseta Running Pro', 'Camisetas', 'M', 'Elev8', 89900.00, 50),
    ('Tenis Training Flex', 'Calzado', '42', 'Elev8', 249900.00, 30),
    ('Pantaloneta Deportiva', 'Pantalonetas', 'L', 'Elev8', 69900.00, 40);
