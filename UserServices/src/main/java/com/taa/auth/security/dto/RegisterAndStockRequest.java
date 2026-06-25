package com.taa.auth.security.dto;

import com.taa.auth.security.feign.model.ProductRequest;

public class RegisterAndStockRequest {
    private RegisterRequest registerRequest;
    private ProductRequest productRequest;

    public RegisterAndStockRequest() {
    }

    public RegisterAndStockRequest(RegisterRequest registerRequest, ProductRequest productRequest) {
        this.registerRequest = registerRequest;
        this.productRequest = productRequest;
    }

    public RegisterRequest getRegisterRequest() {
        return registerRequest;
    }

    public void setRegisterRequest(RegisterRequest registerRequest) {
        this.registerRequest = registerRequest;
    }

    public ProductRequest getProductRequest() {
        return productRequest;
    }

    public void setProductRequest(ProductRequest productRequest) {
        this.productRequest = productRequest;
    }
}
