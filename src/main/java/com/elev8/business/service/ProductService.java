package com.elev8.business.service;

import com.elev8.persistence.dao.ProductDAO;
import com.elev8.persistence.model.Product;

import java.util.List;

/**
 * Servicio para gestión de productos
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
public class ProductService {

    private final ProductDAO productDAO;

    public ProductService() {
        this.productDAO = new ProductDAO();
    }

    /**
     * Obtener todos los productos activos
     * @return Lista de productos
     */
    public List<Product> getAllProducts() {
        return productDAO.findAll();
    }

    /**
     * Obtener un producto por ID
     * @param id ID del producto
     * @return Producto encontrado o null
     */
    public Product getProductById(int id) {
        return productDAO.findById(id);
    }

    /**
     * Obtener productos por categoría
     * @param categoryId ID de la categoría
     * @return Lista de productos de esa categoría
     */
    public List<Product> getProductsByCategory(String categoryId) {
        if (categoryId == null || categoryId.trim().isEmpty()) {
            return productDAO.findAll();
        }
        return productDAO.findByCategory(categoryId);
    }

    /**
     * Obtener productos populares
     * @param limit Límite de resultados
     * @return Lista de productos populares
     */
    public List<Product> getPopularProducts(int limit) {
        return productDAO.findPopular(limit);
    }

    /**
     * Obtener productos en oferta
     * @return Lista de productos en oferta
     */
    public List<Product> getProductsOnSale() {
        return productDAO.findOnSale();
    }

    /**
     * Obtener productos relacionados (misma categoría)
     * @param productId ID del producto
     * @param limit Límite de resultados
     * @return Lista de productos relacionados
     */
    public List<Product> getRelatedProducts(int productId, int limit) {
        Product product = getProductById(productId);
        if (product == null) {
            return List.of();
        }

        List<Product> related = productDAO.findByCategory(product.getCategoryId());
        related.removeIf(p -> p.getId() == productId);

        if (related.size() > limit) {
            return related.subList(0, limit);
        }
        return related;
    }

    /**
     * Crear un nuevo producto
     * @param product Producto a crear
     * @return Producto creado o null
     */
    public Product createProduct(Product product) {
        if (product == null) {
            return null;
        }

        // Validaciones de negocio
        if (product.getSku() == null || product.getSku().trim().isEmpty()) {
            return null;
        }

        if (product.getPrice() == null || product.getPrice().compareTo(java.math.BigDecimal.ZERO) <= 0) {
            return null;
        }

        return productDAO.save(product);
    }

    /**
     * Actualizar un producto existente
     * @param product Producto con datos actualizados
     * @return Producto actualizado o null
     */
    public Product updateProduct(Product product) {
        if (product == null || product.getId() == 0) {
            return null;
        }

        // Verificar que el producto existe
        Product existing = getProductById(product.getId());
        if (existing == null) {
            return null;
        }

        return productDAO.save(product);
    }

    /**
     * Eliminar un producto (borrado lógico)
     * @param id ID del producto
     * @return true si se eliminó correctamente
     */
    public boolean deleteProduct(int id) {
        return productDAO.delete(id);
    }

    /**
     * Validar stock de un producto
     * @param productId ID del producto
     * @param quantity Cantidad solicitada
     * @return true si hay stock suficiente
     */
    public boolean hasStock(int productId, int quantity) {
        Product product = getProductById(productId);
        if (product == null) {
            return false;
        }
        return product.getStock() >= quantity;
    }

    /**
     * Descontar stock de un producto
     * @param productId ID del producto
     * @param quantity Cantidad a descontar
     * @return true si se descontó correctamente
     */
    public boolean reduceStock(int productId, int quantity) {
        Product product = getProductById(productId);
        if (product == null || product.getStock() < quantity) {
            return false;
        }

        product.setStock(product.getStock() - quantity);
        return productDAO.save(product) != null;
    }
}