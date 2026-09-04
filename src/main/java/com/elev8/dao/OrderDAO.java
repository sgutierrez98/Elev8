package com.elev8.dao;

import com.elev8.config.DatabaseConnection;
import com.elev8.model.Order;
import com.elev8.model.OrderItem;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrderDAO {

    public Order save(Order order) {
        if (order.getId() == 0) {
            return insert(order);
        } else {
            return update(order);
        }
    }

    private Order insert(Order order) {
        String sql = "INSERT INTO orders (order_number, user_id, subtotal, shipping_cost, discount, total, " +
                     "status, payment_method, shipping_address) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, order.getOrderNumber());
            ps.setInt(2, order.getUserId());
            ps.setInt(3, order.getSubtotal());
            ps.setInt(4, order.getShippingCost());
            ps.setInt(5, order.getDiscount());
            ps.setInt(6, order.getTotal());
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

    private Order update(Order order) {
        String sql = "UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, order.getStatus());
            ps.setInt(2, order.getId());

            int affectedRows = ps.executeUpdate();
            return affectedRows > 0 ? order : null;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    private void insertOrderItem(int orderId, OrderItem item) throws SQLException {
        String sql = "INSERT INTO order_items (order_id, product_id, product_name, product_emoji, " +
                     "price, quantity, size, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, orderId);
            ps.setInt(2, item.getProductId());
            ps.setString(3, item.getProductName());
            ps.setString(4, item.getProductEmoji());
            ps.setInt(5, item.getPrice());
            ps.setInt(6, item.getQuantity());
            ps.setString(7, item.getSize());
            ps.setString(8, item.getColor());

            ps.executeUpdate();
        }
    }

    public List<Order> findByUserId(int userId) {
        List<Order> orders = new ArrayList<>();
        String sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, userId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                orders.add(mapResultSetToOrder(rs));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return orders;
    }

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
                item.setProductId(rs.getInt("product_id"));
                item.setProductName(rs.getString("product_name"));
                item.setProductEmoji(rs.getString("product_emoji"));
                item.setPrice(rs.getInt("price"));
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

    private Order mapResultSetToOrder(ResultSet rs) throws SQLException {
        Order order = new Order();
        order.setId(rs.getInt("id"));
        order.setOrderNumber(rs.getString("order_number"));
        order.setUserId(rs.getInt("user_id"));
        order.setSubtotal(rs.getInt("subtotal"));
        order.setShippingCost(rs.getInt("shipping_cost"));
        order.setDiscount(rs.getInt("discount"));
        order.setTotal(rs.getInt("total"));
        order.setStatus(rs.getString("status"));
        order.setPaymentMethod(rs.getString("payment_method"));
        order.setShippingAddress(rs.getString("shipping_address"));
        order.setCreatedAt(rs.getTimestamp("created_at"));
        order.setUpdatedAt(rs.getTimestamp("updated_at"));
        return order;
    }
}