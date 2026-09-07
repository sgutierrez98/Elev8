package com.elev8.business.service;

import com.elev8.persistence.dao.ProductDAO;
import com.elev8.persistence.model.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Pruebas unitarias para ProductService
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductDAO productDAO;

    private ProductService productService;

    @BeforeEach
    void setUp() {
        productService = new ProductService();
    }

    @Test
    void testGetAllProducts_ReturnsList() {
        // Arrange
        List<Product> mockProducts = new ArrayList<>();
        mockProducts.add(createTestProduct(1, "Producto 1"));
        mockProducts.add(createTestProduct(2, "Producto 2"));

        when(productDAO.findAll()).thenReturn(mockProducts);

        // Act
        List<Product> result = productService.getAllProducts();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(productDAO, times(1)).findAll();
    }

    @Test
    void testGetProductById_ExistingId_ReturnsProduct() {
        // Arrange
        int productId = 1;
        Product mockProduct = createTestProduct(productId, "Producto Test");

        when(productDAO.findById(productId)).thenReturn(mockProduct);

        // Act
        Product result = productService.getProductById(productId);

        // Assert
        assertNotNull(result);
        assertEquals(productId, result.getId());
        assertEquals("Producto Test", result.getName());
        verify(productDAO, times(1)).findById(productId);
    }

    @Test
    void testCreateProduct_ValidProduct_ReturnsSavedProduct() {
        // Arrange
        Product product = createTestProduct(0, "Nuevo Producto");
        Product savedProduct = createTestProduct(1, "Nuevo Producto");

        when(productDAO.save(any(Product.class))).thenReturn(savedProduct);

        // Act
        Product result = productService.createProduct(product);

        // Assert
        assertNotNull(result);
        assertNotEquals(0, result.getId());
        assertEquals("Nuevo Producto", result.getName());
        verify(productDAO, times(1)).save(any(Product.class));
    }

    private Product createTestProduct(int id, String name) {
        Product product = new Product();
        product.setId(id);
        product.setName(name);
        product.setSku("TEST-" + id);
        product.setCategoryId("test");
        product.setPrice(new BigDecimal("100000"));
        product.setStock(10);
        return product;
    }
}