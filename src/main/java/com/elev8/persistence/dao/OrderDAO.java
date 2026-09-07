package com.elev8.persistence.dao;

import com.elev8.persistence.model.Order;
import com.elev8.persistence.model.OrderItem;
import com.elev8.security.config.DatabaseConnection;

import java.sql.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Data Access Object para Pedidos
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
public class OrderDAO {

    /**
     * Mapea un ResultSet a un objeto Order
     */
    private Order mapResultSetToOrder(ResultSet rs) throws SQLException {
        Order order = new Order();
        order.setId(rs.getInt("id"));
        order.setOrderNumber(rs.getString("order_number"));
        order.setUserId(rs.getInt("user_id"));
        order.setSubtotal(rs.getBigDecimal("subtotal"));
        order.setShippingCost(rs.getBigDecimal("shipping_cost"));
        order.setDiscount(rs.getBigDecimal("discount"));
        order.setTotal(rs.getBigDecimal("total"));
        order.setStatus(rs.getString("status"));
        order.setPaymentMethod(rs.getString("payment_method"));
        order.setShippingAddress(rs.getString("shipping_address"));

        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            order.setCreatedAt(createdAt.toLocalDateTime());
        }

        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            order.setUpdatedAt(updatedAt.toLocalDateTime());
        }

        return order;
    }

    /**
     * Guarda un pedido (inserta o actualiza)
     * @param order Pedido a guardar
     * @return Pedido guardado o null si falla
     */
    public Order save(Order order) {
        if (order.getId() == 0) {
            return insert(order);
        } else {
            return update(order);
        }
    }

    /**
     * Inserta un nuevo pedido
     */
    private Order insert(Order order) {
        String sql = "INSERT INTO orders (order_number, user_id, subtotal, shipping_cost, discount, total, "
                   + "status, payment_method, shipping_address) "
                   + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, order.getOrderNumber());
            ps.setInt(2, order.getUserId());
            ps.setBigDecimal(3, order.getSubtotal());
            ps.setBigDecimal(4, order.getShippingCost());
            ps.setBigDecimal(5, order.getDiscount());
            ps.setBigDecimal(6, order.getTotal());
            ps.setString(7, order.getStatus());
            ps.setString(8, order.getPaymentMethod());
            ps.setString(9, order.getShippingAddress());

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Error al insertar pedido");
            }

            try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    order.setId(generatedKeys.getInt(1));
                }
            }

            // Insertar items del pedido
            for (OrderItem item : order.getItems()) {
                insertOrderItem(order.getId(), item);
            }

            return order;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Inserta un item de pedido
     */
    private void insertOrderItem(int orderId, OrderItem item) throws SQLException {
        String sql = "INSERT INTO order_items (order_id, product_id, product_name, product_emoji, "
                   + "price, quantity, size, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, orderId);
            ps.setInt(2, item.getProductId());
            ps.setString(3, item.getProductName());
            ps.setString(4, item.getProductEmoji());
            ps.setBigDecimal(5, item.getPrice());
            ps.setInt(6, item.getQuantity());
            ps.setString(7, item.getSize());
            ps.setString(8, item.getColor());

            ps.executeUpdate();
        }
    }

    /**
     * Actualiza un pedido existente
     */
    private Order update(Order order) {
        String sql = "UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, order.getStatus());
            ps.setInt(2, order.getId());

            int affectedRows = ps.executeUpdate();

            if (affectedRows > 0) {
                return order;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Busca pedidos por ID de usuario
     * @param userId ID del usuario
     * @return Lista de pedidos del usuario
     */
    public List<Order> findByUserId(int userId) {
        List<Order> orders = new ArrayList<>();
        String sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, userId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Order order = mapResultSetToOrder(rs);
                order.setItems(findOrderItems(order.getId()));
                orders.add(order);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return orders;
    }

    /**
     * Busca un pedido por ID
     * @param id ID del pedido
     * @return Pedido encontrado o null
     */
    public Order findById(int id) {
        String sql = "SELECT * FROM orders WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                Order order = mapResultSetToOrder(rs);
                order.setItems(findOrderItems(id));
                return order;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Busca los items de un pedido
     * @param orderId ID del pedido
     * @return Lista de items del pedido
     */
    private List<OrderItem> findOrderItems(int orderId) {
        List<OrderItem> items = new ArrayList<>();
        String sql = "SELECT * FROM order_items WHERE order_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, orderId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                OrderItem item = new OrderItem();
                item.setId(rs.getInt("id"));
                item.setOrderId(rs.getInt("order_id"));
                item.setProductId(rs.getInt("product_id"));
                item.setProductName(rs.getString("product_name"));
                item.setProductEmoji(rs.getString("product_emoji"));
                item.setPrice(rs.getBigDecimal("price"));
                item.setQuantity(rs.getInt("quantity"));
                item.setSize(rs.getString("size"));
                item.setColor(rs.getString("color"));
                items.add(item);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return items;
    }

    /**
     * Obtiene todos los pedidos (para administrador)
     * @return Lista de todos los pedidos
     */
    public List<Order> findAll() {
        List<Order> orders = new ArrayList<>();
        String sql = "SELECT * FROM orders ORDER BY created_at DESC";

        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Order order = mapResultSetToOrder(rs);
                order.setItems(findOrderItems(order.getId()));
                orders.add(order);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return orders;
    }
}