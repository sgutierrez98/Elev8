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
                    // Productos relacionados
                    List<Product> related = productService.getRelatedProducts(id);
                    req.setAttribute("product", product);
                    req.setAttribute("relatedProducts", related);
                    req.getRequestDispatcher("/product.jsp").forward(req, resp);
                    return;
                }
            } catch (NumberFormatException e) {
                // ID inválido
            }
        }

        // Si no hay ID o es inválido, redirigir al catálogo
        resp.sendRedirect(req.getContextPath() + "/catalogue");
    }
}