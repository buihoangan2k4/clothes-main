package com.clotheshop.service.impl;

import com.clotheshop.dto.CartDtos;
import com.clotheshop.entity.CartItem;
import com.clotheshop.entity.Product;
import com.clotheshop.entity.User;
import com.clotheshop.repository.CartItemRepository;
import com.clotheshop.repository.ProductRepository;
import com.clotheshop.repository.UserRepository;
import com.clotheshop.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public CartItem add(CartDtos.AddCartRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem item = cartItemRepository.findByUser_UserIdAndProduct_ProductId(request.getUserId(), request.getProductId())
                .orElse(CartItem.builder().user(user).product(product).quantity(0).size(request.getSize()).build());

        item.setQuantity(item.getQuantity() + (request.getQuantity() == null ? 1 : request.getQuantity()));
        if (item.getSize() == null) {
            item.setSize(request.getSize());
        }
        return cartItemRepository.save(item);
    }

    @Override
    public void remove(CartDtos.UserProductRequest request) {
        cartItemRepository.findByUser_UserIdAndProduct_ProductId(request.getUserId(), request.getProductId())
                .ifPresent(cartItemRepository::delete);
    }

    @Override
    public void clear(Long userId) {
        cartItemRepository.deleteByUser_UserId(userId);
    }

    @Override
    public Map<Long, Integer> simpleMap(Long userId) {
        Map<Long, Integer> map = new LinkedHashMap<>();
        for (CartItem item : cartItemRepository.findByUser_UserId(userId)) {
            map.put(item.getProduct().getProductId(), item.getQuantity());
        }
        return map;
    }

    @Override
    public List<CartItem> items(Long userId) {
        return cartItemRepository.findByUser_UserId(userId);
    }

    @Override
    public Integer quantities(Long userId) {
        return cartItemRepository.findByUser_UserId(userId).stream().mapToInt(CartItem::getQuantity).sum();
    }

    @Override
    public BigDecimal total(Long userId) {
        return cartItemRepository.findByUser_UserId(userId).stream()
                .map(i -> i.getProduct().getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public CartItem updateQuantity(Long cartItemId, Integer quantity) {
        CartItem item = cartItemRepository.findById(cartItemId).orElseThrow(() -> new RuntimeException("Cart item not found"));
        item.setQuantity(quantity);
        return cartItemRepository.save(item);
    }

    @Override
    public void deleteItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
}
