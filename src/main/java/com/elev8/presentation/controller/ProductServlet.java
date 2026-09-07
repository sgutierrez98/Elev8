package com.elev8.presentation.controller;

import com.elev8.business.service.ProductService;
import com.elev8.persistence.model.Product;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@WebServlet("/product")
public class ProductServlet extends HttpServlet {

    private ProductService productService;

    @Override
    public void init() throws ServletException {
        productService = new ProductService();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String idParam = req.getParameter("id");

        if (idParam != null && !idParam.isEmpty()) {
            try {
                int id = Integer.parseInt(idParam);
                Product product = productService.getProductById(id);
                if (product != null) {
                    List<Product> related = productService.getRelatedProducts(id, 4);
                    req.setAttribute("product", product);
                    req.setAttribute("relatedProducts", related);
                    req.getRequestDispatcher("/product.jsp").forward(req, resp);
                    return;
                }
            } catch (NumberFormatException e) {
                // ID inválido
            }
        }

        resp.sendRedirect(req.getContextPath() + "/catalogue");
    }
}