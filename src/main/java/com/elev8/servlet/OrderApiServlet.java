package com.elev8.servlet;

import com.elev8.model.Order;
import com.elev8.model.OrderItem;
import com.elev8.model.User;
import com.elev8.service.OrderService;
import com.elev8.service.ProductService;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * API REST para Órdenes
 * Endpoint: /api/orders
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
@WebServlet("/api/orders/*")
public class OrderApiServlet extends HttpServlet {

    private OrderService orderService;
    private ProductService productService;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        orderService = new OrderService();
        productService = new ProductService();
        gson = new Gson();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try {
            HttpSession session = req.getSession();
            User user = (User) session.getAttribute("user");

            if (user == null) {
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                resp.getWriter().write("{\"error\":\"Debes iniciar sesión\"}");
                return;
            }

            Map<String, Object> requestData = gson.fromJson(req.getReader(), Map.class);

            // Crear pedido
            Order order = new Order();
            order.setUserId(user.getId());
            order.setSubtotal(((Number) requestData.get("subtotal")).intValue());
            order.setShippingCost(((Number) requestData.get("shippingCost")).intValue());
            order.setDiscount(((Number) requestData.get("discount")).intValue());
            order.setTotal(((Number) requestData.get("total")).intValue());
            order.setPaymentMethod((String) requestData.get("paymentMethod"));
            order.setShippingAddress((String) requestData.get("address") + ", " +
                                    requestData.get("city") + ", " +
                                    requestData.get("department"));

            // Agregar items
            List<Map<String, Object>> items = (List<Map<String, Object>>) requestData.get("items");
            for (Map<String, Object> itemData : items) {
                OrderItem item = new OrderItem();
                item.setProductId(((Number) itemData.get("productId")).intValue());
                item.setProductName((String) itemData.get("productName"));
                item.setProductEmoji((String) itemData.get("productEmoji"));
                item.setPrice(((Number) itemData.get("price")).intValue());
                item.setQuantity(((Number) itemData.get("quantity")).intValue());
                item.setSize((String) itemData.get("size"));
                item.setColor((String) itemData.get("color"));
                order.addItem(item);
            }

            Order savedOrder = orderService.createOrder(order);

            if (savedOrder != null) {
                resp.setStatus(HttpServletResponse.SC_CREATED);
                resp.getWriter().write("{\"success\":true,\"order\":{\"id\":" + savedOrder.getId() +
                                       ",\"orderNumber\":\"" + savedOrder.getOrderNumber() + "\"}}");
            } else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Error al crear el pedido\"}");
            }

        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
            e.printStackTrace();
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try {
            HttpSession session = req.getSession();
            User user = (User) session.getAttribute("user");

            if (user == null) {
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                resp.getWriter().write("{\"error\":\"Debes iniciar sesión\"}");
                return;
            }

            String pathInfo = req.getPathInfo();

            if (pathInfo != null && pathInfo.length() > 1) {
                int orderId = Integer.parseInt(pathInfo.substring(1));
                Order order = orderService.getOrderById(orderId);
                if (order != null) {
                    resp.getWriter().write(gson.toJson(order));
                } else {
                    resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    resp.getWriter().write("{\"error\":\"Pedido no encontrado\"}");
                }
            } else {
                // Listar pedidos del usuario
                List<Order> orders = orderService.getOrdersByUserId(user.getId());
                resp.getWriter().write(gson.toJson(orders));
            }

        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
            e.printStackTrace();
        }
    }
}