package com.clotheshop.repository;

import com.clotheshop.entity.Product;
import com.clotheshop.entity.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByProductStatus(ProductStatus status);
    List<Product> findByProductsNameContainingIgnoreCase(String search);
    List<Product> findByCategory_CategoryId(Long categoryId);
    List<Product> findByProductsNameContainingIgnoreCaseAndCategory_CategoryId(String search, Long categoryId);
}
