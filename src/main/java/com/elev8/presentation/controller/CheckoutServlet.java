package com.elev8.presentation.controller;

import com.elev8.business.service.OrderService;
import com.elev8.business.service.ProductService;
import com.elev8.persistence.model.Order;
import com.elev8.persistence.model.OrderItem;
import com.elev8.persistence.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.math.BigDecimal;
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

    // ... resto del código ...
}