package com.taa.auth.security.repository;


import com.taa.auth.security.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
