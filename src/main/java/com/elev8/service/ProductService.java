package com.elev8.service;

import com.elev8.dao.ProductDAO;
import com.elev8.model.Product;

import java.util.ArrayList;
import java.util.List;

public class ProductService {

    private ProductDAO productDAO;

    public ProductService() {
        this.productDAO = new ProductDAO();
    }

    public List<Product> getAllProducts() {
        return productDAO.findAll();
    }

    public List<Product> getProductsByCategory(String category) {
        if (category == null || category.isEmpty()) {
            return productDAO.findAll();
        }
        String categoryId = mapCategoryNameToId(category);
        return productDAO.findByCategory(categoryId);
    }

    public Product getProductById(int id) {
        return productDAO.findById(id);
    }

    public List<Product> getPopularProducts() {
        return productDAO.findPopular();
    }

    public List<Product> getProductsOnSale() {
        return productDAO.findOnSale();
    }

    public List<Product> getRelatedProducts(int productId) {
        Product product = getProductById(productId);
        if (product == null) return new ArrayList<>();

        String categoryId = mapCategoryNameToId(product.getCategory());
        return productDAO.findRelated(productId, categoryId);
    }

    private String mapCategoryNameToId(String categoryName) {
        if (categoryName == null) return null;
        switch (categoryName.toLowerCase()) {
            case "camisetas": return "camisetas";
            case "pantalonetas": return "pantalonetas";
            case "licras": return "licras";
            case "chaquetas": return "chaquetas";
            case "accesorios": return "accesorios";
            default: return categoryName.toLowerCase();
        }
    }
}