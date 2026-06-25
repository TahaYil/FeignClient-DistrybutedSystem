package com.taa.auth.security.feign.config;

import feign.Logger;
import feign.Request;
import feign.RequestInterceptor;
import feign.Retryer;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.Duration;

@Configuration
public class FeignConfig {

    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }

    @Bean
    public Request.Options feignRequestOptions() {
        return new Request.Options(Duration.ofMillis(3000), Duration.ofMillis(5000),true);
    }
    @Bean
    public Retryer feignRetryer() {
        return new Retryer.Default(1000, 5000, 3);
    }

    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {
            // React'ten user-service'e gelen mevcut isteği yakala
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();

                // Gelen istekteki "Authorization" başlığını (Bearer eyJhbG...) aynen oku
                String authorizationHeader = request.getHeader("Authorization");

                // Eğer boş değilse, stock-service'e giden Feign isteğine de AYNEN yapıştır
                if (authorizationHeader != null) {
                    requestTemplate.header("Authorization", authorizationHeader);
                }
            }
        };
    }

}
