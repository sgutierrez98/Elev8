package com.elev8.servlet;

import com.elev8.model.Product;
import com.elev8.service.ProductService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/home")
public class HomeServlet extends HttpServlet {

    private ProductService productService;

    @Override
    public void init() throws ServletException {
        productService = new ProductService();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        // Productos populares
        List<Product> popular = productService.getPopularProducts();
        req.setAttribute("popularProducts", popular);

        req.getRequestDispatcher("/index.jsp").forward(req, resp);
    }
}