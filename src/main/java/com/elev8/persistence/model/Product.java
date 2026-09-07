package com.elev8.persistence.model;

import java.math.BigDecimal;

/**
 * Entidad Producto
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
public class Product {
    private int id;
    private String sku;
    private String name;
    private String categoryId;
    private String categoryName;
    private String emoji;
    private BigDecimal price;
    private BigDecimal oldPrice;
    private Double rating;
    private Integer reviews;
    private String badge;
    private String brand;
    private String description;
    private Integer stock;
    private Boolean active;

    public Product() {
        this.active = true;
    }

    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategoryId() { return categoryId; }
    public void setCategoryId(String categoryId) { this.categoryId = categoryId; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getEmoji() { return emoji; }
    public void setEmoji(String emoji) { this.emoji = emoji; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public BigDecimal getOldPrice() { return oldPrice; }
    public void setOldPrice(BigDecimal oldPrice) { this.oldPrice = oldPrice; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviews() { return reviews; }
    public void setReviews(Integer reviews) { this.reviews = reviews; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public int getDiscountPercentage() {
        if (oldPrice != null && oldPrice.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal discount = oldPrice.subtract(price);
            return discount.multiply(BigDecimal.valueOf(100))
                    .divide(oldPrice, 0, java.math.RoundingMode.HALF_UP)
                    .intValue();
        }
        return 0;
    }

    public String getPriceFormatted() {
        return "$" + String.format("%,.0f", price);
    }

    public String getOldPriceFormatted() {
        if (oldPrice != null) {
            return "$" + String.format("%,.0f", oldPrice);
        }
        return null;
    }
}