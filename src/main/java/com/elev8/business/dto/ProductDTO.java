package com.elev8.business.dto;

import java.math.BigDecimal;

/**
 * DTO para transferir datos de Producto
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
public class ProductDTO {
    private int id;
    private String sku;
    private String name;
    private String category;
    private String emoji;
    private BigDecimal price;
    private BigDecimal oldPrice;
    private Integer stock;
    private String badge;
    private Double rating;
    private Integer reviews;

    public ProductDTO() {}

    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getEmoji() { return emoji; }
    public void setEmoji(String emoji) { this.emoji = emoji; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public BigDecimal getOldPrice() { return oldPrice; }
    public void setOldPrice(BigDecimal oldPrice) { this.oldPrice = oldPrice; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviews() { return reviews; }
    public void setReviews(Integer reviews) { this.reviews = reviews; }

    public String getPriceFormatted() {
        return "$" + String.format("%,.0f", price);
    }

    public String getOldPriceFormatted() {
        if (oldPrice != null) {
            return "$" + String.format("%,.0f", oldPrice);
        }
        return null;
    }

    public int getDiscount() {
        if (oldPrice != null && oldPrice.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal discount = oldPrice.subtract(price);
            return discount.multiply(BigDecimal.valueOf(100))
                    .divide(oldPrice, 0, java.math.RoundingMode.HALF_UP)
                    .intValue();
        }
        return 0;
    }
}