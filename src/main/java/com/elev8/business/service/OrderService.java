package com.elev8.business.service;

import com.elev8.persistence.dao.OrderDAO;
import com.elev8.persistence.model.Order;
import com.elev8.persistence.model.OrderItem;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Servicio para gestión de pedidos
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
public class OrderService {

    private final OrderDAO orderDAO;
    private final ProductService productService;

    public OrderService() {
        this.orderDAO = new OrderDAO();
        this.productService = new ProductService();
    }

    /**
     * Genera un número de pedido único
     * @return Número de pedido
     */
    private String generateOrderNumber() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String random = String.format("%04d", (int) (Math.random() * 10000));
        return "ELV-" + timestamp + "-" + random;
    }

    /**
     * Crear un nuevo pedido
     * @param order Datos del pedido
     * @return Pedido creado o null
     */
    public Order createOrder(Order order) {
        if (order == null || order.getItems() == null || order.getItems().isEmpty()) {
            return null;
        }

        // Validar stock y calcular totales
        BigDecimal subtotal = BigDecimal.ZERO;
        for (OrderItem item : order.getItems()) {
            // Validar stock
            if (!productService.hasStock(item.getProductId(), item.getQuantity())) {
                return null;
            }
            subtotal = subtotal.add(item.getSubtotal());
        }

        // Generar número de pedido
        order.setOrderNumber(generateOrderNumber());

        // Calcular totales
        order.setSubtotal(subtotal);
        order.setShippingCost(order.getShippingCost() != null ? order.getShippingCost() : BigDecimal.ZERO);
        order.setDiscount(order.getDiscount() != null ? order.getDiscount() : BigDecimal.ZERO);
        order.setTotal(subtotal.add(order.getShippingCost()).subtract(order.getDiscount()));

        // Guardar pedido
        Order savedOrder = orderDAO.save(order);

        if (savedOrder != null) {
            // Descontar stock de los productos
            for (OrderItem item : savedOrder.getItems()) {
                productService.reduceStock(item.getProductId(), item.getQuantity());
            }
        }

        return savedOrder;
    }

    /**
     * Obtener un pedido por ID
     * @param id ID del pedido
     * @return Pedido encontrado o null
     */
    public Order getOrderById(int id) {
        return orderDAO.findById(id);
    }

    /**
     * Obtener pedidos de un usuario
     * @param userId ID del usuario
     * @return Lista de pedidos del usuario
     */
    public List<Order> getOrdersByUser(int userId) {
        return orderDAO.findByUserId(userId);
    }

    /**
     * Actualizar estado de un pedido
     * @param orderId ID del pedido
     * @param status Nuevo estado
     * @return true si se actualizó correctamente
     */
    public boolean updateOrderStatus(int orderId, String status) {
        Order order = getOrderById(orderId);
        if (order == null) {
            return false;
        }

        // Validar transición de estados
        if (!isValidStatusTransition(order.getStatus(), status)) {
            return false;
        }

        order.setStatus(status);
        return orderDAO.save(order) != null;
    }

    /**
     * Validar transición de estados de un pedido
     * @param currentStatus Estado actual
     * @param newStatus Nuevo estado
     * @return true si la transición es válida
     */
    private boolean isValidStatusTransition(String currentStatus, String newStatus) {
        // Si el pedido está cancelado o entregado, no se puede cambiar
        if ("CANCELLED".equals(currentStatus) || "DELIVERED".equals(currentStatus)) {
            return false;
        }

        // Validar transiciones permitidas
        switch (currentStatus) {
            case "PENDING":
                return "PAID".equals(newStatus) || "CANCELLED".equals(newStatus);
            case "PAID":
                return "PROCESSING".equals(newStatus) || "CANCELLED".equals(newStatus);
            case "PROCESSING":
                return "SHIPPED".equals(newStatus) || "CANCELLED".equals(newStatus);
            case "SHIPPED":
                return "DELIVERED".equals(newStatus);
            default:
                return false;
        }
    }

    /**
     * Cancelar un pedido
     * @param orderId ID del pedido
     * @return true si se canceló correctamente
     */
    public boolean cancelOrder(int orderId) {
        return updateOrderStatus(orderId, "CANCELLED");
    }

    /**
     * Obtener todos los pedidos (para admin)
     * @return Lista de todos los pedidos
     */
    public List<Order> getAllOrders() {
        return orderDAO.findAll();
    }
}