package com.elev8.dao;

import com.elev8.config.DatabaseConnection;
import com.elev8.model.Product;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDAO {

    public List<Product> findAll() {
        List<Product> products = new ArrayList<>();
        String sql = "SELECT p.*, c.name as category_name FROM products p " +
                     "LEFT JOIN categories c ON p.category_id = c.id " +
                     "WHERE p.active = TRUE ORDER BY p.id";

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

    public Product findById(int id) {
        String sql = "SELECT p.*, c.name as category_name FROM products p " +
                     "LEFT JOIN categories c ON p.category_id = c.id " +
                     "WHERE p.id = ? AND p.active = TRUE";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return mapResultSetToProduct(rs);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Product> findByCategory(String categoryId) {
        List<Product> products = new ArrayList<>();
        String sql = "SELECT p.*, c.name as category_name FROM products p " +
                     "LEFT JOIN categories c ON p.category_id = c.id " +
                     "WHERE p.category_id = ? AND p.active = TRUE ORDER BY p.id";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, categoryId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                products.add(mapResultSetToProduct(rs));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }

    public List<Product> findOnSale() {
        List<Product> products = new ArrayList<>();
        String sql = "SELECT p.*, c.name as category_name FROM products p " +
                     "LEFT JOIN categories c ON p.category_id = c.id " +
                     "WHERE p.active = TRUE AND p.old_price IS NOT NULL " +
                     "AND p.old_price > p.price ORDER BY p.id";

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

    public List<Product> findPopular() {
        List<Product> products = new ArrayList<>();
        String sql = "SELECT p.*, c.name as category_name FROM products p " +
                     "LEFT JOIN categories c ON p.category_id = c.id " +
                     "WHERE p.active = TRUE ORDER BY p.reviews DESC, p.rating DESC LIMIT 4";

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

    public List<Product> findRelated(int productId, String categoryId) {
        List<Product> products = new ArrayList<>();
        String sql = "SELECT p.*, c.name as category_name FROM products p " +
                     "LEFT JOIN categories c ON p.category_id = c.id " +
                     "WHERE p.category_id = ? AND p.id != ? AND p.active = TRUE " +
                     "ORDER BY p.id LIMIT 4";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, categoryId);
            ps.setInt(2, productId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                products.add(mapResultSetToProduct(rs));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }

    // Método para guardar (insertar o actualizar)
    public Product save(Product product) {
        if (product.getId() == 0) {
            return insert(product);
        } else {
            return update(product);
        }
    }

    private Product insert(Product product) {
        String sql = "INSERT INTO products (sku, name, category_id, emoji, price, old_price, " +
                     "rating, reviews, badge, brand, description, stock, active) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, product.getSku());
            ps.setString(2, product.getName());
            ps.setString(3, product.getCategoryId());
            ps.setString(4, product.getEmoji());
            ps.setInt(5, product.getPrice());
            
            if (product.getOldPrice() > 0) {
                ps.setInt(6, product.getOldPrice());
            } else {
                ps.setNull(6, Types.INTEGER);
            }
            
            ps.setDouble(7, product.getRating() > 0 ? product.getRating() : 0);
            ps.setInt(8, product.getReviews() > 0 ? product.getReviews() : 0);
            
            if (product.getBadge() != null && !product.getBadge().isEmpty()) {
                ps.setString(9, product.getBadge());
            } else {
                ps.setNull(9, Types.VARCHAR);
            }
            
            ps.setString(10, product.getBrand());
            ps.setString(11, product.getDescription());
            ps.setInt(12, product.getStock() > 0 ? product.getStock() : 0);
            ps.setBoolean(13, true);

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

    private Product update(Product product) {
        String sql = "UPDATE products SET sku = ?, name = ?, category_id = ?, emoji = ?, " +
                     "price = ?, old_price = ?, rating = ?, reviews = ?, " +
                     "badge = ?, brand = ?, description = ?, stock = ?, " +
                     "updated_at = CURRENT_TIMESTAMP WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, product.getSku());
            ps.setString(2, product.getName());
            ps.setString(3, product.getCategoryId());
            ps.setString(4, product.getEmoji());
            ps.setInt(5, product.getPrice());
            
            if (product.getOldPrice() > 0) {
                ps.setInt(6, product.getOldPrice());
            } else {
                ps.setNull(6, Types.INTEGER);
            }
            
            ps.setDouble(7, product.getRating() > 0 ? product.getRating() : 0);
            ps.setInt(8, product.getReviews() > 0 ? product.getReviews() : 0);
            
            if (product.getBadge() != null && !product.getBadge().isEmpty()) {
                ps.setString(9, product.getBadge());
            } else {
                ps.setNull(9, Types.VARCHAR);
            }
            
            ps.setString(10, product.getBrand());
            ps.setString(11, product.getDescription());
            ps.setInt(12, product.getStock() > 0 ? product.getStock() : 0);
            ps.setInt(13, product.getId());

            int affectedRows = ps.executeUpdate();
            return affectedRows > 0 ? product : null;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean delete(int id) {
        String sql = "DELETE FROM products WHERE id = ?";

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

    private Product mapResultSetToProduct(ResultSet rs) throws SQLException {
        Product product = new Product();
        product.setId(rs.getInt("id"));
        product.setSku(rs.getString("sku"));
        product.setName(rs.getString("name"));
        product.setCategory(rs.getString("category_name"));
        product.setCategoryId(rs.getString("category_id"));
        product.setEmoji(rs.getString("emoji"));
        product.setPrice(rs.getInt("price"));
        product.setOldPrice(rs.getInt("old_price"));
        product.setRating(rs.getDouble("rating"));
        product.setReviews(rs.getInt("reviews"));
        product.setBadge(rs.getString("badge"));
        product.setBrand(rs.getString("brand"));
        product.setDescription(rs.getString("description"));
        product.setStock(rs.getInt("stock"));
        product.setActive(rs.getBoolean("active"));
        return product;
    }
}