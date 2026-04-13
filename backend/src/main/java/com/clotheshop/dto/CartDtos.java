package com.clotheshop.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

public class CartDtos {
    @Data
    public static class AddCartRequest {
        @NotNull
        private Long userId;
        @NotNull
        private Long productId;
        @Min(1)
        private Integer quantity;
        private String size;
    }

    @Data
    public static class UserProductRequest {
        @NotNull
        private Long userId;
        @NotNull
        private Long productId;
    }

    @Data
    public static class ClearCartRequest {
        @NotNull
        private Long userId;
    }

    @Data
    public static class UpdateQuantityRequest {
        @Min(1)
        private Integer quantity;
    }
}
