package com.clotheshop.controller;

import com.clotheshop.dto.ApiResponse;
import com.clotheshop.dto.ProductDtos;
import com.clotheshop.entity.Product;
import com.clotheshop.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/available")
    public ApiResponse<List<Product>> available(@RequestParam(defaultValue = "1") int page,
                                                @RequestParam(defaultValue = "100") int pageSize) {
        return new ApiResponse<>("OK", productService.available(page, pageSize));
    }

    @GetMapping("/search")
    public ApiResponse<List<Product>> search(@RequestParam(required = false) String search,
                                             @RequestParam(required = false) Long categoryId,
                                             @RequestParam(defaultValue = "1") int page,
                                             @RequestParam(defaultValue = "100") int pageSize) {
        return new ApiResponse<>("OK", productService.search(search, categoryId, page, pageSize));
    }

    @GetMapping({"", "/"})
    public ApiResponse<List<Product>> byCategory(@RequestParam(name = "category", required = false) Long categoryId) {
        if (categoryId == null) return new ApiResponse<>("OK", productService.search(null, null, 1, 100));
        return new ApiResponse<>("OK", productService.byCategory(categoryId));
    }

    @GetMapping("/{id}")
    public ApiResponse<Product> one(@PathVariable Long id) {
        return new ApiResponse<>("OK", productService.byId(id));
    }

    @PostMapping({"", "/"})
    public ApiResponse<Product> create(@Valid @RequestBody ProductDtos.ProductRequest request) {
        return new ApiResponse<>("Created", productService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<Product> update(@PathVariable Long id, @Valid @RequestBody ProductDtos.ProductRequest request) {
        return new ApiResponse<>("Updated", productService.update(id, request));
    }

    @DeleteMapping("/delete-products")
    public ApiResponse<Map<String, Object>> deleteMany(@RequestBody ProductDtos.DeleteProductsRequest request) {
        productService.deleteMany(request.getProductIds());
        return new ApiResponse<>("Deleted", Map.of("deleted", request.getProductIds() == null ? 0 : request.getProductIds().size()));
    }
}
