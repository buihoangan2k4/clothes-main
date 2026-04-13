package com.clotheshop.service;

import com.clotheshop.dto.ProductDtos;
import com.clotheshop.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> available(int page, int pageSize);
    List<Product> search(String search, Long categoryId, int page, int pageSize);
    List<Product> byCategory(Long categoryId);
    Product byId(Long id);
    Product create(ProductDtos.ProductRequest request);
    Product update(Long id, ProductDtos.ProductRequest request);
    void deleteMany(List<Long> productIds);
}
