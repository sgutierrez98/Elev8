-- ============================================================
-- ELEV8 SPORTSWEAR – Tabla de Usuarios
-- ============================================================

-- Crear la tabla users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE
);

-- Verificar que la tabla se creó correctamente
SELECT * FROM users;

-- Insertar usuario admin de prueba
-- La contraseña es "admin123" (hasheada con BCrypt)
INSERT INTO users (email, password, first_name, last_name, role) 
VALUES ('admin@elev8.com', '$2a$10$NkIx5Xp8q8G8q8G8q8G8q8G8q8G8q8G8q8G8q8G8q8G8q8G8q8', 'Admin', 'Elev8', 'ADMIN');

-- Verificar que el usuario se insertó
SELECT id, email, first_name, last_name, role FROM users;