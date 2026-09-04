package com.elev8.model;

public class Product {
    private int id;
    private String sku;
    private String name;
    private String category;
    private String emoji;
    private int price;
    private int oldPrice;
    private String badge;
    private String brand;
    private String description;
    private int stock;
    private double rating;
    private int reviews;

    public Product() {}

    public Product(int id, String name, String category, String emoji, int price, int oldPrice, String badge, String description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.emoji = emoji;
        this.price = price;
        this.oldPrice = oldPrice;
        this.badge = badge;
        this.description = description;
    }

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

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getOldPrice() { return oldPrice; }
    public void setOldPrice(int oldPrice) { this.oldPrice = oldPrice; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public int getReviews() { return reviews; }
    public void setReviews(int reviews) { this.reviews = reviews; }

    public int getDiscount() {
        if (oldPrice > 0 && oldPrice > price) {
            return (int) Math.round((1 - (double) price / oldPrice) * 100);
        }
        return 0;
    }

    public String getPriceFormatted() {
        return "$" + String.format("%,d", price);
    }

    public String getOldPriceFormatted() {
        if (oldPrice > 0) {
            return "$" + String.format("%,d", oldPrice);
        }
        return null;
    }
}