package com.elev8.business.factory;

import com.elev8.persistence.model.Product;

import java.math.BigDecimal;

/**
 * Fábrica para crear productos
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
public class ProductFactory {

    /**
     * Crear un producto con valores por defecto
     * @param name Nombre del producto
     * @param sku SKU del producto
     * @param categoryId ID de la categoría
     * @param price Precio del producto
     * @return Producto creado
     */
    public static Product createProduct(String name, String sku, String categoryId, BigDecimal price) {
        Product product = new Product();
        product.setName(name);
        product.setSku(sku);
        product.setCategoryId(categoryId);
        product.setPrice(price);
        product.setEmoji("📦");
        product.setBrand("Elev8");
        product.setStock(0);
        product.setActive(true);
        return product;
    }

    /**
     * Crear un producto con todos los atributos
     * @param name Nombre del producto
     * @param sku SKU del producto
     * @param categoryId ID de la categoría
     * @param price Precio del producto
     * @param oldPrice Precio anterior
     * @param emoji Emoji del producto
     * @param brand Marca del producto
     * @param stock Stock inicial
     * @return Producto creado
     */
    public static Product createProductFull(String name, String sku, String categoryId,
                                            BigDecimal price, BigDecimal oldPrice,
                                            String emoji, String brand, int stock) {
        Product product = createProduct(name, sku, categoryId, price);
        product.setOldPrice(oldPrice);
        product.setEmoji(emoji != null ? emoji : "📦");
        product.setBrand(brand != null ? brand : "Elev8");
        product.setStock(stock);
        return product;
    }

    /**
     * Crear un producto en oferta
     * @param name Nombre del producto
     * @param sku SKU del producto
     * @param categoryId ID de la categoría
     * @param price Precio del producto
     * @param oldPrice Precio anterior (mayor que price)
     * @return Producto en oferta
     */
    public static Product createSaleProduct(String name, String sku, String categoryId,
                                            BigDecimal price, BigDecimal oldPrice) {
        Product product = createProduct(name, sku, categoryId, price);
        product.setOldPrice(oldPrice);
        product.setBadge("OFERTA");
        return product;
    }
}