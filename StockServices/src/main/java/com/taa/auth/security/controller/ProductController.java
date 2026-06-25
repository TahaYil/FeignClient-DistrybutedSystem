package com.taa.auth.security.controller;

import com.taa.auth.security.dto.ProductRequest;
import com.taa.auth.security.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveProduct(@RequestBody ProductRequest productRequest) {
        productService.saveProduct(productRequest);
        return ResponseEntity.ok("Product saved successfully");
    }
}
