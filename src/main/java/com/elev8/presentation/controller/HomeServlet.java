package com.elev8.presentation.controller;

import com.elev8.business.service.ProductService;
import com.elev8.persistence.model.Product;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet({"/home", "/"})
public class HomeServlet extends HttpServlet {

    private ProductService productService;

    @Override
    public void init() throws ServletException {
        productService = new ProductService();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        List<Product> popular = productService.getPopularProducts(4);
        req.setAttribute("popularProducts", popular);
        req.getRequestDispatcher("/index.jsp").forward(req, resp);
    }
}