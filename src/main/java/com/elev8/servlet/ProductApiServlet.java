package com.elev8.servlet;

import com.elev8.model.Product;
import com.elev8.service.ProductService;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * API REST para Productos
 * Endpoint: /api/products
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
@WebServlet("/api/products/*")
public class ProductApiServlet extends HttpServlet {

    private ProductService productService;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        productService = new ProductService();
        gson = new Gson();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String pathInfo = req.getPathInfo();
        PrintWriter out = resp.getWriter();

        try {
            // GET /api/products/popular - Productos populares
            if (pathInfo != null && pathInfo.contains("/popular")) {
                String limitParam = req.getParameter("limit");
                int limit = limitParam != null ? Integer.parseInt(limitParam) : 4;
                List<Product> popular = productService.getPopularProducts(limit);
                out.print(gson.toJson(popular));
                return;
            }

            // GET /api/products/onsale - Productos en oferta
            if (pathInfo != null && pathInfo.contains("/onsale")) {
                List<Product> onSale = productService.getProductsOnSale();
                out.print(gson.toJson(onSale));
                return;
            }

            // GET /api/products/{id} - Producto por ID
            if (pathInfo != null && pathInfo.length() > 1) {
                try {
                    int id = Integer.parseInt(pathInfo.substring(1));
                    Product product = productService.getProductById(id);
                    if (product != null) {
                        out.print(gson.toJson(product));
                    } else {
                        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        out.print("{\"error\":\"Producto no encontrado\"}");
                    }
                    return;
                } catch (NumberFormatException e) {
                    // No es un ID válido
                }
            }

            // GET /api/products - Listar todos los productos
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

            out.print(gson.toJson(products));

        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\":\"" + e.getMessage() + "\"}");
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try {
            Product product = gson.fromJson(req.getReader(), Product.class);
            Product saved = productService.createProduct(product);

            if (saved != null) {
                resp.setStatus(HttpServletResponse.SC_CREATED);
                resp.getWriter().write(gson.toJson(saved));
            } else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Error al crear el producto\"}");
            }

        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}