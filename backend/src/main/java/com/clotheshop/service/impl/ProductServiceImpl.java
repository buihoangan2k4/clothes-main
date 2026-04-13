package com.clotheshop.service.impl;

import com.clotheshop.dto.ProductDtos;
import com.clotheshop.entity.*;
import com.clotheshop.repository.CategoryRepository;
import com.clotheshop.repository.ProductRepository;
import com.clotheshop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<Product> available(int page, int pageSize) {
        return productRepository.findByProductStatus(ProductStatus.AVAILABLE);
    }

    @Override
    public List<Product> search(String search, Long categoryId, int page, int pageSize) {
        if (search != null && !search.isBlank() && categoryId != null) {
            return productRepository.findByProductsNameContainingIgnoreCaseAndCategory_CategoryId(search, categoryId);
        }
        if (search != null && !search.isBlank()) {
            return productRepository.findByProductsNameContainingIgnoreCase(search);
        }
        if (categoryId != null) {
            return productRepository.findByCategory_CategoryId(categoryId);
        }
        return productRepository.findAll();
    }

    @Override
    public List<Product> byCategory(Long categoryId) {
        return productRepository.findByCategory_CategoryId(categoryId);
    }

    @Override
    public Product byId(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public Product create(ProductDtos.ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryID())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = Product.builder()
                .productsName(request.getProductsName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(category)
                .productStatus(ProductStatus.AVAILABLE)
                .images(new ArrayList<>())
                .variants(new ArrayList<>())
                .build();

        if (request.getImages() != null) {
            request.getImages().forEach(i -> product.getImages().add(ProductImage.builder()
                    .productImage(i.getProductImage())
                    .isPrimary(Boolean.TRUE.equals(i.getIsPrimary()))
                    .product(product)
                    .build()));
        }

        if (request.getVariants() != null) {
            request.getVariants().forEach(v -> product.getVariants().add(ProductVariant.builder()
                    .size(v.getSize())
                    .stockQuantity(v.getStockQuantity())
                    .product(product)
                    .build()));
        }

        return productRepository.save(product);
    }

    @Override
    public Product update(Long id, ProductDtos.ProductRequest request) {
        Product product = byId(id);
        Category category = categoryRepository.findById(request.getCategoryID())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        product.setProductsName(request.getProductsName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(category);

        product.getImages().clear();
        if (request.getImages() != null) {
            request.getImages().forEach(i -> product.getImages().add(ProductImage.builder()
                    .productImage(i.getProductImage())
                    .isPrimary(Boolean.TRUE.equals(i.getIsPrimary()))
                    .product(product)
                    .build()));
        }

        product.getVariants().clear();
        if (request.getVariants() != null) {
            request.getVariants().forEach(v -> product.getVariants().add(ProductVariant.builder()
                    .size(v.getSize())
                    .stockQuantity(v.getStockQuantity())
                    .product(product)
                    .build()));
        }

        return productRepository.save(product);
    }

    @Override
    public void deleteMany(List<Long> productIds) {
        if (productIds != null) {
            productRepository.deleteAllById(productIds);
        }
    }
}
