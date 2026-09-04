package com.elev8.model;

public class CartItem {
    private int productId;
    private String name;
    private String emoji;
    private int price;
    private int quantity;
    private String size;
    private String color;

    public CartItem() {}

    public CartItem(int productId, String name, String emoji, int price, int quantity) {
        this.productId = productId;
        this.name = name;
        this.emoji = emoji;
        this.price = price;
        this.quantity = quantity;
    }

    // Getters y Setters
    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmoji() { return emoji; }
    public void setEmoji(String emoji) { this.emoji = emoji; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public int getSubtotal() {
        return price * quantity;
    }

    public String getPriceFormatted() {
        return "$" + String.format("%,d", price);
    }

    public String getSubtotalFormatted() {
        return "$" + String.format("%,d", getSubtotal());
    }
}