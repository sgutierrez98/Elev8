package com.elev8.model;

public class OrderItem {
    private int id;
    private int orderId;
    private int productId;
    private String productName;
    private String productEmoji;
    private int price;
    private int quantity;
    private String size;
    private String color;

    public OrderItem() {}

    public OrderItem(int productId, String productName, String productEmoji, int price, int quantity) {
        this.productId = productId;
        this.productName = productName;
        this.productEmoji = productEmoji;
        this.price = price;
        this.quantity = quantity;
    }

    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getOrderId() { return orderId; }
    public void setOrderId(int orderId) { this.orderId = orderId; }

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getProductEmoji() { return productEmoji; }
    public void setProductEmoji(String productEmoji) { this.productEmoji = productEmoji; }

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