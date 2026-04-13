package com.clotheshop.service;

import com.clotheshop.dto.CartDtos;
import com.clotheshop.entity.CartItem;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface CartService {
    CartItem add(CartDtos.AddCartRequest request);
    void remove(CartDtos.UserProductRequest request);
    void clear(Long userId);
    Map<Long, Integer> simpleMap(Long userId);
    List<CartItem> items(Long userId);
    Integer quantities(Long userId);
    BigDecimal total(Long userId);
    CartItem updateQuantity(Long cartItemId, Integer quantity);
    void deleteItem(Long cartItemId);
}
