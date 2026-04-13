package com.clotheshop.controller;

import com.clotheshop.dto.ApiResponse;
import com.clotheshop.dto.CartDtos;
import com.clotheshop.entity.CartItem;
import com.clotheshop.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping("/{userId}")
    public ApiResponse<Map<Long, Integer>> simple(@PathVariable Long userId) {
        return new ApiResponse<>("OK", cartService.simpleMap(userId));
    }

    @PostMapping("/add")
    public ApiResponse<CartItem> add(@Valid @RequestBody CartDtos.AddCartRequest request) {
        return new ApiResponse<>("Added", cartService.add(request));
    }

    @PostMapping("/remove")
    public ApiResponse<String> remove(@Valid @RequestBody CartDtos.UserProductRequest request) {
        cartService.remove(request);
        return new ApiResponse<>("Removed", "success");
    }

    @PostMapping("/clear")
    public ApiResponse<String> clear(@Valid @RequestBody CartDtos.ClearCartRequest request) {
        cartService.clear(request.getUserId());
        return new ApiResponse<>("Cleared", "success");
    }

    @GetMapping("/cart-items/{userId}")
    public ApiResponse<List<CartItem>> items(@PathVariable Long userId) {
        return new ApiResponse<>("OK", cartService.items(userId));
    }

    @PostMapping("/cart-item/{userId}")
    public ApiResponse<CartItem> addByPath(@PathVariable Long userId, @Valid @RequestBody CartDtos.AddCartRequest request) {
        request.setUserId(userId);
        return new ApiResponse<>("Added", cartService.add(request));
    }

    @GetMapping("/cart-items/{userId}/quantities")
    public ApiResponse<Integer> quantities(@PathVariable Long userId) {
        return new ApiResponse<>("OK", cartService.quantities(userId));
    }

    @GetMapping("/total/{userId}")
    public ApiResponse<BigDecimal> total(@PathVariable Long userId) {
        return new ApiResponse<>("OK", cartService.total(userId));
    }

    @PutMapping("/cart-items/{cartItemId}")
    public ApiResponse<CartItem> updateQuantity(@PathVariable Long cartItemId,
                                                @Valid @RequestBody CartDtos.UpdateQuantityRequest request) {
        return new ApiResponse<>("Updated", cartService.updateQuantity(cartItemId, request.getQuantity()));
    }

    @DeleteMapping("/cart-item/{cartItemId}")
    public ApiResponse<String> deleteItem(@PathVariable Long cartItemId) {
        cartService.deleteItem(cartItemId);
        return new ApiResponse<>("Deleted", "success");
    }
}
