package com.taa.auth.security.feign.clients;


import com.taa.auth.security.feign.model.ProductRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "stock-service", url = "http://localhost:8082/v1/")
public interface StockClient {
    @PostMapping("/product/save")
    public ResponseEntity<String> saveProduct(@RequestBody ProductRequest productRequest);
}
