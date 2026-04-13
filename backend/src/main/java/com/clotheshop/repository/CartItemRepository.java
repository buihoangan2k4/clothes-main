package com.clotheshop.repository;

import com.clotheshop.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser_UserId(Long userId);
    Optional<CartItem> findByUser_UserIdAndProduct_ProductId(Long userId, Long productId);
    void deleteByUser_UserId(Long userId);
}
