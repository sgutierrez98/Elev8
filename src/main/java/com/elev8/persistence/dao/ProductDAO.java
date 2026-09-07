package com.elev8.persistence.dao;

import com.elev8.persistence.model.Product;
import com.elev8.security.config.DatabaseConnection;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Data Access Object para Productos
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
public class ProductDAO {

    /**
     * Mapea un ResultSet a un objeto Product
     */
    private Product mapResultSetToProduct(ResultSet rs) throws SQLException {
        Product product = new Product();
        product.setId(rs.getInt("id"));
        product.setSku(rs.getString("sku"));
        product.setName(rs.getString("name"));
        product.setCategoryId(rs.getString("category_id"));
        product.setCategoryName(rs.getString("category_name"));
        product.setEmoji(rs.getString("emoji"));
        product.setPrice(rs.getBigDecimal("price"));
        product.setOldPrice(rs.getBigDecimal("old_price"));
        product.setRating(rs.getDouble("rating"));
        product.setReviews(rs.getInt("reviews"));
        product.setBadge(rs.getString("badge"));
        product.setBrand(rs.getString("brand"));
        product.setDescription(rs.getString("description"));
        product.setStock(rs.getInt("stock"));
        product.setActive(rs.getBoolean("active"));
        return product;
    }

    /**
     * Obtiene todos los productos activos
     * @return Lista de productos
     */
    public List<Product> findAll() {
        String sql = "SELECT p.*, c.name as category_name FROM products p "
                   + "LEFT JOIN categories c ON p.category_id = c.id "
                   + "WHERE p.active = TRUE ORDER BY p.id";
        List<Product> products = new ArrayList<>();

        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                products.add(mapResultSetToProduct(rs));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }

    /**
     * Busca un producto por ID
     * @param id ID del producto
     * @return Producto encontrado o null
     */
    public Product findById(int id) {
        String sql = "SELECT p.*, c.name as category_name FROM products p "
                   + "LEFT JOIN categories c ON p.category_id = c.id "
                   + "WHERE p.id = ? AND p.active = TRUE";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToProduct(rs);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Busca productos por categoría
     * @param categoryId ID de la categoría
     * @return Lista de productos de esa categoría
     */
    public List<Product> findByCategory(String categoryId) {
        String sql = "SELECT p.*, c.name as category_name FROM products p "
                   + "LEFT JOIN categories c ON p.category_id = c.id "
                   + "WHERE p.category_id = ? AND p.active = TRUE ORDER BY p.id";
        List<Product> products = new ArrayList<>();

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, categoryId);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    products.add(mapResultSetToProduct(rs));
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }

    /**
     * Obtiene productos en oferta
     * @return Lista de productos en oferta
     */
    public List<Product> findOnSale() {
        String sql = "SELECT p.*, c.name as category_name FROM products p "
                   + "LEFT JOIN categories c ON p.category_id = c.id "
                   + "WHERE p.active = TRUE AND p.old_price IS NOT NULL "
                   + "AND p.old_price > p.price ORDER BY (p.old_price - p.price) / p.old_price DESC";
        List<Product> products = new ArrayList<>();

        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                products.add(mapResultSetToProduct(rs));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }

    /**
     * Obtiene productos populares
     * @param limit Límite de resultados
     * @return Lista de productos populares
     */
    public List<Product> findPopular(int limit) {
        String sql = "SELECT p.*, c.name as category_name FROM products p "
                   + "LEFT JOIN categories c ON p.category_id = c.id "
                   + "WHERE p.active = TRUE ORDER BY p.reviews DESC, p.rating DESC LIMIT ?";
        List<Product> products = new ArrayList<>();

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, limit);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    products.add(mapResultSetToProduct(rs));
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }

    /**
     * Guarda un producto (inserta o actualiza)
     * @param product Producto a guardar
     * @return Producto guardado o null si falla
     */
    public Product save(Product product) {
        if (product.getId() == 0) {
            return insert(product);
        } else {
            return update(product);
        }
    }

    /**
     * Inserta un nuevo producto
     */
    private Product insert(Product product) {
        String sql = "INSERT INTO products (sku, name, category_id, emoji, price, old_price, "
                   + "rating, reviews, badge, brand, description, stock, active) "
                   + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, product.getSku());
            ps.setString(2, product.getName());
            ps.setString(3, product.getCategoryId());
            ps.setString(4, product.getEmoji());
            ps.setBigDecimal(5, product.getPrice());
            ps.setBigDecimal(6, product.getOldPrice());
            ps.setDouble(7, product.getRating() != null ? product.getRating() : 0);
            ps.setInt(8, product.getReviews() != null ? product.getReviews() : 0);
            ps.setString(9, product.getBadge());
            ps.setString(10, product.getBrand());
            ps.setString(11, product.getDescription());
            ps.setInt(12, product.getStock() != null ? product.getStock() : 0);
            ps.setBoolean(13, product.getActive() != null ? product.getActive() : true);

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Error al insertar producto");
            }

            try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    product.setId(generatedKeys.getInt(1));
                }
            }

            return product;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Actualiza un producto existente
     */
    private Product update(Product product) {
        String sql = "UPDATE products SET sku = ?, name = ?, category_id = ?, emoji = ?, "
                   + "price = ?, old_price = ?, rating = ?, reviews = ?, "
                   + "badge = ?, brand = ?, description = ?, stock = ?, "
                   + "active = ?, updated_at = CURRENT_TIMESTAMP "
                   + "WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, product.getSku());
            ps.setString(2, product.getName());
            ps.setString(3, product.getCategoryId());
            ps.setString(4, product.getEmoji());
            ps.setBigDecimal(5, product.getPrice());
            ps.setBigDecimal(6, product.getOldPrice());
            ps.setDouble(7, product.getRating() != null ? product.getRating() : 0);
            ps.setInt(8, product.getReviews() != null ? product.getReviews() : 0);
            ps.setString(9, product.getBadge());
            ps.setString(10, product.getBrand());
            ps.setString(11, product.getDescription());
            ps.setInt(12, product.getStock() != null ? product.getStock() : 0);
            ps.setBoolean(13, product.getActive() != null ? product.getActive() : true);
            ps.setInt(14, product.getId());

            int affectedRows = ps.executeUpdate();

            if (affectedRows > 0) {
                return product;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Elimina un producto (borrado lógico)
     * @param id ID del producto
     * @return true si se eliminó correctamente
     */
    public boolean delete(int id) {
        String sql = "UPDATE products SET active = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            int affectedRows = ps.executeUpdate();
            return affectedRows > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}