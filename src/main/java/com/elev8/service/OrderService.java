package com.elev8.service;

import com.elev8.dao.OrderDAO;
import com.elev8.model.Order;
import com.elev8.model.OrderItem;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class OrderService {

    private OrderDAO orderDAO;

    public OrderService() {
        this.orderDAO = new OrderDAO();
    }

    public Order createOrder(Order order) {
        // Generar número de orden
        String orderNumber = generateOrderNumber();
        order.setOrderNumber(orderNumber);

        // Calcular totales
        int subtotal = 0;
        for (OrderItem item : order.getItems()) {
            subtotal += item.getSubtotal();
        }
        order.setSubtotal(subtotal);
        order.setTotal(subtotal + order.getShippingCost() - order.getDiscount());

        return orderDAO.save(order);
    }

    private String generateOrderNumber() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String random = String.format("%04d", (int) (Math.random() * 10000));
        return "ELV-" + timestamp + "-" + random;
    }

    public Order getOrderById(int id) {
        return orderDAO.findById(id);
    }

    public List<Order> getOrdersByUserId(int userId) {
        return orderDAO.findByUserId(userId);
    }
}