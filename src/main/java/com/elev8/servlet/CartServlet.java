package com.elev8.servlet;

import com.elev8.model.CartItem;
import com.elev8.model.Product;
import com.elev8.service.ProductService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {

    private ProductService productService;

    @Override
    public void init() throws ServletException {
        productService = new ProductService();
    }

    @SuppressWarnings("unchecked")
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        HttpSession session = req.getSession();
        List<CartItem> cart = (List<CartItem>) session.getAttribute("cart");
        if (cart == null) {
            cart = new ArrayList<>();
            session.setAttribute("cart", cart);
        }

        String action = req.getParameter("action");

        if ("clear".equals(action)) {
            cart.clear();
            session.setAttribute("cart", cart);
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

        req.getRequestDispatcher("/cart.jsp").forward(req, resp);
    }

    @SuppressWarnings("unchecked")
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        HttpSession session = req.getSession();
        List<CartItem> cart = (List<CartItem>) session.getAttribute("cart");
        if (cart == null) {
            cart = new ArrayList<>();
            session.setAttribute("cart", cart);
        }

        String action = req.getParameter("action");

        if ("add".equals(action)) {
            try {
                int productId = Integer.parseInt(req.getParameter("productId"));
                int quantity = Integer.parseInt(req.getParameter("quantity"));

                Product product = productService.getProductById(productId);
                if (product == null) {
                    session.setAttribute("errorMessage", "Producto no encontrado");
                    resp.sendRedirect(req.getContextPath() + "/catalogue");
                    return;
                }

                // Buscar si ya existe
                for (CartItem item : cart) {
                    if (item.getProductId() == productId) {
                        item.setQuantity(item.getQuantity() + quantity);
                        session.setAttribute("successMessage", "Producto actualizado en el carrito");
                        resp.sendRedirect(req.getContextPath() + "/cart");
                        return;
                    }
                }

                // Agregar nuevo item
                CartItem newItem = new CartItem();
                newItem.setProductId(productId);
                newItem.setName(product.getName());
                newItem.setEmoji(product.getEmoji());
                newItem.setPrice(product.getPrice());
                newItem.setQuantity(quantity);

                cart.add(newItem);
                session.setAttribute("successMessage", "Producto agregado al carrito");

            } catch (Exception e) {
                session.setAttribute("errorMessage", "Error al agregar al carrito");
            }
            resp.sendRedirect(req.getContextPath() + "/cart");
            return;
        }

        if ("remove".equals(action)) {
            try {
                int index = Integer.parseInt(req.getParameter("index"));
                if (index >= 0 && index < cart.size()) {
                    cart.remove(index);
                    session.setAttribute("successMessage", "Producto eliminado del carrito");
                }
            } catch (Exception e) {
                session.setAttribute("errorMessage", "Error al eliminar del carrito");
            }
            resp.sendRedirect(req.getContextPath() + "/cart");
            return;
        }

        if ("update".equals(action)) {
            try {
                int index = Integer.parseInt(req.getParameter("index"));
                int quantity = Integer.parseInt(req.getParameter("quantity"));

                if (index >= 0 && index < cart.size()) {
                    if (quantity > 0) {
                        cart.get(index).setQuantity(quantity);
                        session.setAttribute("successMessage", "Carrito actualizado");
                    } else {
                        cart.remove(index);
                        session.setAttribute("successMessage", "Producto eliminado del carrito");
                    }
                }
            } catch (Exception e) {
                session.setAttribute("errorMessage", "Error al actualizar el carrito");
            }
            resp.sendRedirect(req.getContextPath() + "/cart");
            return;
        }

        resp.sendRedirect(req.getContextPath() + "/cart");
    }
}