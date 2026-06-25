package com.taa.auth.security.dto;

public class ProductRequest {
    private String name;
    private int quantity;
    private Long userId;

    public ProductRequest() {
    }

    public ProductRequest(String name, int quantity, Long userId) {
        this.name = name;
        this.quantity = quantity;
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
