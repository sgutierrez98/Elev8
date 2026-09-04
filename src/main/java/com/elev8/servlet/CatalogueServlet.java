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

@WebServlet("/catalogue")
public class CatalogueServlet extends HttpServlet {

    private ProductService productService;

    @Override
    public void init() throws ServletException {
        productService = new ProductService();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String category = req.getParameter("category");
        String onSale = req.getParameter("onSale");

        List<Product> products;

        if ("true".equals(onSale)) {
            products = productService.getProductsOnSale();
        } else if (category != null && !category.isEmpty()) {
            products = productService.getProductsByCategory(category);
        } else {
            products = productService.getAllProducts();
        }

        req.setAttribute("products", products);
        req.setAttribute("totalProducts", products.size());
        req.getRequestDispatcher("/catalogue.jsp").forward(req, resp);
    }
}