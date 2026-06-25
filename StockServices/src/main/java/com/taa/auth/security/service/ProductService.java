package com.taa.auth.security.service;

import com.taa.auth.security.dto.ProductRequest;
import com.taa.auth.security.mapper.ProductMapper;
import com.taa.auth.security.model.Product;
import com.taa.auth.security.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    public void saveProduct(ProductRequest productRequest) {
        Product product=productMapper.toEntity(productRequest);
        productRepository.save(product);
    }
}
