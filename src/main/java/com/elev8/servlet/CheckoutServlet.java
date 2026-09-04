package com.elev8.servlet;

import com.elev8.model.CartItem;
import com.elev8.model.Order;
import com.elev8.model.OrderItem;
import com.elev8.model.User;
import com.elev8.service.OrderService;
import com.elev8.service.ProductService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.List;

@WebServlet("/checkout")
public class CheckoutServlet extends HttpServlet {

    private OrderService orderService;
    private ProductService productService;

    @Override
    public void init() throws ServletException {
        orderService = new OrderService();
        productService = new ProductService();
    }

    @SuppressWarnings("unchecked")
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        HttpSession session = req.getSession();

        // Verificar si el usuario está logueado
        User user = (User) session.getAttribute("user");
        if (user == null) {
            session.setAttribute("errorMessage", "Debes iniciar sesión para finalizar la compra");
            resp.sendRedirect(req.getContextPath() + "/login");
            return;
        }

        // Verificar si hay productos en el carrito
        List<CartItem> cart = (List<CartItem>) session.getAttribute("cart");
        if (cart == null || cart.isEmpty()) {
            session.setAttribute("errorMessage", "No hay productos en el carrito");
            resp.sendRedirect(req.getContextPath() + "/cart");
            return;
        }

        // Calcular totales
        int subtotal = 0;
        for (CartItem item : cart) {
            subtotal += item.getSubtotal();
        }
        int shipping = subtotal >= 150000 ? 0 : 8000;
        int total = subtotal + shipping;

        req.setAttribute("cartItems", cart);
        req.setAttribute("subtotal", subtotal);
        req.setAttribute("shipping", shipping);
        req.setAttribute("total", total);
        req.setAttribute("user", user);

        req.getRequestDispatcher("/checkout.jsp").forward(req, resp);
    }

    @SuppressWarnings("unchecked")
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        HttpSession session = req.getSession();

        // Verificar usuario
        User user = (User) session.getAttribute("user");
        if (user == null) {
            resp.sendRedirect(req.getContextPath() + "/login");
            return;
        }

        // Obtener datos del formulario
        String firstName = req.getParameter("firstName");
        String lastName = req.getParameter("lastName");
        String address = req.getParameter("address");
        String city = req.getParameter("city");
        String department = req.getParameter("department");
        String phone = req.getParameter("phone");
        String email = req.getParameter("email");
        String paymentMethod = req.getParameter("paymentMethod");

        // Validar campos
        if (address == null || address.trim().isEmpty() ||
            city == null || city.trim().isEmpty() ||
            department == null || department.trim().isEmpty()) {

            req.setAttribute("errorMessage", "Todos los campos de dirección son obligatorios");
            doGet(req, resp);
            return;
        }

        // Obtener carrito
        List<CartItem> cart = (List<CartItem>) session.getAttribute("cart");
        if (cart == null || cart.isEmpty()) {
            resp.sendRedirect(req.getContextPath() + "/cart");
            return;
        }

        // Calcular totales
        int subtotal = 0;
        for (CartItem item : cart) {
            subtotal += item.getSubtotal();
        }
        int shipping = subtotal >= 150000 ? 0 : 8000;
        int total = subtotal + shipping;

        // Crear pedido
        Order order = new Order();
        order.setUserId(user.getId());
        order.setSubtotal(subtotal);
        order.setShippingCost(shipping);
        order.setDiscount(0);
        order.setTotal(total);
        order.setStatus("PENDING");
        order.setPaymentMethod(paymentMethod != null ? paymentMethod : "Tarjeta");
        order.setShippingAddress(address + ", " + city + ", " + department);

        // Agregar items
        for (CartItem item : cart) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(item.getProductId());
            orderItem.setProductName(item.getName());
            orderItem.setProductEmoji(item.getEmoji());
            orderItem.setPrice(item.getPrice());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setSize(item.getSize());
            orderItem.setColor(item.getColor());
            order.addItem(orderItem);
        }

        // Guardar pedido
        Order savedOrder = orderService.createOrder(order);

        if (savedOrder != null) {
            // Limpiar carrito
            session.removeAttribute("cart");
            session.setAttribute("successMessage", "✅ ¡Pedido #" + savedOrder.getOrderNumber() + " confirmado!");
            resp.sendRedirect(req.getContextPath() + "/");
        } else {
            req.setAttribute("errorMessage", "Error al procesar el pedido");
            doGet(req, resp);
        }
    }
}