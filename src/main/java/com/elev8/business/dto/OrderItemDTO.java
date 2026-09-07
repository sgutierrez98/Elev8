package com.elev8.business.dto;

import java.math.BigDecimal;

/**
 * DTO para transferir datos de Item de Pedido
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
public class OrderItemDTO {
    private int productId;
    private String productName;
    private String productEmoji;
    private BigDecimal price;
    private int quantity;
    private String size;
    private String color;

    // Getters y Setters
    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getProductEmoji() { return productEmoji; }
    public void setProductEmoji(String productEmoji) { this.productEmoji = productEmoji; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public BigDecimal getSubtotal() {
        return price.multiply(BigDecimal.valueOf(quantity));
    }
}