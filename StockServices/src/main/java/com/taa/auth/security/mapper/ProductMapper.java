package com.taa.auth.security.mapper;

import com.taa.auth.security.dto.ProductRequest;
import com.taa.auth.security.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public Product toEntity(ProductRequest productRequest) {
        Product product = new Product();
        product.setName(productRequest.getName());
        product.setQuantity(productRequest.getQuantity());
        product.setUserId(productRequest.getUserId());
        return product;
    }
}
