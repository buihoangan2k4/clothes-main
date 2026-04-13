package com.clotheshop.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class CategoryDtos {
    @Data
    public static class CategoryRequest {
        @NotBlank
        private String categoriesName;
        private String description;
    }
}
