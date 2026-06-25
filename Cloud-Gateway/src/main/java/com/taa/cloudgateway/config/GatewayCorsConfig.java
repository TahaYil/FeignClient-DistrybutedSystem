package com.taa.cloudgateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.cors.reactive.CorsUtils;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Configuration
public class GatewayCorsConfig {

    @Bean
    public WebFilter corsFilter() {
        return (ServerWebExchange ctx, WebFilterChain chain) -> {
            var request = ctx.getRequest();

            // Eğer gelen istek bir CORS isteğiyse
            if (CorsUtils.isCorsRequest(request)) {
                var response = ctx.getResponse();
                var headers = response.getHeaders();

                // React uygulamasının (Origin) istek atmasına izin veriyoruz
                headers.add("Access-Control-Allow-Origin", "http://localhost:5173");
                headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                headers.add("Access-Control-Allow-Headers", "*");
                headers.add("Access-Control-Allow-Credentials", "true");

                // Eğer istek OPTIONS (Preflight) ise, mikroservise GÖNDERME, burada bitir!
                if (request.getMethod() == HttpMethod.OPTIONS) {
                    response.setStatusCode(HttpStatus.OK);
                    return Mono.empty(); // İstek burada sonlanır, 200 OK döner.
                }
            }
            return chain.filter(ctx);
        };
    }
}