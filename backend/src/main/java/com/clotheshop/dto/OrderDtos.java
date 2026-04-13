package com.clotheshop.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

public class OrderDtos {
    @Data
    public static class CreateOrderRequest {
        @NotNull
        private Long userId;
        private String paymentMethod;
        private String shippingAddress;
        private String billingAddress;
    }
}
