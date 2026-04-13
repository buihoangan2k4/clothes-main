package com.clotheshop.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

public class ProductDtos {
    @Data
    public static class ProductImageRequest {
        private String productImage;
        private Boolean isPrimary;
    }

    @Data
    public static class ProductVariantRequest {
        @NotBlank
        private String size;
        @NotNull
        private Integer stockQuantity;
    }

    @Data
    public static class ProductRequest {
        @NotBlank
        private String productsName;
        private String description;
        @NotNull
        private BigDecimal price;
        @NotNull
        private Long categoryID;
        private List<ProductImageRequest> images;
        private List<ProductVariantRequest> variants;
    }

    @Data
    public static class DeleteProductsRequest {
        private List<Long> productIds;
    }
}
